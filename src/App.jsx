import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Mail, MapPin, FileText, CheckSquare, Users, GitBranch, Shield, ExternalLink, Check, Compass, Handshake, Database, Target, Layers } from 'lucide-react';

const ExpandableCard = ({ card, defaultOpen }) => {
  const [open, setOpen] = React.useState(defaultOpen);
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
          <p className="body-text" style={{ fontSize: '0.85rem', color: '#4b5563', fontWeight: 400, lineHeight: 1.5, paddingLeft: '1.75rem' }}>
            {card.summary}
          </p>
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
  const [scopeOpen, setScopeOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'what-it-does', 'how-it-works', 'get-involved', 'contact'];
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
    if (email) {
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'stay-informed', email }).toString(),
      })
        .then(() => { setSubmitted(true); setEmail(''); })
        .catch(() => { setSubmitted(true); setEmail(''); });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'what-it-does', label: 'What It Does' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'get-involved', label: 'Get Involved' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#ffffff', minHeight: '100vh', color: '#111827' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #ffffff; font-family: 'Inter', sans-serif; }
        .heading { font-family: 'Inter', sans-serif; font-weight: 700; }
        .body-text { font-family: 'Inter', sans-serif; font-weight: 400; }
        .nav-link { font-family: 'Inter', sans-serif; font-size: 0.875rem; font-weight: 500; cursor: pointer; border: none; background: none; transition: color 0.2s; letter-spacing: 0.01em; }
        .nav-link:hover { color: #2563eb; }
        .nav-link.active { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 2px; }
        .card { background: #fff; border-radius: 8px; border: 1px solid #e5e7eb; }
        .tag { display: inline-block; font-family: 'Inter', sans-serif; font-size: 0.7rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; padding: 0.25rem 0.6rem; border-radius: 9999px; }
        .tag-blue { background: #dbeafe; color: #1e40af; }
        .tag-amber { background: #fef9c3; color: #854d0e; }
        .tag-slate { background: #f3f4f6; color: #374151; }
        .tag-green { background: #dcfce7; color: #166534; }
        .tag-burgundy { background: #fce7ef; color: #7f1d1d; }
        .tag-poc { background: #dbeafe; color: #1e40af; border: 1px solid #93c5fd; }
        .btn-primary { font-family: 'Inter', sans-serif; font-weight: 500; font-size: 0.9rem; padding: 0.75rem 1.75rem; background: #2563eb; color: #fff; border: none; border-radius: 8px; cursor: pointer; transition: background 0.2s; letter-spacing: 0.01em; }
        .btn-primary:hover { background: #1d4ed8; }
        .btn-outline { font-family: 'Inter', sans-serif; font-weight: 500; font-size: 0.9rem; padding: 0.75rem 1.75rem; background: transparent; color: #2563eb; border: 2px solid #2563eb; border-radius: 8px; cursor: pointer; transition: all 0.2s; letter-spacing: 0.01em; }
        .btn-outline:hover { background: #eff6ff; }
        .divider { height: 1px; background: linear-gradient(to right, transparent, #e5e7eb, transparent); margin: 0 auto; }
        .tech-pill { font-family: 'Inter', monospace; font-size: 0.78rem; font-weight: 500; padding: 0.3rem 0.75rem; background: #111827; color: #dbeafe; border-radius: 6px; display: inline-block; margin: 0.2rem; }
        .step-number { font-family: 'Inter', sans-serif; font-weight: 700; font-size: 3rem; color: #dbeafe; line-height: 1; }
        .input-field { font-family: 'Inter', sans-serif; width: 100%; padding: 0.75rem 1rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 0.9rem; outline: none; background: #fff; transition: border-color 0.2s, box-shadow 0.2s; }
        .input-field:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }
        .brand { color: #2563eb; font-weight: 700; }
        .desktop-nav { display: flex; gap: 2rem; }
        .mobile-menu-btn { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .three-col { grid-template-columns: 1fr !important; }
          .two-col { grid-template-columns: 1fr !important; }
          .service-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Navigation */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', zIndex: 50, borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <img src="/Logo-Care-Query-1.svg" alt="Care Query" style={{ width: '2rem', height: '2rem', borderRadius: '4px' }} />
              <span style={{ fontSize: '1.4rem', fontWeight: 700, color: '#005EB8', letterSpacing: '-0.01em' }}>Care Query</span>
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
          <div style={{ maxWidth: '680px' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="tag tag-poc" style={{ marginRight: '0.5rem' }}>Proof of Concept — 2026</span>
              <span className="tag tag-blue">Cheshire & Merseyside ICB</span>
            </div>
            <h1 className="heading" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', lineHeight: 1.15, color: '#111827', marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
              NHS MSK Referrals.<br />
              <em style={{ color: '#2563eb' }}>Done right, first time.</em>
            </h1>
            <p className="body-text" style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#4b5563', marginBottom: '1.25rem', fontWeight: 400 }}>
              Stop A&G bounce-backs, protect practice time, and demonstrate ICB pathway compliance.
            </p>
            <div style={{ borderLeft: '3px solid #374151', paddingLeft: '1rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#111827', fontWeight: 400 }}>
                The most common reason a well-judged referral fails is not clinical — it is informational. Criteria that changed. An investigation not yet done. A catchment boundary that shifted. From 1 April 2026, mandatory A&G applies to secondary care planned referrals — but intermediate services like CATS and OCATS still accept direct referrals. Knowing which pathway a service sits on, and proving you followed it correctly, is what a returned submission reveals you got wrong.
              </p>
              <p className="body-text" style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
                <span className="brand">Care Query</span> surfaces those requirements before the referral is sent — turning local service rules into a governed data record that generates three operational tools: a <strong style={{ color: '#9b2335' }}>Gate Card</strong> (pre-referral checklist), a <strong style={{ color: '#ca8a04' }}>Service Card</strong> (structured service reference), and a <strong style={{ color: '#16a34a' }}>Journey Card</strong> (time-aware patient summary sent via SMS). All three come from a single governed record. When information changes, every output reflects the update.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={() => scrollToSection('what-it-does')}>
                See how it works <ArrowRight size={16} style={{ display: 'inline', marginLeft: '0.3rem', verticalAlign: 'middle' }} />
              </button>
              <button className="btn-outline" onClick={() => scrollToSection('get-involved')}>
                Get involved
              </button>
            </div>
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
                <span className="tag tag-blue" style={{ marginBottom: '0' }}>Three Clinical Outputs</span>
              </div>
              <h2 className="heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', lineHeight: 1.2, color: '#111827', letterSpacing: '-0.01em' }}>
                One governed record.<br />Three practical outputs.
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
                Referral pathways are rarely clinically complex — but they are operationally complex. The eligibility criteria, catchment rules, required investigations, and administrative expectations vary between services, change over time, and are rarely documented in one place. <span className="brand">Care Query</span> focuses on making those operational requirements visible at the point of referral.
              </p>
              <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
                The <strong style={{ color: '#9b2335' }}>Gate Card</strong> is the pre-referral checklist. The <strong style={{ color: '#ca8a04' }}>Service Card</strong> is the structured service reference. The <strong style={{ color: '#16a34a' }}>Journey Card</strong> is the time-aware patient summary sent after referral. All three are generated from a single governed record per service.
              </p>
            </div>
          </div>

          {/* Expandable output cards — Gate Card first */}
          {[
            {
              icon: <CheckSquare size={20} color="#9b2335" />,
              title: 'Gate Card — Pre-Referral Checklist',
              tagClass: 'tag-burgundy',
              tagLabel: 'Primary output — GPs · Physician Associates · Paramedics · ACPs · FCPs',
              borderColor: '#9b2335',
              summary: 'Confirms eligibility criteria, catchment, investigations, and pathway prerequisites before the referral is submitted — whether via mandatory A&G or direct referral. Prevents the most common rejection reasons: missing data, wrong criteria, wrong service. Not another task — protection from the most preventable failure in the referral process.',
              detail: (
                <>
                  <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '1.25rem' }}>
                    Any clinician who initiates an MSK referral — GP, Physician Associate, Paramedic, ACP, or FCP — can use the Gate Card. It confirms eligibility criteria, catchment, required investigations, and conservative management prerequisites before submission. Gates are tri-state: confirmed, not applicable, or flagged. Completion generates a clipboard-ready administrative summary. The clinician decides. The software records.
                  </p>
                  <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '1.25rem' }}>
                    For secondary care referrals where A&G is mandatory, the most common return reasons are preventable: missing imaging, wrong catchment, insufficient clinical information, incomplete conservative management. For direct referrals to intermediate services, the failure mode is the same — wrong criteria, wrong catchment, incomplete information — just without the A&G layer. The Gate Card makes these requirements visible before anything leaves the practice, not three weeks after it bounces back.
                  </p>
                  {/* Illustrative example — WHH Rheumatology (WHHRHEUM) */}
                  <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                    <div className="body-text" style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '0.75rem' }}>
                      Illustrative example — WHH Rheumatology (WHHRHEUM) · A&G mandatory
                    </div>
                    <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '6px', padding: '0.75rem', marginBottom: '0.85rem' }}>
                      <div className="body-text" style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#be123c', marginBottom: '0.5rem' }}>
                        Stop and act — do not proceed with A&G referral
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
                        When all prerequisites are confirmed — a clipboard summary is generated for the A&G submission.
                      </span>
                    </div>
                  </div>
                  <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '1.25rem' }}>
                    When all gates are confirmed, two things happen. First, a clipboard summary is generated for the A&G submission or direct referral. Second, a shareable Journey Card URL is produced — ready to send to the patient via Accurx SMS. That URL carries the referral date and a confidence signal confirming that the clinician verified all prerequisites. A one-click outcome report button also appears, allowing the clinician to notify the service custodian of whether the referral was accepted or returned — closing the feedback loop without any backend.
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {['Hard gates', 'Soft gates', 'Red flag check', 'Clipboard summary', 'Journey URL generation', 'Outcome feedback loop'].map(t => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                  </div>
                </>
              ),
            },
            {
              icon: <FileText size={20} color="#ca8a04" />,
              title: 'Service Card — Structured Service Reference',
              tagClass: 'tag-amber',
              tagLabel: 'Clinicians · Patients · Commissioners',
              borderColor: '#ca8a04',
              summary: 'A structured view of an NHS MSK service — referral criteria, catchment, operational contacts, and typical waiting times — generated from the Underlying Service Record and maintained by a named steward. The operational wiki that makes the Gate Card reliable.',
              detail: (
                <>
                  <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '1rem' }}>
                    The Service Card is generated from the same Underlying Service Record that powers the Gate Card. Every field belongs to one of two layers: <strong>Layer 1</strong> — verified public truth from published documents and direct written confirmation; or <strong>Layer 2</strong> — tacit operational intelligence sourced from experienced clinical referrers through structured conversations.
                  </p>
                  <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '1.25rem' }}>
                    Layer 2 is the specific hypothesis this PoC is testing. Published pathway documents systematically omit what experienced referrers know: the non-standard criteria individual triage leads apply when triaging; the imaging views a specific department expects to see before accepting; the precise interpretation of "adequate conservative management" that only becomes clear after a rejection; and the undocumented prerequisites that live in the heads of senior clinicians but never appear in a referral guide. One of the PoC's goals is to demonstrate whether this knowledge can be captured, attributed to a named source, and made accessible at the point of referral — without losing the operational specificity that makes it useful.
                  </p>
                  <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '1.25rem' }}>
                    Every Service Card has a named steward — a specific person in the service responsible for verifying its contents on a defined review cycle. Status must be manually set to PUBLISHED by that steward before the record becomes visible. An amber warning banner appears automatically when a record is approaching or past its review date. Honest about its own reliability — always.
                  </p>

                  {/* Demo service card */}
                  <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', marginBottom: '1.25rem', overflow: 'hidden' }}>
                    <div style={{ background: '#fef3c7', borderBottom: '1px solid #fcd34d', padding: '0.4rem 1rem' }}>
                      <span className="body-text" style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#92400e' }}>
                        Illustrative example — not yet verified or published
                      </span>
                    </div>
                    <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <div className="heading" style={{ fontSize: '1rem', color: '#111827', marginBottom: '0.2rem' }}>
                          Warrington & Halton Hospitals — Rheumatology
                        </div>
                        <div className="body-text" style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 400 }}>
                          Code: WHHRHEUM · Steward: [STEWARD: verify] · Last reviewed: [STEWARD: verify]
                        </div>
                      </div>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.25rem 0.6rem', borderRadius: '9999px', background: '#fef3c7', color: '#92400e', border: '1px solid #fcd34d' }}>
                        DRAFT
                      </span>
                    </div>
                    <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #e5e7eb' }}>
                      <div className="body-text" style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '0.6rem' }}>
                        Referral criteria
                      </div>
                      {[
                        'Inflammatory arthritis suspected — swollen joints, morning stiffness exceeding 30 minutes, or symmetrical joint involvement',
                        'Connective tissue disease suspected — systemic symptoms, unexplained rash, Raynaud\'s phenomenon, or sicca symptoms',
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
                        { label: 'Referral route', value: 'GP referral to WHH Rheumatology; or via MSKCATS after physiotherapy triage — [STEWARD: verify current pathway]' },
                      ].map((item, i) => (
                        <div key={i} style={{ padding: '0.85rem 1.25rem', borderRight: i < 2 ? '1px solid #e5e7eb' : 'none' }}>
                          <div className="body-text" style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '0.3rem' }}>{item.label}</div>
                          <div className="body-text" style={{ fontSize: '0.8rem', color: item.value.includes('STEWARD') ? '#ca8a04' : '#111827', fontWeight: 400, lineHeight: 1.4 }}>{item.value}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #e5e7eb' }}>
                      <div className="body-text" style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '0.6rem' }}>
                        Referrer intelligence — Layer 2
                      </div>
                      <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '6px', padding: '0.75rem' }}>
                        <div className="body-text" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#92400e', marginBottom: '0.3rem' }}>
                          Most common A&G return reason
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
                    <div style={{ padding: '0.65rem 1.25rem', background: '#fffbeb', borderLeft: '3px solid #f59e0b', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#f59e0b', flexShrink: 0 }} />
                      <span className="body-text" style={{ fontSize: '0.78rem', color: '#92400e', fontWeight: 400 }}>
                        Review overdue — this record has not been verified by a steward within the required period. Information may not reflect current service provision.
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {['Underlying Service Record', 'Layer 1 + Layer 2', 'Steward-governed', 'Stale warning system'].map(t => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                  </div>
                </>
              ),
            },
            {
              icon: <Users size={20} color="#16a34a" />,
              title: 'Journey Card — Patient Referral Summary',
              tagClass: 'tag-green',
              tagLabel: 'Primary audience: Patients — sent by the referring clinician',
              borderColor: '#16a34a',
              summary: 'Sent to the patient after referral via SMS. Time-aware — the message changes based on how many weeks the patient has been waiting: reassurance early, guidance later, action prompt if overdue. No login, no data collection — the date lives in the URL itself.',
              detail: (
                <>
                  <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '1rem' }}>
                    The Journey Card is not a static leaflet — it is a time-aware patient companion. The URL sent via Accurx SMS carries the referral date. When the patient opens it, the card calculates how many weeks have passed and renders a phase-appropriate message. No login, no data collection, no backend — the date lives in the URL itself.
                  </p>
                  <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '1.25rem' }}>
                    When a clinician completes the Gate Card, the URL also carries a <strong>confidence signal</strong> — telling the patient that their GP confirmed all administrative prerequisites before submitting. This transfers the clinician's diligence into patient reassurance, reducing the anxiety that drives early callbacks.
                  </p>

                  {/* Phase illustration */}
                  <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                    <div className="body-text" style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '0.75rem' }}>
                      Time-aware phases — WHH Rheumatology (14-week wait estimate)
                    </div>

                    {/* Confidence handoff banner */}
                    <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderLeft: '4px solid #16a34a', borderRadius: '6px', padding: '0.65rem 0.85rem', marginBottom: '0.85rem' }}>
                      <span className="body-text" style={{ fontSize: '0.78rem', color: '#166534', fontWeight: 500 }}>
                        Before submitting your referral, your clinician confirmed that it meets all known administrative prerequisites for this service.
                      </span>
                    </div>

                    {/* Phase banners */}
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
                        No red — overdue uses blue (action), not alarm. Colour discipline: red is reserved for emergencies only.
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {['Time-aware phases', 'Confidence handoff', 'SMS-safe URLs', 'No data collection', 'Callback suppression'].map(t => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                  </div>
                </>
              ),
            },
          ].map((card, idx) => (
            <ExpandableCard key={idx} card={card} defaultOpen={idx === 0} />
          ))}

          {/* Architecture note — below all three cards */}
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f3f4f6', borderRadius: '8px', borderLeft: '4px solid #2563eb' }}>
            <p className="body-text" style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#374151', fontWeight: 400 }}>
              Each service is described in a single <strong style={{ color: '#374151' }}>Underlying Service Record</strong> — a governed JSON file maintained by a named steward. From it, three outputs are generated. The <strong style={{ color: '#9b2335' }}>Gate Card</strong> is the primary interaction for any clinician at the point of referral. The <strong style={{ color: '#ca8a04' }}>Service Card</strong> is the structured reference view. The <strong style={{ color: '#16a34a' }}>Journey Card</strong> goes to the patient after referral. Together they form a closed loop: the clinician confirms prerequisites, the patient receives time-aware reassurance, and the outcome report feeds back to the service custodian — all from the same governed record, with no backend required.
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
                { label: 'Access', value: 'Browser-based, no installation — Gate Cards deep-link into EMIS and SystmOne templates via AccuRx' },
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
                  No national tool currently does what the Gate Card does. NHS England built the monitoring infrastructure, the referral pipe, and the waiting list analytics. Nobody built the structured pre-submission checklist for the clinician at the point of referral. Strategic research confirmed in March 2026 that no ICB, trust, or commercial product fills this gap.
                </p>
                <p className="body-text" style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#111827', fontWeight: 400 }}>
                  If the pilot demonstrates value, the model can be extended to additional services and other regions.
                </p>
                <p className="body-text" style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#111827', fontWeight: 400 }}>
                  <strong>Why Cheshire and Merseyside first:</strong> C&M ICB is under NHS England performance management, the Health Innovation North West Coast infrastructure is directly accessible, and the A&G mandate creates immediate, measurable pressure on every practice in the footprint.
                </p>
              </div>
            )}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: '1100px', margin: '0 auto' }} />

      {/* Solves MSK Referral Failures */}
      <section id="solves-failures" style={{ padding: '6rem 1.5rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Target size={20} color="#2563eb" />
              <span className="tag tag-blue" style={{ marginBottom: '0' }}>Clinical Evidence</span>
            </div>
            <h2 className="heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', lineHeight: 1.2, color: '#111827', marginBottom: '1.5rem', letterSpacing: '-0.01em' }}>
              <span className="brand">Care Query</span> solves documented MSK referral failures.
            </h2>
            <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
              The most common referral rejections and practice frustrations trace back to four failure points in the MSK pathway. Each one is addressable — and each one maps to a specific <span className="brand">Care Query</span> output.
            </p>
          </div>

          {[
            {
              icon: <Shield size={20} color="#9b2335" />,
              title: 'Hidden Criteria & Incomplete Workups → Enforced Before Submission',
              tagClass: 'tag-burgundy',
              tagLabel: 'Gate Card',
              borderColor: '#9b2335',
              summary: 'Triage criteria and investigation requirements made visible and enforced as checkboxes — before the referral leaves the practice.',
              detail: (
                <>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div className="body-text" style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>The Problem</div>
                    <p className="body-text" style={{ fontSize: '0.9rem', color: '#4b5563', fontWeight: 400, lineHeight: 1.6 }}>
                      Orthopaedic departments have strict criteria — mechanical symptoms, rehabilitation duration, BMI limits, specific imaging views. Rheumatology requires bloods, symptom duration, clinical reasoning. Clinicians do not see these requirements until the referral is rejected weeks later. Referrals also fail silently when mandatory data is missing entirely: no documented locking, no imaging, no conservative management history. The rejection arrives three weeks later with "insufficient information" — unfunded work for the practice and a delayed pathway for the patient.
                    </p>
                  </div>
                  <div>
                    <div className="body-text" style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: 500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Care Query Solution</div>
                    <p className="body-text" style={{ fontSize: '0.9rem', color: '#374151', fontWeight: 400, lineHeight: 1.6 }}>
                      The Gate Card makes every triage criterion and investigation requirement an explicit checkbox — "confirmed," "not applicable," or "flagged" — before submission. Gates cannot be skipped. The clipboard summary lists all confirmed prerequisites as evidence of a complete workup. If criteria are not met, the summary is not generated. The problem is caught in the consultation, not three weeks after it.
                    </p>
                  </div>
                </>
              ),
            },
            {
              icon: <FileText size={20} color="#ca8a04" />,
              title: 'Opaque Service Directories → Structured, Steward-Governed Detail',
              tagClass: 'tag-amber',
              tagLabel: 'Service Card',
              borderColor: '#ca8a04',
              summary: 'Clinician-verified service detail replaces vague directory entries — what a service accepts, what it does not, and who to contact.',
              detail: (
                <>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div className="body-text" style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>The Problem</div>
                    <p className="body-text" style={{ fontSize: '0.9rem', color: '#4b5563', fontWeight: 400, lineHeight: 1.6 }}>
                      NHS e-RS lists "Orthopaedic Knee Specialist" without granular detail. It does not specify that a particular site performs ACL reconstruction at Hospital A but not at Hospital B. Referral accepted — bounced weeks later for "this site does not perform that procedure."
                    </p>
                  </div>
                  <div>
                    <div className="body-text" style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: 500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Care Query Solution</div>
                    <p className="body-text" style={{ fontSize: '0.9rem', color: '#374151', fontWeight: 400, lineHeight: 1.6 }}>
                      The Service Card provides clinician-verified detail: what each service accepts, what it explicitly does not, site-specific capabilities, current wait times, and referral routes. Every field is maintained by a named steward on a defined review cycle. Operational truth replaces vague directory entries.
                    </p>
                  </div>
                </>
              ),
            },
            {
              icon: <Users size={20} color="#16a34a" />,
              title: 'Patient Anxiety & Callback Burden → Time-Aware Reassurance',
              tagClass: 'tag-green',
              tagLabel: 'Journey Card',
              borderColor: '#16a34a',
              summary: 'Phase-appropriate messages that evolve over time — reassurance early, guidance later, a clear action prompt if the wait becomes overdue.',
              detail: (
                <>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div className="body-text" style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>The Problem</div>
                    <p className="body-text" style={{ fontSize: '0.9rem', color: '#4b5563', fontWeight: 400, lineHeight: 1.6 }}>
                      Patients expect a 2-week scan or 3-month specialist review because no one told them the real timeline. When weeks pass with no contact, they call reception — appropriately. Every call consumes practice and hospital admin time. The anxiety is rational; the information gap is the failure.
                    </p>
                  </div>
                  <div>
                    <div className="body-text" style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: 500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Care Query Solution</div>
                    <p className="body-text" style={{ fontSize: '0.9rem', color: '#374151', fontWeight: 400, lineHeight: 1.6 }}>
                      The Journey Card is time-aware. The URL carries the referral date — when the patient reopens it, the card calculates elapsed weeks and renders a phase-appropriate message: reassurance in the early period, guidance as the appointment window approaches, and a clear action prompt if the wait exceeds the typical timeline. A confidence signal confirms the clinician verified all prerequisites before submitting. No login, no data collection — the date lives in the URL itself.
                    </p>
                  </div>
                </>
              ),
            },
            {
              icon: <GitBranch size={20} color="#2563eb" />,
              title: 'No Feedback Loop → Closed-Loop Outcome Reporting',
              tagClass: 'tag-blue',
              tagLabel: 'Closed Loop',
              borderColor: '#2563eb',
              summary: 'One-click outcome reports feed referral results back to the service custodian — no backend, no free text, no patient data.',
              detail: (
                <>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div className="body-text" style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>The Problem</div>
                    <p className="body-text" style={{ fontSize: '0.9rem', color: '#4b5563', fontWeight: 400, lineHeight: 1.6 }}>
                      When a referral is accepted or returned, nobody outside the referring practice knows. The service that set the criteria has no signal about whether those criteria are working, whether they are too strict, or whether common rejections point to a documentation gap. The data record drifts because there is no mechanism to tell the custodian what is actually happening.
                    </p>
                  </div>
                  <div>
                    <div className="body-text" style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: 500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Care Query Solution</div>
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
              <strong>What this means for pilot evaluation:</strong> Success is measured by reduction in returned submissions, reduction in patient callbacks for status updates, and outcome report submission rate. Each failure point above is directly measurable during the 4–8 week pilot.
            </p>
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: '1100px', margin: '0 auto' }} />

      {/* How It Works */}
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
              <strong>For practice staff:</strong> Runs in a browser tab — no installation, no login, no IT request. Open it, use it, close it. <strong>For IT and IG teams:</strong> No patient data is collected, stored, or processed. Static JSON on a CDN, rendered client-side. Nothing to risk-assess beyond a read-only webpage.
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
                body: 'The app reads the governed record and generates three card types. Every field is validated before display — no unchecked data reaches the screen. Zero external dependencies.',
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
              {['Netlify CDN', 'GitHub Actions CI', 'JSON parse validation on push', 'carequery.app (tool)', 'carequery.uk (project)', 'Plausible Analytics (privacy-first)', 'DCB0129 clinical risk framework', 'WCAG 2.1 AA', 'No cookies · No patient data'].map(p => (
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
                Clinical judgment comes from you — built over years of training and practice. <span className="brand">Care Query</span> does not provide diagnosis, triage, or clinical decision support. It surfaces referral requirements that already exist — criteria, catchment, investigations — and makes them visible at the point the referral is prepared. You confirm what applies. The software records it. The clinical decision remains entirely yours.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: <Shield size={18} color="#2563eb" />, label: 'DCB0129 — Clinical Safety', status: 'Active', desc: 'Clinical Safety Officer formally assigned. Clinical risk management documentation in place and maintained throughout development.' },
                { icon: <GitBranch size={18} color="#2563eb" />, label: 'NHS Innovation Service', status: 'Planned', desc: 'Free registration at PoC stage — no evidence required. Planned to create a documented national engagement record before the pilot opens.' },
                { icon: <FileText size={18} color="#2563eb" />, label: 'NICE Evidence Standards Framework', status: 'Planned', desc: 'PoC evaluation will be designed to generate evidence meeting NICE standards for digital health technologies.' },
                { icon: <ArrowRight size={18} color="#2563eb" />, label: 'NHS Clinical Entrepreneur Programme', status: 'Planned', desc: 'Contract re-tendered for 2026–2031, new delivery from 1 April 2026. FCPs are eligible. Application planned pending re-tender outcome.' },
                { icon: <ExternalLink size={18} color="#2563eb" />, label: 'Health Innovation North West Coast', status: 'Planned', desc: 'HIN NW Coast covers the C&M ICB footprint and supports PoC-stage clinical tools. Engagement planned as part of the pilot phase.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                      <div className="body-text" style={{ fontWeight: 600, fontSize: '0.85rem', color: '#111827' }}>{item.label}</div>
                      <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', padding: '0.15rem 0.5rem', borderRadius: '9999px', background: item.status === 'Active' ? '#dcfce7' : '#f3f4f6', color: item.status === 'Active' ? '#166534' : '#6b7280' }}>{item.status}</span>
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

      {/* Get Involved */}
      <section id="get-involved" style={{ padding: '6rem 1.5rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', marginBottom: '3rem' }}>
            <div style={{ width: '68px', height: '68px', borderRadius: '16px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.25rem' }}>
              <Handshake size={30} color="#2563eb" />
            </div>
            <div style={{ flex: 1 }}>
              <span className="tag tag-blue" style={{ marginBottom: '1rem', display: 'inline-block' }}>Collaboration</span>
              <h2 className="heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', lineHeight: 1.2, color: '#111827', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
                The knowledge is yours.<br /><span className="brand">Care Query</span> is just the structure.
              </h2>
              <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
                The most valuable thing this project can encode is the operational knowledge experienced clinicians carry but rarely write down. The difference between a practice with near-zero rejections and one with weekly returns is not clinical skill — it is informational access. <span className="brand">Care Query</span> gives that knowledge a structured home.
              </p>
              <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginTop: '0.75rem' }}>
                If you recognise this problem in your own referral pathways, a short conversation is enough to start. No commitment required.
              </p>
            </div>
          </div>

          <div className="three-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginBottom: '1.5rem', alignItems: 'start' }}>
            {[
              {
                title: 'Clinical Contributors',
                desc: 'You know what actually causes referrals to fail — the operational nuance that no published pathway document captures. That knowledge is what a Service Card is built to capture. A Service Card verified by you means fewer inappropriate referrals reaching your service and fewer calls from practices asking basic questions.',
                tag: 'GPs · Physician Associates · Paramedics · ACPs · FCPs · Physios · Service admins',
              },
              {
                title: 'Pilot Practices',
                desc: 'We are looking for 5–10 GP practices in Cheshire and Merseyside to pilot the Gate Card in real referral workflows. From April 2026, mandatory A&G and direct referral routes co-exist — navigating both accurately is the problem the Gate Card solves. Success is measured by reduction in returned submissions across both pathways.',
                tag: 'GP Practice Managers · PCN Clinical Directors · FCP leads',
              },
              {
                title: 'Service Owners and Clinical Leads',
                desc: 'An accurate Service Card means fewer inappropriate referrals reaching your service, fewer admin queries from practices, and a description you control — not one buried in an out-of-date document. You get a direct channel to update it, and a named steward role that ensures it stays current.',
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

          <div className="card" style={{ padding: '1.75rem', marginBottom: '3rem', borderLeft: '4px solid #2563eb' }}>
            <h4 className="heading" style={{ fontSize: '0.95rem', color: '#111827', marginBottom: '0.4rem' }}>Stay informed</h4>
            <p className="body-text" style={{ fontSize: '0.82rem', color: '#4b5563', fontWeight: 400, marginBottom: '0.85rem', lineHeight: 1.5 }}>
              Leave your email and we will contact you when the pilot opens for practices, or when a new service is published.
            </p>
            {submitted ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Check size={16} color="#22c55e" />
                <p className="body-text" style={{ color: '#2563eb', fontWeight: 500, fontSize: '0.85rem' }}>Received — we will be in touch.</p>
              </div>
            ) : (
              <form name="stay-informed" data-netlify="true" onSubmit={handleEmailSubmit} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <input type="hidden" name="form-name" value="stay-informed" />
                <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com" required className="input-field" style={{ flex: 1, minWidth: '160px', padding: '0.55rem 0.75rem', fontSize: '0.85rem' }} />
                <button type="submit" className="btn-primary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.82rem' }}>Register interest</button>
              </form>
            )}
          </div>

        </div>
      </section>

      <div className="divider" style={{ maxWidth: '1100px', margin: '0 auto' }} />

      {/* Contact */}
      <section id="contact" style={{ padding: '6rem 1.5rem', background: '#f9fafb' }}>
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
                    <div className="body-text" style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '0.2rem' }}>Collaboration</div>
                    <a href="mailto:my@carequery.uk" className="body-text" style={{ color: '#2563eb', fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none' }}>
                      my@carequery.uk
                    </a>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={18} color="#2563eb" />
                  </div>
                  <div>
                    <div className="body-text" style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '0.2rem' }}>Business — Intelligent Technology Solutions Ltd</div>
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
                <span className="brand">Care Query</span> is developed by a practising NHS physiotherapist and First Contact Practitioner through
                Intelligent Technology Solutions Limited — a sole-director private limited company operating entirely
                independently of any NHS employer.
              </p>
              <p className="body-text" style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '1rem' }}>
                All development is conducted in personal time, on personal infrastructure, using publicly available
                service information only. No NHS patient data is collected, stored, or processed at any stage.
              </p>
              <p className="body-text" style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '1rem' }}>
                <span className="brand">Care Query</span> is an independent innovation developed in line with NHS digital standards.
                It is not endorsed by, affiliated with, or developed on behalf of any NHS organisation.
              </p>
              <p className="body-text" style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
                The project exists to explore whether clearer visibility of referral requirements can reduce rejected referrals, administrative friction, and delays in patient pathways. Development is iterative and transparent, with the intention of inviting scrutiny, collaboration, and improvement from clinicians and digital health stakeholders.
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
