import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Mail, MapPin, FileText, CheckSquare, Users, GitBranch, Shield, ExternalLink, Check, Compass, Handshake, Database, Target, Layers, Clock, Map, ClipboardCheck } from 'lucide-react';

const ExpandableCard = ({ card, defaultOpen }) => {
  const [open, setOpen] = React.useState(defaultOpen);
  const hasSummary = Boolean(card.summary);
  const summaryPaddingLeft = card.icon ? '1.75rem' : 0;
  return (
    <div style={{ borderLeft: `4px solid ${card.borderColor}`, background: '#fff', borderTop: '1px solid #e5e7eb', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', borderRadius: '0 8px 8px 0', marginBottom: '1rem' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', background: 'none', border: 'none', padding: '1.25rem 1.75rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', textAlign: 'left' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {card.icon}
            <span className="heading" style={{ fontSize: '1.1rem', color: '#111827' }}>{card.title}</span>
            <span className={`tag ${card.tagClass}`}>{card.tagLabel}</span>
          </div>
          {hasSummary && (
            <p className="body-text" style={{ fontSize: '0.85rem', color: '#4b5563', fontWeight: 400, lineHeight: 1.5, paddingLeft: summaryPaddingLeft }}>
              {card.summary}
            </p>
          )}
        </div>
        <span style={{ color: '#2563eb', fontSize: '1.2rem', fontWeight: 300, flexShrink: 0, marginTop: '0.1rem' }}>
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div style={{ padding: '0 1.75rem 1.5rem', borderTop: '1px solid #f3f4f6' }}>
          <div style={{ paddingTop: '1.25rem' }}>
            {card.detail}
          </div>
        </div>
      )}
    </div>
  );
};

const CareQueryWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [scopeOpen, setScopeOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'what-it-does', 'how-it-works', 'join-the-pilot', 'contact'];
      const scrollPosition = window.scrollY + 120;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ 'form-name': 'stay-informed', email, 'bot-field': '' }).toString(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Form submission failed with status ${response.status}`);
        }
        setSubmitted(true);
        setEmail('');
      })
      .catch(() => {
        setSubmitError('Could not submit right now. Please email hello@carequery.uk instead.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'what-it-does', label: 'What It Does' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'join-the-pilot', label: 'Join the Pilot' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="care-query-site" style={{ fontFamily: "'Inter', sans-serif", background: '#ffffff', minHeight: '100vh', color: '#111827' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .care-query-site, .care-query-site * { box-sizing: border-box; margin: 0; padding: 0; }
        .care-query-site { background: #ffffff; font-family: 'Inter', sans-serif; }
        .care-query-site .heading { font-family: 'Inter', sans-serif; font-weight: 700; }
        .care-query-site .body-text { font-family: 'Inter', sans-serif; font-weight: 400; }
        .care-query-site .nav-link { font-family: 'Inter', sans-serif; font-size: 0.875rem; font-weight: 500; cursor: pointer; border: none; background: none; transition: color 0.2s; letter-spacing: 0.01em; }
        .care-query-site .nav-link:hover { color: #2563eb; }
        .care-query-site .nav-link.active { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 2px; }
        .care-query-site .card { background: #fff; border-radius: 8px; border: 1px solid #e5e7eb; }
        .care-query-site .tag { display: inline-block; font-family: 'Inter', sans-serif; font-size: 0.7rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; padding: 0.25rem 0.6rem; border-radius: 9999px; }
        .care-query-site .tag-blue { background: #dbeafe; color: #1e40af; }
        .care-query-site .tag-amber { background: #fef9c3; color: #854d0e; }
        .care-query-site .tag-slate { background: #f3f4f6; color: #374151; }
        .care-query-site .tag-green { background: #dcfce7; color: #166534; }
        .care-query-site .tag-burgundy { background: #fce7ef; color: #7f1d1d; }
        .care-query-site .tag-indigo { background: #ede9fe; color: #3730a3; }
        .care-query-site .tag-poc { background: #dbeafe; color: #1e40af; border: 1px solid #93c5fd; }
        .care-query-site .btn-primary { font-family: 'Inter', sans-serif; font-weight: 500; font-size: 0.9rem; padding: 0.75rem 1.75rem; background: #2563eb; color: #fff; border: none; border-radius: 8px; cursor: pointer; transition: background 0.2s; letter-spacing: 0.01em; }
        .care-query-site .btn-primary:hover { background: #1d4ed8; }
        .care-query-site .btn-outline { font-family: 'Inter', sans-serif; font-weight: 500; font-size: 0.9rem; padding: 0.75rem 1.75rem; background: transparent; color: #2563eb; border: 2px solid #2563eb; border-radius: 8px; cursor: pointer; transition: all 0.2s; letter-spacing: 0.01em; }
        .care-query-site .btn-outline:hover { background: #eff6ff; }
        .care-query-site .divider { height: 1px; background: linear-gradient(to right, transparent, #e5e7eb, transparent); margin: 0 auto; }
        .care-query-site .tech-pill { font-family: 'Inter', monospace; font-size: 0.78rem; font-weight: 500; padding: 0.3rem 0.75rem; background: #111827; color: #dbeafe; border-radius: 6px; display: inline-block; margin: 0.2rem; }
        .care-query-site .step-number { font-family: 'Inter', sans-serif; font-weight: 700; font-size: 3rem; color: #dbeafe; line-height: 1; }
        .care-query-site .input-field { font-family: 'Inter', sans-serif; width: 100%; padding: 0.75rem 1rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 0.9rem; outline: none; background: #fff; transition: border-color 0.2s, box-shadow 0.2s; }
        .care-query-site .input-field:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }
        .care-query-site .brand { color: #2563eb; font-weight: 700; }
        .care-query-site .desktop-nav { display: flex; gap: 2rem; }
        .care-query-site .mobile-menu-btn { display: none; }
        @media (max-width: 768px) {
          .care-query-site .desktop-nav { display: none !important; }
          .care-query-site .mobile-menu-btn { display: block !important; }
          .care-query-site .three-col { grid-template-columns: 1fr !important; }
          .care-query-site .two-col { grid-template-columns: 1fr !important; }
          .care-query-site .service-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <form name="stay-informed" data-netlify="true" netlify-honeypot="bot-field" hidden aria-hidden="true">
        <input type="email" name="email" />
        <input type="text" name="bot-field" />
      </form>

      {/* Navigation */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', zIndex: 50, borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <img src="./Logo-Care-Query-1.svg" alt="Care Query" style={{ width: '2rem', height: '2rem', borderRadius: '4px' }} />
              <span style={{ fontSize: '1.4rem', fontWeight: 700, color: '#2563eb', letterSpacing: '-0.01em' }}>Care Query</span>
              <span className="tag tag-poc">PoC</span>
            </div>
            <div className="desktop-nav">
              {navItems.map(item => (
                <button key={item.id} onClick={() => scrollToSection(item.id)}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  style={{ color: activeSection === item.id ? '#2563eb' : '#374151' }}>
                  {item.label}
                </button>
              ))}
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#374151' }}
              className="mobile-menu-btn">
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div style={{ background: '#ffffff', borderTop: '1px solid #e5e7eb', padding: '0.75rem 1.5rem' }}>
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollToSection(item.id)}
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.6rem 0', color: '#374151', background: 'none', border: 'none', fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', cursor: 'pointer' }}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="home" style={{ paddingTop: '64px', minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(160deg, #ffffff 40%, #eff6ff 100%)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 1.5rem 4rem' }}>
          <div style={{ maxWidth: '700px' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="tag tag-poc" style={{ marginRight: '0.5rem' }}>Proof of Concept — 2026</span>
              <span className="tag tag-blue">Cheshire &amp; Merseyside ICB</span>
            </div>
            <h1 className="heading" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', lineHeight: 1.15, color: '#111827', marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
              Know what the service needs.<br />
              <em style={{ color: '#2563eb' }}>Before the referral is submitted.</em>
            </h1>
            <p className="body-text" style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#4b5563', marginBottom: '1.75rem', fontWeight: 400 }}>
              <span className="brand">Care Query</span> encodes NHS MSK service requirements into a single governed record per service — generating five deterministic outputs for clinicians, practice teams, and patients. No AI. No integration. No patient data.
            </p>
            <div style={{ borderLeft: '3px solid #374151', paddingLeft: '1rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#111827', fontWeight: 400 }}>
                The <strong style={{ color: '#ca8a04' }}>Service Card</strong> shows what each NHS MSK service actually does — the criteria, the catchment, the investigations it expects. The <strong style={{ color: '#9b2335' }}>Gate Card</strong> confirms all administrative prerequisites for this patient before submission — with per-gate attestation and a formally documented basis for each confirmation. In either outcome, the patient leaves the consultation with a URL they can open.
              </p>
              <p className="body-text" style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
                A single governed record per service generates five outputs: a <strong>Pathway Overview</strong> (all services at a glance), a <strong style={{ color: '#ca8a04' }}>Service Card</strong> (what the service does and who it sees), a <strong style={{ color: '#9b2335' }}>Gate Card</strong> (per-patient administrative checklist with attestation model), a <strong style={{ color: '#16a34a' }}>Journey Card</strong> (patient summary when the referral is ready), and a <strong style={{ color: '#4f46e5' }}>Preparation Card</strong> (patient plan when prerequisites are outstanding). All five from one governed record. Update the record once — every output reflects the change.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <button className="btn-primary" onClick={() => scrollToSection('join-the-pilot')}>
                Join the 12-Week Pilot <ArrowRight size={16} style={{ display: 'inline', marginLeft: '0.3rem', verticalAlign: 'middle' }} />
              </button>
              <button className="btn-outline" onClick={() => scrollToSection('how-it-works')}>
                Technical architecture
              </button>
            </div>
            <p className="body-text" style={{ fontSize: '0.82rem', color: '#6b7280', fontWeight: 400, lineHeight: 1.6 }}>
              Clinician-led social enterprise. DCB0129 clinical safety active. NICE ESF Tier A. No integration required. Runs in any browser.
            </p>
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: '1100px', margin: '0 auto' }} />

      {/* What It Does */}
      <section id="what-it-does" style={{ padding: '6rem 1.5rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '4rem', alignItems: 'start', marginBottom: '3.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <Database size={20} color="#2563eb" />
                <span className="tag tag-blue" style={{ marginBottom: '0' }}>Five Outputs</span>
              </div>
              <h2 className="heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', lineHeight: 1.2, color: '#111827', letterSpacing: '-0.01em' }}>
                One governed record.<br />Five deterministic outputs.
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
                The gap GPs fill by sending trial referrals and reading the rejection is: "What does this service actually accept?" <span className="brand">Care Query</span> answers it before anything is submitted. A single governed record per service generates five outputs — one for every stage of the referral conversation, from pathway orientation to patient handoff.
              </p>
              <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
                The <strong>Pathway Overview</strong> gives the landscape. The <strong style={{ color: '#ca8a04' }}>Service Card</strong> shows what each service actually does. The <strong style={{ color: '#9b2335' }}>Gate Card</strong> confirms administrative prerequisites per patient with a documented attestation basis. The <strong style={{ color: '#16a34a' }}>Journey Card</strong> reaches the patient when the referral is ready. The <strong style={{ color: '#4f46e5' }}>Preparation Card</strong> reaches the patient when prerequisites are outstanding — turning "not yet" into a structured next step. All five from the same governed record. Update the record once; every output reflects the change.
              </p>
            </div>
          </div>

          {/* Five expandable output cards — Service Card leads */}
          {[
            {
              icon: <Map size={20} color="#2563eb" />,
              title: 'Pathway Overview — All Services at a Glance',
              tagClass: 'tag-blue',
              tagLabel: 'Entry point — GPs · FCPs · Practice staff',
              borderColor: '#2563eb',
              defaultOpen: false,
              summary: 'All local MSK services on one screen in under 30 seconds. The starting point before any referral decision.',
              detail: (
                <>
                  <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '1rem' }}>
                    The Pathway Overview is the first thing a clinician sees when they open <span className="brand">Care Query</span>. Every encoded NHS MSK service appears as a scannable card — service name, what it covers, whether it operates via mandatory A&G or direct referral, and the current record status (published, draft, or overdue for review). Stale records are flagged. Published records are clearly marked.
                  </p>
                  <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '1.25rem' }}>
                    The Pathway Overview is not a directory — it is the entry point to a governed set of records. Selecting a service opens the Service Card: the full record of what that service actually does. The overview is designed to be scanned in seconds, not studied.
                  </p>
                  {/* Pathway Overview illustration */}
                  <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                    <div className="body-text" style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '0.75rem' }}>
                      Illustrative example — Cheshire &amp; Merseyside MSK services
                    </div>
                    {[
                      { code: 'WHHRHEUM', name: 'WHH Rheumatology', catchment: 'Warrington and Halton', type: 'A&G mandatory', typeColor: '#fce7ef', typeText: '#7f1d1d' },
                      { code: 'MSKCATS', name: 'MSK CATS — Community Triage', catchment: 'Cheshire and Merseyside', type: 'Direct referral', typeColor: '#dcfce7', typeText: '#166534' },
                      { code: 'CMPHYSIO', name: 'Community Physiotherapy', catchment: 'Various — check record', type: 'Direct referral', typeColor: '#dcfce7', typeText: '#166534' },
                    ].map((svc, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 0.85rem', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px', marginBottom: i < 2 ? '0.4rem' : 0 }}>
                        <div>
                          <div className="body-text" style={{ fontSize: '0.65rem', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '0.15rem' }}>{svc.code}</div>
                          <div className="body-text" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#111827', marginBottom: '0.1rem' }}>{svc.name}</div>
                          <div className="body-text" style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: 400 }}>{svc.catchment}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
                          <span style={{ fontSize: '0.65rem', fontWeight: 600, background: svc.typeColor, color: svc.typeText, padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>{svc.type}</span>
                          <span className="body-text" style={{ fontSize: '0.72rem', color: '#2563eb', fontWeight: 500 }}>Explore →</span>
                        </div>
                      </div>
                    ))}
                    <div style={{ marginTop: '0.75rem', padding: '0.5rem 0.75rem', background: '#f3f4f6', borderRadius: '6px' }}>
                      <span className="body-text" style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: 400 }}>
                        Records marked DRAFT are not yet verified by a steward. PUBLISHED records have been reviewed within the required period.
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {['All services at a glance', 'A&G vs direct referral', 'Record status visible', 'Stale records flagged', 'Entry point to Service Card'].map(t => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                  </div>
                </>
              ),
            },
            {
              icon: <FileText size={20} color="#ca8a04" />,
              title: 'Service Card — What This Service Actually Does',
              tagClass: 'tag-amber',
              tagLabel: 'Primary exploration — Clinicians · Practice staff · Commissioners',
              borderColor: '#ca8a04',
              defaultOpen: true,
              summary: 'What the service actually does, who it sees, and what it requires before entry. The question currently answered by sending a trial referral — answered here first.',
              detail: (
                <>
                  <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '1rem' }}>
                    The Service Card is the governed record of what each NHS MSK service actually does — referral criteria, catchment, required investigations, typical waiting times, operational contacts, and what the service explicitly does not accept. It is the starting point for any referral decision: before a clinician checks gate prerequisites, they need to know whether this service is the right destination.
                  </p>
                  <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '1.25rem' }}>
                    Every field belongs to one of two layers: <strong>Layer 1</strong> — verified public truth from published documents and direct written confirmation; or <strong>Layer 2</strong> — tacit operational knowledge sourced from experienced clinical referrers through structured conversations. Layer 2 is the specific hypothesis this PoC is testing: whether the operational nuance that lives in the heads of experienced FCPs can be encoded, attributed to a named source, and made accessible at the point of referral. Every Service Card has a named steward — a specific person in the service responsible for verifying its contents on a defined review cycle.
                  </p>

                  {/* Illustrative service card — clean example, no draft markers */}
                  <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', marginBottom: '1.25rem', overflow: 'hidden' }}>
                    <div style={{ background: '#dbeafe', borderBottom: '1px solid #93c5fd', padding: '0.4rem 1rem' }}>
                      <span className="body-text" style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1e40af' }}>
                        Illustrative example — service record content is subject to steward verification before pilot access
                      </span>
                    </div>
                    <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <div className="heading" style={{ fontSize: '1rem', color: '#111827', marginBottom: '0.2rem' }}>
                          Warrington &amp; Halton Hospitals — Rheumatology
                        </div>
                        <div className="body-text" style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 400 }}>
                          Code: WHHRHEUM · Steward: Named clinical contact · Review cycle: 90 days
                        </div>
                      </div>
                    </div>
                    <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #e5e7eb' }}>
                      <div className="body-text" style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '0.6rem' }}>
                        Referral criteria
                      </div>
                      {[
                        'Inflammatory arthritis suspected — swollen joints, morning stiffness exceeding 30 minutes, or symmetrical joint involvement',
                        "Connective tissue disease suspected — systemic symptoms, unexplained rash, Raynaud's phenomenon, or sicca symptoms",
                        'Gout or crystal arthropathy with recurrent attacks requiring disease-modifying treatment consideration',
                        'Registered with a GP practice within the Warrington and Halton health economy',
                        'Not currently under active rheumatology follow-up at WHH or another Trust',
                      ].map((criterion, i) => (
                        <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', padding: '0.35rem 0', borderBottom: i < 4 ? '1px solid #f3f4f6' : 'none' }}>
                          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#ca8a04', flexShrink: 0, marginTop: '0.45rem' }} />
                          <span className="body-text" style={{ fontSize: '0.82rem', color: '#4b5563', fontWeight: 400, lineHeight: 1.5 }}>{criterion}</span>
                        </div>
                      ))}
                    </div>
                    <div className="service-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0', borderBottom: '1px solid #e5e7eb' }}>
                      {[
                        { label: 'Catchment', value: 'Warrington and Halton — GP practices within the WHH catchment area' },
                        { label: 'Typical wait', value: '14 weeks to first outpatient appointment (My Planned Care, 2025)' },
                        { label: 'Referral route', value: 'GP referral to WHH Rheumatology; or via MSKCATS after physiotherapy triage' },
                      ].map((item, i) => (
                        <div key={i} style={{ padding: '0.85rem 1.25rem', borderRight: i < 2 ? '1px solid #e5e7eb' : 'none' }}>
                          <div className="body-text" style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '0.3rem' }}>{item.label}</div>
                          <div className="body-text" style={{ fontSize: '0.8rem', color: '#111827', fontWeight: 400, lineHeight: 1.4 }}>{item.value}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #e5e7eb' }}>
                      <div className="body-text" style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '0.6rem' }}>
                        Referrer intelligence — Layer 2
                      </div>
                      <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '6px', padding: '0.75rem' }}>
                        <div className="body-text" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#92400e', marginBottom: '0.3rem' }}>
                          Most common A&amp;G return reason
                        </div>
                        <p className="body-text" style={{ fontSize: '0.8rem', color: '#92400e', lineHeight: 1.5, marginBottom: '0.5rem', fontWeight: 400 }}>
                          Missing clinical reasoning statement — no sentence distinguishing inflammatory from mechanical pathology. Not in published criteria, but the single most common reason for A&G return.
                        </p>
                        <div className="body-text" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#166534', marginBottom: '0.25rem' }}>
                          Avoidance
                        </div>
                        <p className="body-text" style={{ fontSize: '0.8rem', color: '#166534', lineHeight: 1.5, fontWeight: 400 }}>
                          Add one sentence: e.g. "Presentation is inflammatory in pattern given morning stiffness &gt;60 min, small joint symmetry, and elevated CRP."
                        </p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {['Underlying Service Record', 'Layer 1 + Layer 2', 'Steward-governed', 'Stale warning system', 'Primary exploration surface'].map(t => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                  </div>
                </>
              ),
            },
            {
              icon: <CheckSquare size={20} color="#9b2335" />,
              title: 'Gate Card — Per-Patient Administrative Checklist',
              tagClass: 'tag-burgundy',
              tagLabel: 'GPs · Physician Associates · Paramedics · ACPs · FCPs',
              borderColor: '#9b2335',
              defaultOpen: false,
              summary: 'Each prerequisite confirmed individually with a documented basis. If a criterion cannot be met due to a system-level barrier, the Cannot Meet option formally records the structural constraint — not a gap in the notes.',
              detail: (
                <>
                  <div style={{ background: '#fef9c3', border: '1px solid #fde68a', borderRadius: '6px', padding: '0.65rem 1rem', marginBottom: '1.25rem' }}>
                    <p className="body-text" style={{ fontSize: '0.82rem', color: '#854d0e', fontWeight: 400, lineHeight: 1.5 }}>
                      Most services expect these fields — use as a memory aid, not a clinical checklist.
                    </p>
                  </div>
                  <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '1.25rem' }}>
                    Knowing what a service accepts (Service Card) and confirming this patient meets those requirements right now (Gate Card) are different steps. A common reason for a returned submission is not that the clinician didn't know the criteria — it is that a required investigation wasn't completed yet, or the conservative management history wasn't documented in a way the receiving service can verify. The Gate Card catches these in the consultation, not three weeks later.
                  </p>
                  <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '1.25rem' }}>
                    Each gate is confirmed individually with a documented basis: confirmed from the clinical record, confirmed from the patient, not yet met, or cannot be met. Per-gate attestation — not a single bulk checkbox. When all hard gates are confirmed, a clipboard-ready administrative summary is generated for the A&G submission or direct referral. If any gate is not yet met, the outcome is a Preparation Card — not a dead end.
                  </p>
                  {/* Gate Card illustration */}
                  <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                    <div className="body-text" style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '0.75rem' }}>
                      Illustrative example — WHH Rheumatology (WHHRHEUM) · A&amp;G mandatory
                    </div>
                    <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '6px', padding: '0.75rem', marginBottom: '0.85rem' }}>
                      <div className="body-text" style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#be123c', marginBottom: '0.5rem' }}>
                        Stop and act — do not proceed with A&amp;G referral
                      </div>
                      {[
                        'New onset joint swelling, pain and stiffness with systemic features (fever, weight loss, or fatigue) — consider urgent same-day assessment',
                        'Suspected septic arthritis (hot, swollen joint with fever) — emergency assessment required, not this pathway',
                      ].map((flag, i) => (
                        <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', paddingTop: i > 0 ? '0.3rem' : 0 }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#be123c', flexShrink: 0, marginTop: '0.45rem' }} />
                          <span className="body-text" style={{ fontSize: '0.8rem', color: '#be123c', fontWeight: 500, lineHeight: 1.5 }}>{flag}</span>
                        </div>
                      ))}
                    </div>
                    {[
                      'ESR (Erythrocyte Sedimentation Rate) result documented in referral',
                      'CRP (C-Reactive Protein) result documented in referral',
                      'Rheumatoid Factor (RF) result documented in referral',
                      'Anti-CCP antibody result documented in referral',
                      'Symptom duration documented — minimum 6 weeks of joint symptoms',
                      'Morning stiffness duration documented',
                      'Clinical reasoning documented in A&G — one sentence distinguishing suspected inflammatory from mechanical pathology',
                    ].map((gate, i) => (
                      <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', padding: '0.4rem 0', borderBottom: i < 6 ? '1px solid #f3f4f6' : 'none' }}>
                        <div style={{ width: '16px', height: '16px', border: '2px solid #9b2335', borderRadius: '4px', flexShrink: 0, marginTop: '0.15rem' }} />
                        <span className="body-text" style={{ fontSize: '0.82rem', color: '#4b5563', fontWeight: 400, lineHeight: 1.5 }}>{gate}</span>
                      </div>
                    ))}
                    <div style={{ marginTop: '0.75rem', padding: '0.6rem 0.75rem', background: '#fce7ef', borderRadius: '6px' }}>
                      <span className="body-text" style={{ fontSize: '0.78rem', color: '#7f1d1d', fontWeight: 500 }}>
                        All gates confirmed → clipboard summary generated + patient outcome URL produced.
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {['Hard gates', 'Soft gates', 'Per-gate attestation', 'Basis selector', 'Cannot Meet — structured barrier', 'Clipboard summary', 'Triggers patient outcome'].map(t => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                  </div>
                </>
              ),
            },
            {
              icon: <Users size={20} color="#16a34a" />,
              title: 'Journey Card — Patient Summary After Referral',
              tagClass: 'tag-green',
              tagLabel: 'Ready path — patient-facing · sent by the referring clinician',
              borderColor: '#16a34a',
              defaultOpen: false,
              summary: 'Time-aware patient summary delivered via SMS after referral. Phase-appropriate messages that update as weeks pass — reassurance early, guidance later, a clear action prompt when the wait becomes overdue.',
              detail: (
                <>
                  <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '1rem' }}>
                    When all Gate Card prerequisites are confirmed, two things happen: a clipboard summary is generated for the A&G submission or direct referral, and a Journey Card URL is produced — ready to send to the patient via Accurx SMS. The URL carries the referral date. When the patient opens it, the card calculates how many weeks have passed and renders a phase-appropriate message. No login, no data collection — the date lives in the URL itself.
                  </p>
                  <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '1.25rem' }}>
                    The URL also carries a <strong>confidence signal</strong> — confirming that the clinician verified all administrative prerequisites before submitting. This transfers the clinician's diligence into patient reassurance. The patient sees not just where they're going but that their referral was prepared correctly. The Journey Card opens in an isolated patient view: no navigation to clinician-facing content, no administrative detail, no escape paths.
                  </p>
                  {/* Phase illustration */}
                  <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                    <div className="body-text" style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '0.75rem' }}>
                      Time-aware phases — WHH Rheumatology (14-week wait estimate)
                    </div>
                    <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderLeft: '4px solid #16a34a', borderRadius: '6px', padding: '0.65rem 0.85rem', marginBottom: '0.85rem' }}>
                      <span className="body-text" style={{ fontSize: '0.78rem', color: '#166534', fontWeight: 500 }}>
                        Before submitting your referral, your clinician confirmed that it meets all known administrative prerequisites for this service.
                      </span>
                    </div>
                    {[
                      { weeks: 'Weeks 0–2', phase: 'Your Referral Has Been Submitted', message: 'Your referral has been received. There is nothing you need to do at this stage.', bg: '#dcfce7', border: '#16a34a', color: '#166534', label: 'Reassurance' },
                      { weeks: 'Weeks 3–7', phase: 'You Are Within the Expected Waiting Period', message: 'You are still within the normal waiting window for this service. No action is needed.', bg: '#dcfce7', border: '#16a34a', color: '#166534', label: 'Reassurance' },
                      { weeks: 'Weeks 8–14', phase: 'Your Appointment Should Be Coming Soon', message: 'If you have not been contacted within 14 weeks, contact your GP practice.', bg: '#fef9c3', border: '#ca8a04', color: '#854d0e', label: 'Guidance' },
                      { weeks: 'Week 15+', phase: 'You Have Been Waiting Longer Than Typical', message: 'Contact your GP practice and ask them to check the status of your referral.', bg: '#dbeafe', border: '#2563eb', color: '#1e40af', label: 'Action' },
                    ].map((p, i) => (
                      <div key={i} style={{ borderLeft: `3px solid ${p.border}`, background: p.bg, borderRadius: '4px', padding: '0.6rem 0.85rem', marginBottom: i < 3 ? '0.5rem' : 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                          <span className="body-text" style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: p.color }}>{p.weeks}</span>
                          <span className="body-text" style={{ fontSize: '0.6rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: p.color, opacity: 0.7 }}>{p.label}</span>
                        </div>
                        <div className="heading" style={{ fontSize: '0.82rem', color: p.color, marginBottom: '0.15rem' }}>{p.phase}</div>
                        <span className="body-text" style={{ fontSize: '0.75rem', color: p.color, fontWeight: 400, lineHeight: 1.4 }}>{p.message}</span>
                      </div>
                    ))}
                    <div style={{ marginTop: '0.75rem', padding: '0.5rem 0.75rem', background: '#f3f4f6', borderRadius: '6px' }}>
                      <span className="body-text" style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: 400 }}>
                        Colour discipline: red is reserved for emergencies only. Overdue uses blue (action prompt), not alarm.
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {['Time-aware phases', 'Confidence signal', 'SMS-safe URLs', 'Patient isolation', 'No data collection', 'Ready path outcome'].map(t => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                  </div>
                </>
              ),
            },
            {
              icon: <ClipboardCheck size={20} color="#4f46e5" />,
              title: 'Preparation Card — Not Yet Path',
              tagClass: 'tag-indigo',
              tagLabel: 'Not yet ready — patient-facing · structured next step',
              borderColor: '#4f46e5',
              defaultOpen: false,
              summary: 'When prerequisites are outstanding, the outcome is not a dead end — it is a plan. The Preparation Card shows the patient what remains outstanding and gives them a URL with their preparation phase — a structured next step, not a waiting view.',
              detail: (
                <>
                  <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '1rem' }}>
                    Not every referral is ready to be submitted today. An imaging result not yet back, a course of conservative management still in progress, a catchment question needing clarification. When any gate is marked "not yet met," the Gate Card generates a Preparation Card rather than a submission summary. The clinician gets a structured view of what is outstanding. The patient gets a URL they can open.
                  </p>
                  <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '1.25rem' }}>
                    This is likely the majority outcome. Most patients presenting for MSK assessment for the first time have something outstanding before a specialist referral is appropriate — an investigation to complete, a period of treatment to work through, information to gather. The Preparation Card positions this as an informed next step, not a refusal. The patient sees what their clinician is working through, what they can do in the meantime, and when to expect to hear more. They leave the consultation with something in hand.
                  </p>
                  {/* Preparation Card illustration */}
                  <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                    <div className="body-text" style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '0.75rem' }}>
                      Illustrative example — Not Yet outcome · WHH Rheumatology
                    </div>
                    <div style={{ background: '#ede9fe', border: '1px solid #c4b5fd', borderRadius: '6px', padding: '0.85rem', marginBottom: '0.85rem' }}>
                      <div className="body-text" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#3730a3', marginBottom: '0.45rem' }}>
                        Before this referral is ready — 2 items outstanding
                      </div>
                      {[
                        'Anti-CCP antibody result not yet available — request and document before submitting',
                        'Symptom duration not yet 6 weeks — reassess at the 6-week mark',
                      ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', paddingTop: i > 0 ? '0.4rem' : 0 }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4f46e5', flexShrink: 0, marginTop: '0.45rem' }} />
                          <span className="body-text" style={{ fontSize: '0.8rem', color: '#3730a3', fontWeight: 400, lineHeight: 1.5 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ padding: '0.75rem 0.85rem', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px' }}>
                      <div className="body-text" style={{ fontSize: '0.65rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.3rem' }}>
                        Patient preparation link — sent via Accurx
                      </div>
                      <div className="body-text" style={{ fontSize: '0.8rem', color: '#4b5563', lineHeight: 1.5, fontWeight: 400 }}>
                        Patient opens the URL and sees: what their clinician is working through, what they can do now, and when to expect to hear more from the practice. A preparation phase view — not a waiting view.
                      </div>
                    </div>
                  </div>
                  <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '1.25rem' }}>
                    The Preparation Card is a first-class outcome — not a fallback. The patient is part of the plan from the first consultation. The clinician has a structured record of what is outstanding. And when the outstanding items are resolved, the clinician returns to the Gate Card and completes the referral.
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {['Not Yet → structured plan', 'Patient URL generated', 'Preparation phase view', 'Informed next step', 'No backend required', 'First-class outcome'].map(t => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                  </div>
                </>
              ),
            },
          ].map((card, idx) => (
            <ExpandableCard key={idx} card={card} defaultOpen={card.defaultOpen} />
          ))}

          {/* Architecture note */}
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f3f4f6', borderRadius: '8px', borderLeft: '4px solid #2563eb' }}>
            <p className="body-text" style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#374151', fontWeight: 400 }}>
              Each service is described in a single <strong style={{ color: '#374151' }}>Underlying Service Record</strong> — a governed JSON file maintained by a named steward. From it, five outputs are generated. The <strong>Pathway Overview</strong> is the entry point. The <strong style={{ color: '#ca8a04' }}>Service Card</strong> is the primary exploration surface — what the service actually does. The <strong style={{ color: '#9b2335' }}>Gate Card</strong> confirms administrative prerequisites per patient. In either outcome — all gates confirmed or any outstanding — the patient leaves the consultation with something in hand: a <strong style={{ color: '#16a34a' }}>Journey Card</strong> URL or a <strong style={{ color: '#4f46e5' }}>Preparation Card</strong> URL. The governed record changes once; every output reflects the update.
            </p>
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: '1100px', margin: '0 auto' }} />

      {/* Current Scope */}
      <section style={{ padding: '3rem 1.5rem', background: '#f9fafb' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ maxWidth: '820px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Compass size={20} color="#2563eb" />
              <span className="tag tag-blue" style={{ marginBottom: '0' }}>Current Scope</span>
            </div>
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                {[
                  { label: 'Stage', value: 'Proof of concept — not yet publicly available' },
                  { label: 'Services', value: '5 MSK services encoded in Cheshire and Merseyside ICB' },
                  { label: 'Next milestone', value: 'Pilot with 5–10 GP practices — measure A&G rejection rate reduction' },
                  { label: 'Access', value: 'Browser-based, no installation, no login — clipboard summary ready to paste into EMIS or SystmOne A&G, patient URL ready to send via Accurx' },
                  { label: 'Cost to NHS', value: 'Free at point of use during the pilot phase. Future model: annual ICB block licence, no per-clinician charge, no capital cost.' },
                ].map((item, i) => (
                  <div key={i} style={{ padding: '0.9rem 1rem', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                    <div className="body-text" style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#2563eb', marginBottom: '0.35rem' }}>{item.label}</div>
                    <div className="body-text" style={{ fontSize: '0.88rem', color: '#374151', fontWeight: 400, lineHeight: 1.5 }}>{item.value}</div>
                  </div>
                ))}
              </div>
              <p className="body-text" style={{ fontSize: '0.78rem', color: '#6b7280', fontWeight: 400, marginBottom: '1rem', lineHeight: 1.5 }}>
                Data source: Encoded from publicly available referral guidance and verified with service teams where possible.
              </p>
              <button
                onClick={() => setScopeOpen(!scopeOpen)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0', marginBottom: scopeOpen ? '1.25rem' : 0 }}
              >
                <span className="body-text" style={{ fontSize: '0.82rem', color: '#2563eb', fontWeight: 500 }}>{scopeOpen ? 'Less detail −' : 'More detail +'}</span>
              </button>
              {scopeOpen && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', borderLeft: '3px solid #d1d5db', paddingLeft: '1.25rem' }}>
                  <p className="body-text" style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#111827', fontWeight: 400 }}>
                    No national tool currently does what the Service Card and Gate Card do together. NHS England built the monitoring infrastructure, the referral pipe, and the waiting list analytics. Nobody built the pre-referral service information layer and per-patient administrative checklist for the clinician at the point of referral. Strategic research confirmed in March 2026 that no ICB, trust, or commercial product fills this gap.
                  </p>
                  <p className="body-text" style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#111827', fontWeight: 400 }}>
                    If the pilot demonstrates value, the model can be extended to additional services and other regions.
                  </p>
                  <p className="body-text" style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#111827', fontWeight: 400 }}>
                    <strong>Why Cheshire and Merseyside first:</strong> C&amp;M ICB is under NHS England performance management, the Health Innovation North West Coast infrastructure is directly accessible, and the A&G mandate creates immediate, measurable pressure on every practice in the footprint.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: '1100px', margin: '0 auto' }} />

      {/* Why This Matters — Clinical Value + Contract Context */}
      <section style={{ padding: '6rem 1.5rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Clock size={20} color="#2563eb" />
              <span className="tag tag-blue" style={{ marginBottom: '0' }}>Context</span>
            </div>
            <h2 className="heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', lineHeight: 1.2, color: '#111827', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
              Making referral information visible at the point of care.
            </h2>
            <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '0.75rem' }}>
              The most common reasons for returned MSK referrals — missing investigations, unclear pathway requirements, wrong service selection — are informational, not clinical. The referring clinician is competent. The information about what each service needs was not available at the point of submission. <span className="brand">Care Query</span> makes that information visible before the referral leaves the practice.
            </p>
            <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
              This gap has become more operationally significant under the 2026/27 GP contract (PRN02353), which makes Advice and Guidance mandatory for secondary care planned referrals from 1 April 2026 and removes the per-request payment. The volume of A&G submissions will increase; the administrative cost of returned submissions falls entirely on the practice.
            </p>
          </div>

          <div className="three-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
            {[
              {
                title: 'Advice and Guidance: April 2026',
                body: 'From 1 April 2026, Advice and Guidance is required for secondary care planned referrals. Intermediate services such as CATS and OCATS continue to accept direct referrals — but secondary care MSK pathways now route through A&G first. Administrative return rates for A&G submissions are measurable and directly affect practice workload.',
                accent: '#9b2335',
              },
              {
                title: 'Payment Removed',
                body: 'The £20 per-request Item of Service payment for A&G is removed. Practices that previously earned up to £20,000 annually from A&G now absorb the same volume with no funding. Every returned submission is unfunded administrative rework — the case for getting it right first time has never been stronger.',
                accent: '#ca8a04',
              },
              {
                title: 'Workforce Pressure on MSK Knowledge',
                body: 'Workforce changes increase the risk that MSK pathway knowledge is less available at practice level. When the clinician who knew the local pathway criteria moves on, that knowledge leaves with them. Care Query encodes the administrative pre-referral discipline of an experienced First Contact Practitioner and makes it available as a deterministic administrative tool.',
                accent: '#2563eb',
              },
            ].map((item, i) => (
              <div key={i} className="card" style={{ padding: '1.75rem', borderTop: `3px solid ${item.accent}` }}>
                <h3 className="heading" style={{ fontSize: '1.1rem', color: '#111827', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>{item.title}</h3>
                <p className="body-text" style={{ fontSize: '0.85rem', lineHeight: 1.65, color: '#4b5563', fontWeight: 400 }}>{item.body}</p>
              </div>
            ))}
          </div>

          <div style={{ padding: '1.5rem', background: '#f3f4f6', borderRadius: '8px', borderLeft: '4px solid #2563eb' }}>
            <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#374151', fontWeight: 400, marginBottom: '0.75rem' }}>
              <strong>What this means for practices:</strong> FCPs are now primary A&G submitters for MSK alongside GPs. The operational reality is consistent across the primary care system — every practice needs referral submissions to be administratively complete on the first attempt. Returned submissions represent unfunded rework; incomplete submissions delay the patient pathway.
            </p>
            <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#374151', fontWeight: 400 }}>
              <span className="brand">Care Query</span> does not add work — it makes the work that already needs doing visible before the referral leaves the practice. The Service Card answers the question. The Gate Card confirms the prerequisites. The patient leaves with something in hand either way.
            </p>
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: '1100px', margin: '0 auto' }} />

      {/* What Each Output Is Built For */}
      <section id="solves-failures" style={{ padding: '6rem 1.5rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Target size={20} color="#2563eb" />
              <span className="tag tag-blue" style={{ marginBottom: '0' }}>Clinical Evidence</span>
            </div>
            <h2 className="heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', lineHeight: 1.2, color: '#111827', marginBottom: '1.5rem', letterSpacing: '-0.01em' }}>
              What it does — and how it stays accurate.
            </h2>
            <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
              Experienced clinicians already understand these pathways. The gaps that cause problems are informational: not knowing what a service actually accepts before trying to refer, missing a prerequisite that wasn't visible, or a patient leaving the consultation without a clear next step. Each <span className="brand">Care Query</span> output addresses one of these documented gaps — and each is directly measurable in the pilot.
            </p>
          </div>

          {[
            {
              icon: <FileText size={20} color="#ca8a04" />,
              title: 'Unknown Service Scope → Service Card Answers the Question Before You Refer',
              tagClass: 'tag-amber',
              tagLabel: 'Service Card',
              borderColor: '#ca8a04',
              summary: 'What does this service actually accept? Who does it see? What does it expect to be in place before a referral arrives? The Service Card answers the question GPs currently answer by sending a referral and reading the rejection.',
              detail: (
                <>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div className="body-text" style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>The gap</div>
                    <p className="body-text" style={{ fontSize: '0.9rem', color: '#4b5563', fontWeight: 400, lineHeight: 1.6 }}>
                      The way GP practices learn what MSK services accept is by referring and reading the response. If the experienced FCP who knew the local pathway criteria moves on, that knowledge leaves with them. Published pathway documents — where they exist — rarely capture the operational nuance that determines whether a referral succeeds: the imaging views a specific department expects, the precise interpretation of "adequate conservative management," the undocumented prerequisites that only become visible after a rejection.
                    </p>
                  </div>
                  <div>
                    <div className="body-text" style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: 500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Care Query</div>
                    <p className="body-text" style={{ fontSize: '0.9rem', color: '#374151', fontWeight: 400, lineHeight: 1.6 }}>
                      The Service Card encodes what each service actually does — referral criteria, catchment, what it explicitly does not accept, operational contacts, and expected waiting times. Maintained by a named steward on a review cycle. A clinician can open the Service Card, read the governed record, and understand the service before making a referral decision. The question "what does this service take?" is answered before anything is submitted.
                    </p>
                  </div>
                </>
              ),
            },
            {
              icon: <CheckSquare size={20} color="#9b2335" />,
              title: 'Missing Prerequisites → Confirmed Before the Referral Is Submitted',
              tagClass: 'tag-burgundy',
              tagLabel: 'Gate Card',
              borderColor: '#9b2335',
              summary: 'From the Service Card to the Gate Card: criteria you know the service expects, confirmed as met for this patient before submission. Missing imaging, undocumented conservative management, wrong catchment — caught in the consultation, not three weeks later.',
              detail: (
                <>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div className="body-text" style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>The gap</div>
                    <p className="body-text" style={{ fontSize: '0.9rem', color: '#4b5563', fontWeight: 400, lineHeight: 1.6 }}>
                      Knowing what a service accepts and confirming this patient meets those requirements right now are different steps. A common reason for a returned submission is not that the clinician didn't know the criteria — it is that a required investigation wasn't yet done, or the conservative management history wasn't documented in a way the receiving service can verify. The rejection arrives three weeks later: unfunded work for the practice, delayed pathway for the patient.
                    </p>
                  </div>
                  <div>
                    <div className="body-text" style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: 500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Care Query</div>
                    <p className="body-text" style={{ fontSize: '0.9rem', color: '#374151', fontWeight: 400, lineHeight: 1.6 }}>
                      The Gate Card makes every prerequisite an explicit per-gate confirmation — "confirmed from record," "confirmed from patient," "not yet met," or "cannot meet." Gates cannot be skipped. When all hard gates are confirmed, a clipboard summary is generated for the submission. If any gate is not met, the outcome is a Preparation Card — the patient gets a plan rather than leaving without one.
                    </p>
                  </div>
                </>
              ),
            },
            {
              icon: <Users size={20} color="#16a34a" />,
              title: 'Patient Uncertainty After Referral → Time-Aware Reassurance in Their Hand',
              tagClass: 'tag-green',
              tagLabel: 'Journey Card',
              borderColor: '#16a34a',
              summary: 'Phase-appropriate messages that update as weeks pass — reassurance early, guidance later, a clear action prompt when the wait becomes overdue. Delivered via Accurx SMS. No login, no data collection.',
              detail: (
                <>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div className="body-text" style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>The gap</div>
                    <p className="body-text" style={{ fontSize: '0.9rem', color: '#4b5563', fontWeight: 400, lineHeight: 1.6 }}>
                      Patients expect a 2-week scan or 3-month specialist review because no one told them the real timeline. When weeks pass with no contact, they contact reception — appropriately. Every call consumes practice and hospital admin time. The anxiety is rational; the information gap is the problem.
                    </p>
                  </div>
                  <div>
                    <div className="body-text" style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: 500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Care Query</div>
                    <p className="body-text" style={{ fontSize: '0.9rem', color: '#374151', fontWeight: 400, lineHeight: 1.6 }}>
                      The Journey Card is time-aware. The URL sent via Accurx SMS carries the referral date — when the patient opens it, the card calculates elapsed weeks and renders a phase-appropriate message: reassurance in the early period, guidance as the appointment window approaches, a clear action prompt if the wait exceeds the typical timeline. A confidence signal confirms the clinician verified all prerequisites before submitting. The patient sees that their referral was prepared correctly — which is itself reassuring.
                    </p>
                  </div>
                </>
              ),
            },
            {
              icon: <ClipboardCheck size={20} color="#4f46e5" />,
              title: "No Plan When Referral Isn't Ready → Preparation Card Gives the Patient One",
              tagClass: 'tag-indigo',
              tagLabel: 'Preparation Card',
              borderColor: '#4f46e5',
              summary: 'When prerequisites are outstanding, the patient does not leave the consultation without clarity. The Preparation Card is generated immediately — the patient sees what their clinician is working through and what they can do in the meantime.',
              detail: (
                <>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div className="body-text" style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>The gap</div>
                    <p className="body-text" style={{ fontSize: '0.9rem', color: '#4b5563', fontWeight: 400, lineHeight: 1.6 }}>
                      When a referral isn't ready to submit — outstanding imaging, a course of conservative management still in progress, a catchment clarification needed — patients often leave the consultation with a vague "come back when you've had the scan" instruction. There is no structured handoff, no documentation of what is outstanding, and no information for the patient about what the plan is or when to expect to hear more.
                    </p>
                  </div>
                  <div>
                    <div className="body-text" style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: 500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Care Query</div>
                    <p className="body-text" style={{ fontSize: '0.9rem', color: '#374151', fontWeight: 400, lineHeight: 1.6 }}>
                      The Preparation Card is generated automatically when any gate is marked not yet met. The clinician gets a structured summary of what is outstanding. The patient receives a URL with their preparation phase view — showing what their clinician is working through, what they can do now, and when to expect to hear more from the practice. The patient is part of the plan from the first consultation. This is the majority outcome — and it is a first-class one.
                    </p>
                  </div>
                </>
              ),
            },
            {
              icon: <GitBranch size={20} color="#2563eb" />,
              title: 'No Feedback Loop → Pilot Evaluation: Closed-Loop Outcome Logging',
              tagClass: 'tag-blue',
              tagLabel: 'Pilot Evaluation',
              borderColor: '#2563eb',
              summary: 'Structured outcome reporting feeds referral results back to the service steward — designed as a pilot evaluation mechanism to test whether governed records stay accurate when the people using them can signal what is happening.',
              detail: (
                <>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div className="body-text" style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>The gap</div>
                    <p className="body-text" style={{ fontSize: '0.9rem', color: '#4b5563', fontWeight: 400, lineHeight: 1.6 }}>
                      When a referral is accepted or returned, nobody outside the referring practice knows. The service that set the criteria has no signal about whether those criteria are working, whether they are too strict, or whether common rejections point to a documentation gap. The governed record drifts because there is no mechanism to tell the custodian what is actually happening.
                    </p>
                  </div>
                  <div>
                    <div className="body-text" style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: 500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Care Query</div>
                    <p className="body-text" style={{ fontSize: '0.9rem', color: '#374151', fontWeight: 400, lineHeight: 1.6 }}>
                      When the clinician completes the Gate Card, a Report Outcome button appears alongside the clipboard summary. One click generates a pre-formatted email to the service custodian with structured accept/reject options — no free text, no patient data, no backend required. Over time, this passive feedback loop tells the custodian which criteria are causing returns and whether the record needs updating. The governed data stays accurate because the people using it are telling the people maintaining it what is happening.
                    </p>
                  </div>
                </>
              ),
            },
          ].map((card, idx) => (
            <ExpandableCard key={idx} card={card} defaultOpen={false} />
          ))}

          <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: '#f3f4f6', borderRadius: '8px', borderLeft: '4px solid #2563eb' }}>
            <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#374151', fontWeight: 500 }}>
              <strong>What this means for pilot evaluation:</strong> Success is measured by reduction in returned submissions, Preparation Card generation rate (clinicians using the Not Yet path rather than submitting incomplete referrals), Journey Card delivery rate via Plausible Analytics, and qualitative clinician feedback on consultation impact. Per-gate attestation states are logged and correlated with submission outcomes — enabling the pilot to distinguish between information-driven rejections (where the Service Card changes behaviour) and capacity-driven rejections (where the data generated is commissioning intelligence, not a tool failure). Each gap above is directly measurable during the 12-week pilot.
            </p>
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: '1100px', margin: '0 auto' }} />

      {/* How It Works — Technical Architecture */}
      <section id="how-it-works" style={{ padding: '6rem 1.5rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Layers size={20} color="#2563eb" />
              <span className="tag tag-blue" style={{ marginBottom: '0' }}>Technical Architecture</span>
            </div>
            <h2 className="heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', lineHeight: 1.2, color: '#111827', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
              Simple by design.<br />No black box, no AI, no guesswork.
            </h2>
            <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '0.75rem' }}>
              NHS referral pathways are operationally complex but rarely documented in a structured, machine-readable way. <span className="brand">Care Query</span> encodes that information into a single governed record per service — making it available at the point of referral in a consistent, auditable format.
            </p>
            <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '0.75rem' }}>
              <strong>For practice staff:</strong> Runs in a browser tab — no installation, no login, no IT request. Open it, use it, close it. <strong>For IT and IG teams:</strong> No patient data is collected, stored, or processed. Static JSON on a CDN, rendered client-side. Patient-facing links open in an isolated view with no path to clinician content. Nothing to risk-assess beyond a read-only webpage.
            </p>
            <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
              <strong>For commissioners:</strong> Every output is auditable back to its governed source — no AI, no inference, no guesswork. Reduced A&G rejections translate directly to fewer unfunded re-submissions. <strong>For service managers:</strong> An accurate Service Card means fewer inappropriate referrals and fewer admin calls — a description of your service that you control and update.
            </p>
          </div>

          <div className="three-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
            {[
              {
                step: '01',
                title: 'Governed Data Source',
                body: 'A single service-records.json file is the source of truth. Each service record contains identity, referral gates, operational signals, and governance metadata. Records are DRAFT until a steward manually verifies and publishes.',
                pills: ['Structured data schema', 'Steward-verified publishing'],
              },
              {
                step: '02',
                title: 'Deterministic Render Engine',
                body: 'The administrative tool reads the governed record and generates five output types. Every field is validated before display — no unchecked data reaches the screen. Zero external dependencies.',
                pills: ['Input validation', 'Record verification', 'Zero dependencies'],
              },
              {
                step: '03',
                title: 'Immutable Safety Layer',
                body: 'Six universal red flags are hard-coded outside the data layer and load before any other logic. They cannot be overridden or edited by any service record — a permanent safety layer that sits above all content.',
                pills: ['Loads before all content', 'Cannot be overridden', 'Clinical safety boundary'],
              },
            ].map((item, i) => (
              <div key={i} className="card" style={{ padding: '1.75rem' }}>
                <div className="step-number">{item.step}</div>
                <h3 className="heading" style={{ fontSize: '1.15rem', color: '#111827', margin: '0.5rem 0 0.75rem', letterSpacing: '-0.01em' }}>{item.title}</h3>
                <p className="body-text" style={{ fontSize: '0.85rem', lineHeight: 1.65, color: '#4b5563', fontWeight: 400, marginBottom: '1rem' }}>{item.body}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                  {item.pills.map(p => <span key={p} className="tech-pill">{p}</span>)}
                </div>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: '1.75rem', background: '#111827', border: 'none' }}>
            <div className="body-text" style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#93c5fd', marginBottom: '1rem' }}>
              Infrastructure
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['Netlify CDN', 'GitHub Actions CI', 'JSON parse validation on push', 'carequery.app (tool)', 'carequery.uk (project)', 'Plausible Analytics (privacy-first)', 'DCB0129 clinical risk framework', 'MHRA: not a medical device', 'NICE ESF Tier A', 'DTAC: in progress', 'QOF exception code precedent', 'WCAG 2.1 AA', 'No cookies · No patient data'].map(p => (
                <span key={p} style={{ fontFamily: "'Inter', monospace", fontSize: '0.78rem', fontWeight: 500, padding: '0.3rem 0.75rem', background: 'rgba(255,255,255,0.08)', color: '#dbeafe', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)' }}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: '1100px', margin: '0 auto' }} />

      {/* Governance */}
      <section style={{ padding: '6rem 1.5rem', background: '#f9fafb' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <Shield size={20} color="#2563eb" />
                <span className="tag tag-blue" style={{ marginBottom: '0' }}>Regulatory Position</span>
              </div>
              <h2 className="heading" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', lineHeight: 1.2, color: '#111827', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
                Your judgment.<br />Our structure.
              </h2>
              <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '0' }}>
                Clinical judgment comes from you — built over years of training and practice. <span className="brand">Care Query</span> does not provide diagnosis, triage, or any recommendation on clinical management. It surfaces referral requirements that already exist — criteria, catchment, investigations — and makes them visible at the point the referral is prepared. You confirm what applies. The administrative tool records it. The clinical decision remains entirely yours.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: <Shield size={18} color="#2563eb" />, label: 'DCB0129 — Clinical Safety', status: 'Active', desc: 'Clinical Safety Officer formally assigned. Clinical risk management documentation in place and maintained throughout development.' },
                { icon: <Shield size={18} color="#2563eb" />, label: 'MHRA — Medical Devices', status: 'Confirmed', desc: 'Confirmed not a medical device. Deterministic display of static, clinician-verified information. No AI, no patient data input, no clinical recommendation output. No MHRA registration required.' },
                { icon: <FileText size={18} color="#2563eb" />, label: 'DTAC — Digital Technology Assessment Criteria', status: 'In progress', desc: 'Acknowledged as applicable. DCB0129 (a core DTAC component) is active. Full DTAC submission planned prior to any NHS deployment beyond the PoC pilot.' },
                { icon: <GitBranch size={18} color="#2563eb" />, label: 'NHS Innovation Service', status: 'In progress', desc: 'Registration in progress (March 2026). Tier A classification, DCB0129 status, and pilot evidence pathway documented as part of the submission. Target: complete before pilot opens.' },
                { icon: <FileText size={18} color="#2563eb" />, label: 'NICE Evidence Standards Framework — Tier A', status: 'Confirmed', desc: 'Classified as Tier A system service — administrative information display only. Does not generate clinical recommendations or make clinical judgments. Standard 14 (RCT evidence) does not apply. Standard 15 requires pilot site statement only.' },
                { icon: <Database size={18} color="#2563eb" />, label: 'QOF "Service Unavailable" Governance Precedent', status: 'Confirmed', desc: 'NHS England already permits GP practices to use SNOMED exception codes to protect QOF compliance metrics when a commissioned service does not exist locally. The "Cannot Meet" attestation extends this established governance principle to pre-referral A&G workflows — structured exception logic applied to a context where no equivalent currently exists.' },
                { icon: <ArrowRight size={18} color="#2563eb" />, label: 'NHS Clinical Entrepreneur Programme', status: 'Planned', desc: 'Contract re-tendered for 2026–2031, new delivery from 1 April 2026. FCPs are eligible. Application planned pending re-tender outcome.' },
                { icon: <ExternalLink size={18} color="#2563eb" />, label: 'Health Innovation North West Coast', status: 'Planned', desc: 'HIN NW Coast covers the C&M ICB footprint and supports PoC-stage clinical tools. Engagement planned as part of the pilot phase.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                      <div className="body-text" style={{ fontWeight: 600, fontSize: '0.85rem', color: '#111827' }}>{item.label}</div>
                      <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', padding: '0.15rem 0.5rem', borderRadius: '9999px', background: item.status === 'Active' || item.status === 'Confirmed' ? '#dcfce7' : '#f3f4f6', color: item.status === 'Active' || item.status === 'Confirmed' ? '#166534' : '#6b7280' }}>{item.status}</span>
                    </div>
                    <div className="body-text" style={{ fontSize: '0.82rem', color: '#4b5563', lineHeight: 1.5, fontWeight: 400 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: '1100px', margin: '0 auto' }} />

      {/* Join the Pilot */}
      <section id="join-the-pilot" style={{ padding: '6rem 1.5rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', marginBottom: '3rem' }}>
            <div style={{ width: '68px', height: '68px', borderRadius: '16px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.25rem' }}>
              <Handshake size={30} color="#2563eb" />
            </div>
            <div style={{ flex: 1 }}>
              <span className="tag tag-blue" style={{ marginBottom: '1rem', display: 'inline-block' }}>12-Week Pilot</span>
              <h2 className="heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', lineHeight: 1.2, color: '#111827', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
                Join the Cheshire &amp; Merseyside PoC pilot.
              </h2>
              <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
                The most valuable thing this project can encode is the operational knowledge experienced clinicians carry but rarely write down. The difference between a practice with near-zero rejections and one with weekly returns is not clinical skill — it is informational access. <span className="brand">Care Query</span> gives that knowledge a structured, governed home.
              </p>
              <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginTop: '0.75rem' }}>
                If you recognise this problem in your own referral pathways — or in the systems you commission or evaluate — a short conversation is enough to start.
              </p>
            </div>
          </div>

          <div className="three-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginBottom: '1.5rem', alignItems: 'start' }}>
            {[
              {
                title: 'Pilot Practices',
                desc: '5–10 GP practices in Cheshire and Merseyside to use Care Query for MSK referrals during the 12-week pilot period. In a high-volume referral environment, every administratively complete first-attempt submission reduces practice workload and shortens the patient pathway. The Service Card answers the question before you refer. The Gate Card confirms prerequisites before you submit.',
                tag: 'GP Practice Managers · PCN Clinical Directors · FCP leads',
              },
              {
                title: 'Clinical Contributors',
                desc: 'You know what actually causes referrals to fail — the operational nuance that no published pathway document captures. That knowledge is what a Service Card is built to encode. A Service Card verified by you means fewer inappropriate referrals reaching your service and fewer calls from practices asking basic questions.',
                tag: 'GPs · FCPs · Physios · Service admins · Clinical leads',
              },
              {
                title: 'Service Owners and MSK Leads',
                desc: 'An accurate Service Card means fewer inappropriate referrals reaching your service, fewer admin queries from practices, and a service description you control — not one buried in an out-of-date document. You get a direct channel to update it, and a named steward role that ensures it stays current.',
                tag: 'Service managers · Clinical leads · MSK service administrators',
              },
            ].map((item, i) => (
              <div key={i} className="card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <h3 className="heading" style={{ fontSize: '1.2rem', color: '#111827', marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>{item.title}</h3>
                <p className="body-text" style={{ fontSize: '0.88rem', lineHeight: 1.65, color: '#4b5563', fontWeight: 400, marginBottom: '1rem', flex: 1 }}>{item.desc}</p>
                <span className="body-text" style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#2563eb' }}>{item.tag}</span>
              </div>
            ))}
          </div>

          <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '1.5rem' }}>
            Each service added to <span className="brand">Care Query</span> benefits every clinician who uses it. Services maintain their own records because doing so reduces their own burden — fewer inappropriate referrals, fewer admin calls, fewer A&G returns. A network effect built on operational accuracy rather than user growth.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }} className="two-col">
            <div className="card" style={{ padding: '1.75rem' }}>
              <h4 className="heading" style={{ fontSize: '0.95rem', color: '#111827', marginBottom: '1rem' }}>What the pilot involves</h4>
              {[
                'Use Care Query for MSK A&G submissions and referrals during the 12-week pilot window',
                'Allow measurement of whether administrative return rates change',
                'Complete a short 5-question post-pilot feedback form',
                'No IT integration, no installation, no patient data collection required',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', padding: '0.4rem 0', borderBottom: i < 3 ? '1px solid #f3f4f6' : 'none' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.1rem' }}>
                    <Check size={11} color="#2563eb" />
                  </div>
                  <span className="body-text" style={{ fontSize: '0.88rem', color: '#374151', fontWeight: 400, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>

            <div className="card" style={{ padding: '1.75rem', borderLeft: '4px solid #2563eb' }}>
              <h4 className="heading" style={{ fontSize: '0.95rem', color: '#111827', marginBottom: '0.4rem' }}>Register your interest</h4>
              <p className="body-text" style={{ fontSize: '0.82rem', color: '#4b5563', fontWeight: 400, marginBottom: '0.85rem', lineHeight: 1.5 }}>
                Leave your email and we will be in touch when the pilot opens.
              </p>
              {submitted ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={16} color="#22c55e" />
                  <p className="body-text" style={{ color: '#2563eb', fontWeight: 500, fontSize: '0.85rem' }}>Received — we will be in touch.</p>
                </div>
              ) : (
                <form
                  name="stay-informed"
                  method="POST"
                  action="/"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={handleEmailSubmit}
                  style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}
                >
                  <input type="hidden" name="form-name" value="stay-informed" />
                  <input type="hidden" name="bot-field" value="" />
                  <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com" required className="input-field" style={{ flex: 1, minWidth: '160px', padding: '0.55rem 0.75rem', fontSize: '0.85rem' }} />
                  <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.82rem', opacity: isSubmitting ? 0.8 : 1 }}>
                    {isSubmitting ? 'Submitting...' : 'Register interest'}
                  </button>
                  {submitError && (
                    <p className="body-text" style={{ width: '100%', color: '#b91c1c', fontWeight: 500, fontSize: '0.82rem', lineHeight: 1.5 }}>
                      {submitError}
                    </p>
                  )}
                </form>
              )}
              <p className="body-text" style={{ fontSize: '0.82rem', color: '#6b7280', fontWeight: 400, marginTop: '1rem', lineHeight: 1.5 }}>
                Or contact us directly:{' '}
                <a href="mailto:hello@carequery.uk" style={{ color: '#2563eb', fontWeight: 500, textDecoration: 'none' }}>hello@carequery.uk</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: '1100px', margin: '0 auto' }} />

      {/* FAQ */}
      <section style={{ padding: '6rem 1.5rem', background: '#f9fafb' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <span className="tag tag-blue" style={{ marginBottom: '1rem', display: 'inline-block' }}>Common Questions</span>
            <h2 className="heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', lineHeight: 1.2, color: '#111827', letterSpacing: '-0.01em' }}>
              Questions evaluators and commissioners ask.
            </h2>
          </div>

          {[
            {
              title: 'Does this require EMIS or SystmOne integration?',
              detail: (
                <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
                  No. <span className="brand">Care Query</span> runs in a browser tab alongside any clinical system. No API, no installation, no IG approval process. Static JSON served from a CDN, rendered entirely client-side. Nothing is installed on practice infrastructure. For IT and IG leads: there is nothing to risk-assess beyond a read-only webpage — no patient data is collected, processed, or transmitted at any point.
                </p>
              ),
            },
            {
              title: 'Does this require MHRA registration as a medical device?',
              detail: (
                <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
                  No. <span className="brand">Care Query</span> is an administrative tool. It does not process patient data, make clinical recommendations, or determine appropriateness for any individual. It displays governed administrative information — the same kind of information that currently lives in PDFs and commissioning documents. NICE ESF classification: Tier A system service DHT. Standard 14 (effectiveness evidence/RCT) does not apply. This classification is documented in the DCB0129 hazard log and will be confirmed before pilot launch.
                </p>
              ),
            },
            {
              title: 'How is the data governed and kept accurate?',
              detail: (
                <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
                  Each service has a named steward — a specific person in the receiving service responsible for verifying the record on a defined review cycle. Records are versioned in GitHub and published only after steward verification. If a record is overdue for review, an amber warning is shown to users — the information remains accessible but is flagged as potentially stale. Stale-but-visible is always preferable to hidden. Accountability and accuracy are the same thing: the steward's identity is part of the record.
                </p>
              ),
            },
            {
              title: 'What evidence standard applies to this tool?',
              detail: (
                <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
                  NICE Evidence Standards Framework Tier A — Standard 15. Pilot evaluation requires a site statement covering: integration into workflow, acceptability to users, no harm identified, and system-level benefit. No minimum sample size is specified. No comparative effectiveness data (Standard 14) is required. Section D early deployment registration via NHS Innovation Service removes even Standard 15 obligations. The PoC pilot is designed to generate this evidence.
                </p>
              ),
            },
            {
              title: 'Why does no existing NHS tool already do this?',
              detail: (
                <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
                  NHS England built the monitoring infrastructure (Model Health System), the referral pipe (e-RS), and the waiting list analytics (Federated Data Platform). Nobody built the pre-referral service information layer and per-patient administrative checklist for the clinician at the point of referral. e-RS templates are specialty-level, not service-level. The Directory of Services answers where — not what the service needs. Neither has an attestation mechanism. Neither generates a patient-facing output. Strategic research confirmed in March 2026 that no ICB, trust, or commercial product fills this gap.
                </p>
              ),
            },
            {
              title: 'What are the pilot success metrics?',
              detail: (
                <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
                  Five measurable outcomes: (1) Standard 15 pilot site statement — integration confirmed, acceptable to users, no harm, system benefit evidenced; (2) Journey/Preparation Card delivery rate via Plausible Analytics; (3) qualitative GP feedback on consultation impact; (4) <code>cannot_meet</code> declaration rate by service — a novel NHS dataset on structural barrier prevalence; (5) qualitative patient feedback on card usefulness. Acceptance rate comparison is Phase 2 evidence, not a PoC requirement.
                </p>
              ),
            },
          ].map((card, idx) => (
            <ExpandableCard key={idx} card={{ ...card, summary: '', icon: null, tagClass: 'tag-slate', tagLabel: 'FAQ', borderColor: '#d1d5db', defaultOpen: false }} defaultOpen={false} />
          ))}
        </div>
      </section>

      <div className="divider" style={{ maxWidth: '1100px', margin: '0 auto' }} />

      {/* Contact */}
      <section id="contact" style={{ padding: '6rem 1.5rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
            <div>
              <span className="tag tag-blue" style={{ marginBottom: '1rem', display: 'inline-block' }}>Contact</span>
              <h2 className="heading" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', lineHeight: 1.2, color: '#111827', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
                Get in touch
              </h2>
              <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '2rem' }}>
                Whether you are a clinician with a question about a specific pathway, a practice manager interested in the pilot, or an ICB colleague exploring the approach — email is the best place to start.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={18} color="#2563eb" />
                  </div>
                  <div>
                    <div className="body-text" style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '0.2rem' }}>Clinical, Pilot &amp; Partnership Enquiries</div>
                    <a href="mailto:hello@carequery.uk" className="body-text" style={{ color: '#2563eb', fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none' }}>
                      hello@carequery.uk
                    </a>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={18} color="#2563eb" />
                  </div>
                  <div>
                    <div className="body-text" style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '0.2rem' }}>Governance &amp; Company — Intelligent Technology Solutions Ltd</div>
                    <a href="mailto:info@intelltechsolutions.co.uk" className="body-text" style={{ color: '#2563eb', fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none' }}>
                      info@intelltechsolutions.co.uk
                    </a>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={18} color="#2563eb" />
                  </div>
                  <div>
                    <div className="body-text" style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '0.2rem' }}>Registered Address</div>
                    <div className="body-text" style={{ fontSize: '0.88rem', color: '#4b5563', lineHeight: 1.6, fontWeight: 400 }}>
                      Intelligent Technology Solutions Limited<br />
                      Bartle House, 9 Oxford Court<br />
                      Manchester, M2 3WQ<br />
                      Companies House No. 16455045
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ExternalLink size={18} color="#2563eb" />
                  </div>
                  <div>
                    <div className="body-text" style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '0.2rem' }}>The Tool</div>
                    <a href="https://carequery.app" target="_blank" rel="noreferrer" className="body-text" style={{ color: '#2563eb', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
                      carequery.app
                    </a>
                    <span className="body-text" style={{ fontSize: '0.82rem', color: '#374151', marginLeft: '0.5rem', fontWeight: 500 }}>— the PoC (not yet public)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card" style={{ padding: '1.75rem', alignSelf: 'start' }}>
              <div className="body-text" style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '1.25rem' }}>
                About this project
              </div>
              <p className="body-text" style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '1rem' }}>
                <span className="brand">Care Query</span> is developed by a practising NHS physiotherapist and First Contact Practitioner through Intelligent Technology Solutions Limited — a clinician-led social enterprise operating entirely independently of any NHS employer.
              </p>
              <p className="body-text" style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '1rem' }}>
                All development is conducted in personal time, on personal infrastructure, using publicly available service information only. No NHS patient data is collected, stored, or processed at any stage. DCB0129 clinical safety standard is active, with Clinical Safety Officer formally assigned.
              </p>
              <p className="body-text" style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '1rem' }}>
                <span className="brand">Care Query</span> is an independent innovation developed in line with NHS digital standards. It is not endorsed by, affiliated with, or developed on behalf of any NHS organisation.
              </p>
              <p className="body-text" style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
                The project exists to explore whether clearer visibility of referral requirements can reduce returned submissions and ensure patients leave every consultation with a clear next step — whether their referral is ready today or not.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#111827', borderTop: '1px solid #1f2937', color: '#9ca3af', padding: '2.5rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="heading" style={{ fontSize: '1.1rem', color: '#fff', marginRight: '0.75rem' }}>Care Query</span>
            <span className="body-text" style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Proof of Concept — Cheshire and Merseyside ICB — 2026</span>
          </div>
          <div className="body-text" style={{ fontSize: '0.78rem', color: '#9ca3af' }}>
            © 2026 Intelligent Technology Solutions Limited · No cookies · No patient data
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CareQueryWebsite;
