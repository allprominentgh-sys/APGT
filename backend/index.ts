import { router, json, error, db, secrets } from '@appdeploy/sdk';
import { randomUUID } from 'node:crypto';

const PLANS = {
  day: { price: 10, hours: 24, label: 'Daily Pass' },
  three: { price: 15, hours: 72, label: '3-Day Pass' },
  week: { price: 35, hours: 168, label: 'Weekly Pass' },
  month: { price: 150, hours: 720, label: 'Monthly Pass' },
} as const;

type PlanId = keyof typeof PLANS;
const isPlan = (value: unknown): value is PlanId =>
  typeof value === 'string' && Object.prototype.hasOwnProperty.call(PLANS, value);
const phoneIsValid = (value: unknown) =>
  typeof value === 'string' && /^\+?\d[\d\s-]{7,14}\d$/.test(value.trim());

async function configuredSecrets() {
  const names = await secrets.listSecretNames();
  return {
    paymentProvider: names.includes('PAYSTACK_SECRET_KEY') && names.includes('PAYSTACK_WEBHOOK_SECRET'),
    routerAdapter: names.includes('ROUTER_API_URL') && names.includes('ROUTER_API_TOKEN'),
    adminConfigured: names.includes('COMMUNITYNET_ADMIN_TOKEN'),
  };
}

export const handler = router({
  'GET /api/_healthcheck': [async () => json({ message: 'Success', service: 'CommunityNet ISP API' })],

  'GET /api/isp/status': [async () => {
    const configured = await configuredSecrets();
    return json({
      payment: { configured: configured.paymentProvider, provider: 'Paystack', status: configured.paymentProvider ? 'credentials_present_incomplete' : 'setup_required' },
      router: { configured: configured.routerAdapter, status: configured.routerAdapter ? 'adapter_not_verified' : 'model_required', note: 'ISP-supplied router model and captive-portal capabilities must be confirmed before enabling access.' },
      subscriptions: { persistence: 'enabled', expiryPolicy: 'counted from verified payment and successful activation only' },
      bandwidth: { policy: 'planned', profiles: [{ name: 'Basic', downloadMbps: 5, uploadMbps: 1 }, { name: 'Standard', downloadMbps: 10, uploadMbps: 2 }, { name: 'Premium', downloadMbps: 20, uploadMbps: 5 }], note: 'These are proposed caps, not active router settings.' },
      admin: { configured: configured.adminConfigured },
      liveAccessEnabled: false,
    });
  }],

  'GET /api/isp/plans': [async () => json({ currency: 'GHS', plans: Object.entries(PLANS).map(([id, plan]) => ({ id, ...plan })) })],

  'POST /api/isp/orders': [async ({ body }) => {
    const input = body as { planId?: unknown; phone?: unknown; requestId?: unknown };
    if (!isPlan(input?.planId)) return error('Choose a valid internet plan.', 400);
    if (!phoneIsValid(input?.phone)) return error('Enter a valid phone number.', 400);
    if (typeof input.requestId !== 'string' || !/^[a-zA-Z0-9_-]{12,100}$/.test(input.requestId)) {
      return error('A valid checkout request ID is required.', 400);
    }
    const plan = PLANS[input.planId];
    const id = input.requestId;
    const existing = await db.get<Record<string, unknown>>('isp_orders', [id], { consistent: true });
    if (existing[0]) {
      const prior = existing[0];
      if (prior.phone !== String(input.phone).replace(/[\s-]/g, '') || prior.planId !== input.planId) {
        return error('This request ID was already used for a different checkout.', 409);
      }
      return json({ orderId: id, amount: plan.price, currency: 'GHS', status: prior.status, paymentConfigured: false, message: 'Order is saved, but payment is not enabled yet.' });
    }
    const phone = String(input.phone).replace(/[\s-]/g, '');
    const record = {
      id,
      phone,
      planId: input.planId,
      planLabel: plan.label,
      amount: plan.price,
      currency: 'GHS',
      durationHours: plan.hours,
      status: 'pending_payment_setup',
      createdAt: new Date().toISOString(),
      paidAt: null,
      expiresAt: null,
      accessActivated: false,
      paymentReference: null,
      routerSessionId: null,
    };
    const [savedId] = await db.add('isp_orders', [record]);
    if (!savedId) return error('Could not save this checkout. Please try again.', 503);
    return json({
      orderId: savedId,
      amount: plan.price,
      currency: 'GHS',
      status: record.status,
      paymentConfigured: false,
      message: 'Checkout saved safely. Mobile Money collection remains disabled until the provider and verified webhook are configured.',
    }, 201);
  }],

  'GET /api/isp/orders/:id': [async ({ params }) => {
    if (!/^[a-zA-Z0-9_-]{12,100}$/.test(params.id)) return error('Invalid order reference.', 400);
    const [order] = await db.get<Record<string, unknown>>('isp_orders', [params.id], { consistent: true });
    if (!order) return error('Order not found.', 404);
    const now = Date.now();
    const expiresAt = typeof order.expiresAt === 'string' ? Date.parse(order.expiresAt) : NaN;
    const active = order.status === 'active' && Number.isFinite(expiresAt) && expiresAt > now;
    return json({
      orderId: params.id,
      planId: order.planId,
      amount: order.amount,
      currency: order.currency,
      status: active ? 'active' : (order.status === 'active' && !active ? 'expired' : order.status),
      expiresAt: order.expiresAt,
      accessActivated: active && order.accessActivated === true,
    });
  }],

  'POST /api/isp/admin/activate': [async ({ body }) => {
    const input = body as { adminToken?: unknown; orderId?: unknown; paymentReference?: unknown };
    const names = await secrets.listSecretNames();
    if (!names.includes('COMMUNITYNET_ADMIN_TOKEN')) return error('Admin activation is disabled until secure administrator credentials are configured.', 503);
    const expected = await secrets.readSecret('COMMUNITYNET_ADMIN_TOKEN');
    if (typeof input?.adminToken !== 'string' || input.adminToken.length < 20 || input.adminToken !== expected) return error('Administrator authorization failed.', 401);
    // Deliberately fail closed: an admin-entered reference is not proof of payment.
    return error('Manual activation is disabled. Only a verified payment-provider webhook and a confirmed router adapter may activate paid access.', 409);
  }],
});