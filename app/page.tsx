"use client";

import { useState } from "react";
import {
  Wifi, ShieldCheck, Clock3, Gauge, ArrowRight, Smartphone, Router,
  CreditCard, UserRound, CircleCheck, Menu, X, LockKeyhole, Activity,
  Settings, Signal, Zap
} from "lucide-react";

type View = "home" | "checkout" | "login" | "admin";

const plans = [
  { id: "day", name: "Daily Pass", price: 10, duration: "24 hours", detail: "A full day of browsing", unit: "GH₵0.42/hour" },
  { id: "three", name: "3-Day Pass", price: 15, duration: "3 days", detail: "Great for a short stay", unit: "GH₵5/day", popular: true },
  { id: "week", name: "Weekly Pass", price: 35, duration: "7 days", detail: "More time, better value", unit: "GH₵5/day" },
  { id: "month", name: "Monthly Pass", price: 150, duration: "30 days", detail: "Your everyday connection", unit: "GH₵5/day" }
];

export default function HomePage() {
  const [selected, setSelected] = useState("three");
  const [view, setView] = useState<View>("home");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [phone, setPhone] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [notice, setNotice] = useState("");
  const [adminOpen, setAdminOpen] = useState(false);
  const chosenPlan = plans.find((plan) => plan.id === selected) ?? plans[1];

  function choosePlan(id: string) {
    setSelected(id);
    setView("checkout");
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submitLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!phone.trim() || !accessCode.trim()) {
      setNotice("Enter your phone/username and access code to continue.");
      return;
    }
    setNotice("Internet login is not active yet. Configure and verify the ISP router integration before enabling customer access.");
  }

  function submitCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!phone.trim()) {
      setNotice("Enter the phone number you will use for your access account.");
      return;
    }
    setNotice("Checkout is currently in preview mode. No payment has been collected. A Ghana Mobile Money provider and verified payment webhook must be configured before access can be activated.");
  }

  return (
    <div className="site-shell">
      <div className="topline"><span className="live-dot" /> ALL PROMINENT TELECOMMUNICATION GHANA (APTG) <span className="topline-divider">•</span> FAST. FAIR. LOCAL.</div>
      <header className="header">
        <button className="brand" onClick={() => setView("home")} aria-label="APTG home">
          <span className="brand-icon"><Wifi size={24} strokeWidth={2.5} /></span>
          <span><strong>APTG<span> Wi-Fi</span></strong><small>ALL PROMINENT TELECOMMUNICATION GHANA</small></span>
        </button>
        <nav className={mobileMenu ? "nav nav-open" : "nav"} aria-label="Main navigation">
          <button onClick={() => { setView("home"); setMobileMenu(false); }}>Home</button>
          <button onClick={() => { setView("home"); setMobileMenu(false); document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" }); }}>Internet plans</button>
          <button onClick={() => { setView("login"); setMobileMenu(false); }}>Customer login</button>
        </nav>
        <div className="header-actions">
          <button className="login-link" onClick={() => setView("login")}><UserRound size={17} /> Log in</button>
          <button className="header-cta" onClick={() => { setView("home"); document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" }); }}>Get connected <ArrowRight size={16} /></button>
        </div>
        <button className="menu-toggle" aria-label="Toggle menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button>
      </header>

      {view === "home" && <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-mark"><Signal size={14} /></span> INTERNET THAT WORKS FOR YOU</div>
            <h1>Your community.<br />Your connection.<br /><em>Your freedom.</em></h1>
            <p className="hero-description">Reliable, high-speed neighbourhood internet with simple packages and no confusing contracts. Choose a pass that works for you.</p>
            <div className="hero-buttons">
              <button className="primary-button" onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })}>View internet plans <ArrowRight size={16} /></button>
              <button className="secondary-button" onClick={() => setView("login")}><UserRound size={16} /> Customer login</button>
            </div>
            <div className="hero-proof"><span><CircleCheck size={15} /> Simple pricing</span><span><CircleCheck size={15} /> Local support</span><span><CircleCheck size={15} /> Flexible passes</span></div>
          </div>
          <div className="hero-visual" aria-label="Internet service highlights">
            <div className="visual-glow" />
            <div className="signal-card">
              <div className="signal-card-top"><span><Activity size={17} /> NETWORK OVERVIEW</span><span className="status-pill">PREVIEW</span></div>
              <div className="signal-score"><span>APTG</span><strong><Signal size={31} /> Wi-Fi</strong><small>Community internet</small></div>
              <div className="signal-bars"><i /><i /><i /><i /><i /></div>
              <div className="signal-card-bottom"><span><ShieldCheck size={16} /> Service-first connectivity</span><span><Zap size={16} /> Fast setup</span></div>
            </div>
            <div className="floating-card floating-speed"><Gauge size={20} /><span><strong>High speed</strong><small>Plan-dependent performance</small></span></div>
            <div className="floating-card floating-coverage"><Wifi size={20} /><span><strong>Local coverage</strong><small>Check availability in your area</small></span></div>
          </div>
        </section>
        <section className="trust-strip">
          <div><ShieldCheck size={20} /><span><strong>Transparent pricing</strong><small>Know your cost upfront</small></span></div>
          <div><Clock3 size={20} /><span><strong>Flexible duration</strong><small>Choose your access period</small></span></div>
          <div><Smartphone size={20} /><span><strong>Convenient access</strong><small>Designed for mobile customers</small></span></div>
          <div><Router size={20} /><span><strong>Network-ready</strong><small>Router integration pending</small></span></div>
        </section>
        <section className="plans-section" id="plans">
          <div className="section-heading"><div className="eyebrow">CONNECT YOUR WAY</div><h2>Internet plans that fit <em>your life.</em></h2><p>Choose a pass to see the checkout preview. Payments and access activation remain disabled until the relevant integrations are configured.</p></div>
          <div className="plans-grid">
            {plans.map((plan) => <article key={plan.id} className={plan.popular ? "plan-card plan-popular" : "plan-card"}>
              {plan.popular && <div className="popular-ribbon">MOST POPULAR</div>}
              <div className="plan-icon"><Wifi size={22} /></div><h3>{plan.name}</h3><p className="plan-detail">{plan.detail}</p>
              <div className="plan-price"><span>GH₵</span>{plan.price}<small>/{plan.duration}</small></div><div className="plan-unit">{plan.unit}</div>
              <div className="plan-features"><span><CircleCheck size={15} /> Wi-Fi access pass</span><span><CircleCheck size={15} /> Clear validity period</span><span><CircleCheck size={15} /> Customer support</span></div>
              <button className={plan.popular ? "plan-button plan-button-primary" : "plan-button"} onClick={() => choosePlan(plan.id)}>Choose plan <ArrowRight size={15} /></button>
            </article>)}
          </div>
          <p className="pricing-note">Prices and coverage are subject to confirmation by APTG. Buying a pass here will not charge you at this preview stage.</p>
        </section>
        <section className="how-section">
          <div className="section-heading"><div className="eyebrow">SIMPLE BY DESIGN</div><h2>Get online in <em>three steps.</em></h2></div>
          <div className="steps-grid">
            <article><span className="step-number">01</span><div className="step-icon"><Smartphone size={22} /></div><h3>Choose a pass</h3><p>Select the duration that matches your needs and budget.</p></article>
            <article><span className="step-number">02</span><div className="step-icon"><CreditCard size={22} /></div><h3>Complete payment</h3><p>Payment integration will be enabled after provider setup and verification.</p></article>
            <article><span className="step-number">03</span><div className="step-icon"><Router size={22} /></div><h3>Connect your device</h3><p>Router access provisioning must be configured before service activation.</p></article>
          </div>
        </section>
        <section className="coverage-band">
          <div><span className="coverage-icon"><Signal size={24} /></span><span><strong>Is APTG available in your neighbourhood?</strong><small>Contact the APTG team to confirm coverage and supported locations.</small></span></div>
          <button onClick={() => { setView("checkout"); setNotice("Coverage enquiries are not yet connected to a support system. Please contact APTG directly."); }}>Check availability <ArrowRight size={15} /></button>
        </section>
      </main>}

      {view === "checkout" && <main className="form-page"><div className="form-layout">
        <div className="form-intro"><button className="back-link" onClick={() => { setView("home"); setNotice(""); }}>← Back to plans</button><div className="eyebrow">YOUR CONNECTION STARTS HERE</div><h1>One step closer to <em>online.</em></h1><p>Enter a contact number to prepare your order preview. No payment will be taken at this stage.</p><div className="secure-note"><LockKeyhole size={17} /><span><strong>Safe checkout preview</strong><small>No payment is processed on this screen.</small></span></div></div>
        <form className="form-card" onSubmit={submitCheckout}>
          <div className="form-card-heading"><span className="step-icon"><CreditCard size={20} /></span><span><strong>Plan summary</strong><small>Review your selected internet pass</small></span></div>
          <div className="checkout-plan"><span>{chosenPlan.name}<small>{chosenPlan.duration} of service</small></span><strong>GH₵{chosenPlan.price}</strong></div>
          <label htmlFor="checkout-phone">Phone number</label><input id="checkout-phone" inputMode="tel" autoComplete="tel" placeholder="e.g. 024 000 0000" value={phone} onChange={(event) => setPhone(event.target.value)} />
          <button type="submit" className="primary-button form-submit">Continue <ArrowRight size={16} /></button><p className="form-footnote">This is a preview only. Do not send money based on this page; payment is not enabled.</p>
          {notice && <p className="notice" role="status">{notice}</p>}
        </form>
      </div></main>}

      {view === "login" && <main className="form-page"><div className="form-layout login-layout">
        <div className="form-intro"><button className="back-link" onClick={() => { setView("home"); setNotice(""); }}>← Back home</button><div className="eyebrow">CUSTOMER ACCESS</div><h1>Welcome <em>back.</em></h1><p>Use the access details supplied by APTG once customer authentication and router access have been configured.</p><div className="secure-note"><ShieldCheck size={17} /><span><strong>Protected access</strong><small>Authentication is not active yet.</small></span></div></div>
        <form className="form-card" onSubmit={submitLogin}>
          <div className="form-card-heading"><span className="step-icon"><LockKeyhole size={20} /></span><span><strong>Customer login</strong><small>Enter your internet access details</small></span></div>
          <label htmlFor="login-phone">Phone or username</label><input id="login-phone" autoComplete="username" placeholder="Enter your phone or username" value={phone} onChange={(event) => setPhone(event.target.value)} />
          <label htmlFor="access-code">Access code</label><input id="access-code" type="password" autoComplete="current-password" placeholder="Enter your access code" value={accessCode} onChange={(event) => setAccessCode(event.target.value)} />
          <button type="submit" className="primary-button form-submit">Log in <ArrowRight size={16} /></button>{notice && <p className="notice" role="status">{notice}</p>}
        </form>
      </div></main>}

      {view === "admin" && <main className="form-page"><div className="form-layout login-layout">
        <div className="form-intro"><button className="back-link" onClick={() => { setView("home"); setNotice(""); }}>← Back home</button><div className="eyebrow">OPERATIONS</div><h1>APTG <em>status.</em></h1><p>This status panel is a UI preview only. Administrative authentication and live network data are not configured.</p></div>
        <div className="form-card"><div className="form-card-heading"><span className="step-icon"><Settings size={20} /></span><span><strong>Service readiness</strong><small>Integration checklist</small></span></div>
          <div className="admin-status"><span>Website interface</span><strong className="state-ready">Available</strong></div><div className="admin-status"><span>Payments</span><strong className="state-pending">Not configured</strong></div><div className="admin-status"><span>Customer authentication</span><strong className="state-pending">Not configured</strong></div><div className="admin-status"><span>Router provisioning</span><strong className="state-pending">Not configured</strong></div><div className="admin-status"><span>Automatic expiry</span><strong className="state-pending">Not configured</strong></div>
          <button className="secondary-button admin-close" onClick={() => setView("home")}>Return to homepage</button>
        </div>
      </div></main>}

      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand"><div className="footer-logo"><Wifi size={21} /></div><span><strong>APTG Wi-Fi</strong><small>Connectivity for your community.</small></span></div>
          <div className="footer-links"><button onClick={() => setView("home")}>Home</button><button onClick={() => { setView("home"); document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" }); }}>Internet plans</button><button onClick={() => setView("login")}>Customer login</button></div>
          <button className="footer-admin" onClick={() => { setAdminOpen(!adminOpen); setView(adminOpen ? "home" : "admin"); }}><Settings size={15} /> Service status</button>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} All Prominent Telecommunication Ghana.</span><span>Simple plans. Transparent service.</span></div>
      </footer>
    </div>
  );
}