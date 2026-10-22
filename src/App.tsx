import { useState } from 'react';
import {
  Wifi,
  ShieldCheck,
  Clock3,
  Gauge,
  ArrowRight,
  Smartphone,
  Router,
  CreditCard,
  UserRound,
  CircleCheck,
  Menu,
  X,
  LockKeyhole,
  Activity,
  Settings,
  Signal,
  Zap,
} from 'lucide-react';

const plans = [
  {
    id: 'day',
    name: 'Daily Pass',
    price: 10,
    duration: '24 hours',
    detail: 'A full day of browsing',
    unit: 'GH₵0.42/hour',
  },
  {
    id: 'three',
    name: '3-Day Pass',
    price: 15,
    duration: '3 days',
    detail: 'Great for a short stay',
    unit: 'GH₵5/day',
    popular: true,
  },
  {
    id: 'week',
    name: 'Weekly Pass',
    price: 35,
    duration: '7 days',
    detail: 'More time, better value',
    unit: 'GH₵5/day',
  },
  {
    id: 'month',
    name: 'Monthly Pass',
    price: 150,
    duration: '30 days',
    detail: 'Your everyday connection',
    unit: 'GH₵5/day',
  },
];

function App() {
  const [selected, setSelected] = useState('three');
  const [view, setView] = useState('home');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [phone, setPhone] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [notice, setNotice] = useState('');
  const [adminOpen, setAdminOpen] = useState(false);

  const chosenPlan = plans.find(plan => plan.id === selected) || plans[1];

  function choosePlan(id) {
    setSelected(id);
    setView('checkout');
    setNotice('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function submitLogin(event) {
    event.preventDefault();
    if (!phone.trim() || !accessCode.trim()) {
      setNotice('Enter your phone/username and access code to continue.');
      return;
    }
    setNotice(
      'Internet login is not active yet. Connect and configure your router before enabling customer access.'
    );
  }

  function submitCheckout(event) {
    event.preventDefault();
    if (!phone.trim()) {
      setNotice('Enter the phone number you will use for your access account.');
      return;
    }
    setNotice(
      'Checkout is in preview mode. A Ghana payment provider and router access API must be configured before money can be collected or access activated.'
    );
  }

  return (
    <div className="site-shell">
      <div className="topline">
        <span className="live-dot" /> ALL PROMINENT TELECOMMUNICATION GHANA (APTG){' '}
        <span className="topline-divider">•</span> FAST. FAIR. LOCAL.
      </div>
      <header className="header">
        <a
          className="brand"
          href="#home"
          onClick={e => {
            e.preventDefault();
            setView('home');
          }}
        >
          <span className="brand-icon">
            <Wifi size={24} strokeWidth={2.5} />
          </span>
          <span>
            <strong>
              APTG<span> Wi-Fi</span>
            </strong>
            <small>ALL PROMINENT TELECOMMUNICATION GHANA</small>
          </span>
        </a>
        <nav className={mobileMenu ? 'nav nav-open' : 'nav'}>
          <button
            onClick={() => {
              setView('home');
              setMobileMenu(false);
            }}
          >
            Home
          </button>
          <button
            onClick={() => {
              setView('home');
              setMobileMenu(false);
              document
                .getElementById('plans')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Internet plans
          </button>
          <button
            onClick={() => {
              setView('login');
              setMobileMenu(false);
            }}
          >
            Customer login
          </button>
        </nav>
        <div className="header-actions">
          <button className="login-link" onClick={() => setView('login')}>
            <UserRound size={17} /> Log in
          </button>
          <button
            className="header-cta"
            onClick={() => {
              setView('home');
              document
                .getElementById('plans')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get connected <ArrowRight size={16} />
          </button>
        </div>
        <button
          className="menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <X /> : <Menu />}
        </button>
      </header>

      {view === 'home' && (
        <main>
          <section className="hero" id="home">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="eyebrow-mark">
                  <Signal size={14} />
                </span>{' '}
                INTERNET THAT WORKS FOR YOU
              </div>
              <h1>
                Your community.
                <br />
                Your connection.
                <br />
                <em>Your freedom.</em>
              </h1>
              <p className="hero-description">
                Reliable, high-speed neighbourhood internet with simple packages
                and no confusing contracts. Choose a pass that works for you.
              </p>
              <div className="hero-buttons">
                <button
                  className="primary-button"