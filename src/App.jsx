import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Mail, MapPin, FileText, CheckSquare, Users, GitBranch, Shield, ExternalLink } from 'lucide-react';

const CareQueryWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

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
      setSubmitted(true);
      setEmail('');
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
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: '#f8f7f4', minHeight: '100vh', color: '#1a1a2e' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f8f7f4; }
        .serif { font-family: 'DM Serif Display', Georgia, serif; }
        .sans { font-family: 'DM Sans', system-ui, sans-serif; }
        .nav-link { font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 500; cursor: pointer; border: none; background: none; transition: color 0.2s; letter-spacing: 0.01em; }
        .nav-link:hover { color: #006272; }
        .nav-link.active { color: #006272; border-bottom: 2px solid #006272; padding-bottom: 2px; }
        .card { background: #fff; border-radius: 2px; border: 1px solid #e8e4dd; }
        .output-card { border-left: 4px solid #006272; padding: 1.5rem 1.75rem; background: #fff; border-radius: 0 2px 2px 0; border-top: 1px solid #e8e4dd; border-right: 1px solid #e8e4dd; border-bottom: 1px solid #e8e4dd; }
        .output-card.amber { border-left-color: #b45309; }
        .output-card.slate { border-left-color: #334155; }
        .tag { display: inline-block; font-family: 'DM Sans', sans-serif; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 0.25rem 0.6rem; border-radius: 2px; }
        .tag-teal { background: #e0f2f1; color: #006272; }
        .tag-amber { background: #fef3c7; color: #92400e; }
        .tag-slate { background: #f1f5f9; color: #334155; }
        .tag-poc { background: #fef9ec; color: #92400e; border: 1px solid #fcd34d; }
        .btn-primary { font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 0.9rem; padding: 0.75rem 1.75rem; background: #006272; color: #fff; border: none; border-radius: 2px; cursor: pointer; transition: background 0.2s; letter-spacing: 0.01em; }
        .btn-primary:hover { background: #004f5d; }
        .btn-outline { font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 0.9rem; padding: 0.75rem 1.75rem; background: transparent; color: #006272; border: 2px solid #006272; border-radius: 2px; cursor: pointer; transition: all 0.2s; letter-spacing: 0.01em; }
        .btn-outline:hover { background: #006272; color: #fff; }
        .divider { height: 1px; background: linear-gradient(to right, transparent, #d1ccc4, transparent); margin: 0 auto; }
        .tech-pill { font-family: 'DM Sans', monospace; font-size: 0.78rem; font-weight: 500; padding: 0.3rem 0.75rem; background: #1a1a2e; color: #a8edea; border-radius: 2px; display: inline-block; margin: 0.2rem; }
        .step-number { font-family: 'DM Serif Display', serif; font-size: 3rem; color: #e8e4dd; line-height: 1; }
        .input-field { font-family: 'DM Sans', sans-serif; width: 100%; padding: 0.75rem 1rem; border: 1px solid #d1ccc4; border-radius: 2px; font-size: 0.9rem; outline: none; background: #fff; }
        .input-field:focus { border-color: #006272; box-shadow: 0 0 0 3px rgba(0,98,114,0.1); }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .three-col { grid-template-columns: 1fr !important; }
          .two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Navigation */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', background: 'rgba(248,247,244,0.97)', backdropFilter: 'blur(8px)', zIndex: 50, borderBottom: '1px solid #e8e4dd' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span className="serif" style={{ fontSize: '1.4rem', fontWeight: 400, color: '#1a1a2e', letterSpacing: '-0.01em' }}>Care Query</span>
              <span className="tag tag-poc">PoC</span>
            </div>
            <div className="hidden md:flex" style={{ display: 'flex', gap: '2rem' }}>
              {navItems.map(item => (
                <button key={item.id} onClick={() => scrollToSection(item.id)}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  style={{ color: activeSection === item.id ? '#006272' : '#4a4a5e' }}>
                  {item.label}
                </button>
              ))}
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1a1a2e', display: 'none' }}
              className="mobile-menu-btn">
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div style={{ background: '#f8f7f4', borderTop: '1px solid #e8e4dd', padding: '0.75rem 1.5rem' }}>
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollToSection(item.id)}
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.6rem 0', color: '#1a1a2e', background: 'none', border: 'none', fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', cursor: 'pointer' }}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="home" style={{ paddingTop: '64px', minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(160deg, #f8f7f4 60%, #e8f4f6 100%)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 1.5rem 4rem' }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <span className="tag tag-poc" style={{ marginRight: '0.5rem' }}>Proof of Concept — 2026</span>
                <span className="tag tag-teal">Cheshire & Merseyside ICB</span>
              </div>
              <h1 className="serif" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', lineHeight: 1.15, color: '#1a1a2e', marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
                NHS MSK Referrals.<br />
                <em style={{ color: '#006272' }}>Done right, first time.</em>
              </h1>
              <p className="sans" style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#4a4a5e', marginBottom: '2rem', fontWeight: 300 }}>
                Care Query is a structured pre-referral tool for GPs and First Contact Practitioners. 
                It encodes accurate, versioned, locally-specific information about NHS MSK services — 
                so the right referral goes to the right service, with the right information, on the first attempt.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button className="btn-primary" onClick={() => scrollToSection('what-it-does')}>
                  See how it works <ArrowRight size={16} style={{ display: 'inline', marginLeft: '0.3rem', verticalAlign: 'middle' }} />
                </button>
                <button className="btn-outline" onClick={() => scrollToSection('get-involved')}>
                  Get involved
                </button>
              </div>
            </div>
            <div>
              <div className="card" style={{ padding: '1.75rem', background: '#fff' }}>
                <div className="sans" style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9a9aaa', marginBottom: '1rem' }}>
                  The referral problem — in numbers
                </div>
                {[
                  { stat: '2026', label: 'GP contract: Advice & Guidance mandatory and unpaid', accent: '#006272' },
                  { stat: '1 JSON', label: 'Single governed data source powering all three outputs', accent: '#006272' },
                  { stat: '5 services', label: 'MSK services encoded in the current PoC', accent: '#b45309' },
                  { stat: '88', label: 'Steward verification tasks remaining before first publish', accent: '#334155' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', padding: '0.75rem 0', borderBottom: i < 3 ? '1px solid #f0ece6' : 'none' }}>
                    <span className="serif" style={{ fontSize: '1.6rem', color: item.accent, minWidth: '4rem', lineHeight: 1 }}>{item.stat}</span>
                    <span className="sans" style={{ fontSize: '0.85rem', color: '#4a4a5e', lineHeight: 1.4, fontWeight: 300 }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: '1100px' }} />

      {/* What It Does */}
      <section id="what-it-does" style={{ padding: '6rem 1.5rem', background: '#f8f7f4' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ maxWidth: '600px', marginBottom: '3.5rem' }}>
            <span className="tag tag-teal" style={{ marginBottom: '1rem', display: 'inline-block' }}>The Three Outputs</span>
            <h2 className="serif" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', lineHeight: 1.2, color: '#1a1a2e', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
              One governed data source.<br />Three practical formats.
            </h2>
            <p className="sans" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4a4a5e', fontWeight: 300 }}>
              All three outputs are generated from a single versioned JSON record per service.
              Update the source once — all outputs reflect the change.
            </p>
          </div>

          {/* Expandable output cards */}
          {[
            {
              icon: <CheckSquare size={20} color="#006272" />,
              title: 'Gate Card — Pre-Referral Checklist',
              tagClass: 'tag-teal',
              tagLabel: 'Primary audience: practice staff',
              borderColor: '#006272',
              summary: 'Confirms all administrative prerequisites before an A&G submission is made. The clinician checks each gate — the software records.',
              detail: (
                <>
                  <p className="sans" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4a4a5e', fontWeight: 300, marginBottom: '1.25rem' }}>
                    Gates are tri-state: confirmed, not applicable, or flagged. Completion generates a
                    clipboard-ready administrative summary using SaMD-neutral language — the clinician
                    decides, the software records.
                  </p>
                  {/* Live example from WINFCP */}
                  <div style={{ background: '#f8f7f4', border: '1px solid #e8e4dd', borderRadius: '2px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                    <div className="sans" style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9a9aaa', marginBottom: '0.75rem' }}>
                      Example — WIN PCN FCP Service (WINFCP)
                    </div>
                    {[
                      'Patient is aged 18 or over',
                      'Patient is registered with a WIN PCN GP practice',
                      'Patient has an MSK condition as the primary presenting problem',
                      'Presentation is appropriate for FCP scope: soft tissue, spinal pain, arthritis, nerve symptoms, or post-surgical MSK review',
                      'Patient does NOT have a primary diagnosis of persistent chronic pain (&gt;3 months) — if so, consider WIN PCN Pain Service instead',
                    ].map((gate, i) => (
                      <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', padding: '0.4rem 0', borderBottom: i < 4 ? '1px solid #f0ece6' : 'none' }}>
                        <div style={{ width: '16px', height: '16px', border: '2px solid #006272', borderRadius: '2px', flexShrink: 0, marginTop: '0.15rem' }} />
                        <span className="sans" style={{ fontSize: '0.82rem', color: '#4a4a5e', fontWeight: 300, lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: gate }} />
                      </div>
                    ))}
                    <div style={{ marginTop: '0.75rem', padding: '0.6rem 0.75rem', background: '#e0f2f1', borderRadius: '2px' }}>
                      <span className="sans" style={{ fontSize: '0.78rem', color: '#006272', fontWeight: 500 }}>
                        When all prerequisites are confirmed — a clipboard summary is generated for the A&G submission.
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {['Hard gates', 'Soft gates', 'Red flag check', 'Clipboard summary'].map(t => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                  </div>
                </>
              ),
            },
            {
              icon: <FileText size={20} color="#b45309" />,
              title: 'Service Card — Structured Service Record',
              tagClass: 'tag-amber',
              tagLabel: 'Primary audience: practice staff / Patients / Commissioner',
              borderColor: '#b45309',
              summary: 'Versioned, timestamped record of an NHS MSK service. Criteria, catchment, contacts, and wait times — kept current by a named steward.',
              detail: (
                <>
                  <p className="sans" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4a4a5e', fontWeight: 300, marginBottom: '1.25rem' }}>
                    Each record carries a review date and steward identity. Status must be manually set
                    to PUBLISHED by a verified steward before the record becomes visible in the tool.
                    An amber warning banner appears automatically if a record is approaching or past its
                    review date — stale-but-visible is better than hidden.
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {['Versioned JSON', 'Review metadata', 'Steward-governed', 'Stale warning system'].map(t => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                  </div>
                </>
              ),
            },
            {
              icon: <Users size={20} color="#334155" />,
              title: 'Journey Card — Patient Information Summary',
              tagClass: 'tag-slate',
              tagLabel: 'Primary audience: Patient',
              borderColor: '#334155',
              summary: 'Sent to the patient after referral via Accurx SMS. Plain-language explanation of the service, what to expect, and what to do while waiting.',
              detail: (
                <>
                  <p className="sans" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4a4a5e', fontWeight: 300, marginBottom: '1.25rem' }}>
                    No patient data is collected or stored. The card opens a static page at carequery.app —
                    no login, no account, no tracking. The acknowledge statement sets the tone from the first line.
                  </p>
                  {/* Live example from WINFCP journey.acknowledge */}
                  <div style={{ background: '#f8f7f4', border: '1px solid #e8e4dd', borderRadius: '2px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                    <div className="sans" style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9a9aaa', marginBottom: '0.6rem' }}>
                      Example — WIN PCN FCP Service, opening statement
                    </div>
                    <p className="sans" style={{ fontSize: '0.88rem', lineHeight: 1.65, color: '#334155', fontStyle: 'italic', fontWeight: 300 }}>
                      "We know that waiting to be seen for a joint or muscle problem can be frustrating,
                      especially when you are in pain. Here is what is happening with your referral."
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {['Patient-facing', 'Accurx-compatible', 'No data collection', 'Self-management guidance'].map(t => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                  </div>
                </>
              ),
            },
          ].map((card, idx) => {
            const [open, setOpen] = React.useState(false);
            return (
              <div key={idx} style={{ borderLeft: `4px solid ${card.borderColor}`, background: '#fff', borderTop: '1px solid #e8e4dd', borderRight: '1px solid #e8e4dd', borderBottom: '1px solid #e8e4dd', borderRadius: '0 2px 2px 0', marginBottom: '1rem' }}>
                <button
                  onClick={() => setOpen(!open)}
                  style={{ width: '100%', background: 'none', border: 'none', padding: '1.25rem 1.75rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', textAlign: 'left' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                      {card.icon}
                      <span className="serif" style={{ fontSize: '1.1rem', color: '#1a1a2e' }}>{card.title}</span>
                      <span className={`tag ${card.tagClass}`}>{card.tagLabel}</span>
                    </div>
                    <p className="sans" style={{ fontSize: '0.85rem', color: '#4a4a5e', fontWeight: 300, lineHeight: 1.5, paddingLeft: '1.75rem' }}>
                      {card.summary}
                    </p>
                  </div>
                  <span style={{ color: '#006272', fontSize: '1.2rem', fontWeight: 300, flexShrink: 0, marginTop: '0.1rem' }}>
                    {open ? '−' : '+'}
                  </span>
                </button>
                {open && (
                  <div style={{ padding: '0 1.75rem 1.5rem', borderTop: '1px solid #f0ece6' }}>
                    <div style={{ paddingTop: '1.25rem' }}>
                      {card.detail}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <div className="divider" style={{ maxWidth: '1100px', margin: '0 auto' }} />

      {/* How It Works */}
      <section id="how-it-works" style={{ padding: '6rem 1.5rem', background: '#fff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ maxWidth: '600px', marginBottom: '3.5rem' }}>
            <span className="tag tag-teal" style={{ marginBottom: '1rem', display: 'inline-block' }}>Technical Architecture</span>
            <h2 className="serif" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', lineHeight: 1.2, color: '#1a1a2e', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
              Deterministic by design.<br />No AI in the critical path.
            </h2>
            <p className="sans" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4a4a5e', fontWeight: 300 }}>
              The PoC is a dependency-free SPA — vanilla HTML, CSS, and JavaScript. 
              No framework. No build step. No server. Routing and rendering are purely deterministic, 
              governed entirely by the JSON data source. This is intentional: clinical routing decisions 
              must be auditable, not probabilistic.
            </p>
          </div>

          <div className="three-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
            {[
              {
                step: '01',
                title: 'Governed Data Source',
                body: 'A single service-records.json file is the source of truth. Each service record contains identity, referral gates, operational signals, and governance metadata. Records are DRAFT until a steward manually verifies and publishes.',
                pills: ['JSON', 'Kebab-case contract', 'DRAFT / PUBLISHED states'],
              },
              {
                step: '02',
                title: 'Deterministic Render Engine',
                body: 'app.js reads the JSON and renders three card types. Every JSON-sourced string passes through escapeHtml(). isValidRecord() guards every render path. No string reaches the DOM without validation.',
                pills: ['XSS prevention', 'Shape guards', 'Zero dependencies'],
              },
              {
                step: '03',
                title: 'Immutable Safety Layer',
                body: 'emergency.js loads synchronously before any app logic. It contains six Universal Red Flags (URF-01–06) hard-coded outside the data layer — they cannot be overridden by JSON content under any circumstance.',
                pills: ['Sync load order', 'Never editable', 'SaMD boundary'],
              },
            ].map((item, i) => (
              <div key={i} className="card" style={{ padding: '1.75rem' }}>
                <div className="step-number">{item.step}</div>
                <h3 className="serif" style={{ fontSize: '1.15rem', color: '#1a1a2e', margin: '0.5rem 0 0.75rem', letterSpacing: '-0.01em' }}>{item.title}</h3>
                <p className="sans" style={{ fontSize: '0.85rem', lineHeight: 1.65, color: '#4a4a5e', fontWeight: 300, marginBottom: '1rem' }}>{item.body}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                  {item.pills.map(p => <span key={p} className="tech-pill">{p}</span>)}
                </div>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: '1.75rem', background: '#1a1a2e', border: 'none' }}>
            <div className="sans" style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a8edea', marginBottom: '1rem' }}>
              Infrastructure
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['Netlify CDN', 'GitHub Actions CI', 'JSON parse validation on push', 'carequery.app (tool)', 'carequery.uk (project)', 'Plausible Analytics (privacy-first)', 'DCB0129 clinical risk framework', 'WCAG 2.1 AA', 'No cookies · No patient data'].map(p => (
                <span key={p} style={{ fontFamily: "'DM Sans', monospace", fontSize: '0.78rem', fontWeight: 500, padding: '0.3rem 0.75rem', background: 'rgba(168,237,234,0.12)', color: '#a8edea', borderRadius: '2px', border: '1px solid rgba(168,237,234,0.2)' }}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: '1100px', margin: '0 auto' }} />

      {/* Governance */}
      <section style={{ padding: '5rem 1.5rem', background: '#f8f7f4' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
            <div>
              <span className="tag tag-teal" style={{ marginBottom: '1rem', display: 'inline-block' }}>Regulatory Position</span>
              <h2 className="serif" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', lineHeight: 1.2, color: '#1a1a2e', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
                Administrative tool.<br />Not a clinical decision support system.
              </h2>
              <p className="sans" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4a4a5e', fontWeight: 300 }}>
                Care Query does not diagnose, recommend treatment, or determine clinical appropriateness. 
                All language is governed to avoid MHRA SaMD classification. The clinician decides. 
                The software records. This distinction is enforced at code level, not just in documentation.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: <Shield size={18} color="#006272" />, label: 'DCB0129', desc: 'Clinical Safety Officer formally assigned. Clinical risk management documentation maintained.' },
                { icon: <GitBranch size={18} color="#006272" />, label: 'NHS Innovation Service', desc: 'Registration creates documented national engagement record with NHS England.' },
                { icon: <FileText size={18} color="#006272" />, label: 'NICE Evidence Standards Framework', desc: 'PoC evaluation designed to generate evidence meeting NICE requirements for digital health technologies.' },
                { icon: <ArrowRight size={18} color="#006272" />, label: 'NHS Clinical Entrepreneur Programme', desc: 'Application submitted for Cohort 11 (expected autumn 2026).' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#fff', border: '1px solid #e8e4dd', borderRadius: '2px' }}>
                  <div style={{ marginTop: '0.1rem', flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div className="sans" style={{ fontWeight: 600, fontSize: '0.85rem', color: '#1a1a2e', marginBottom: '0.2rem' }}>{item.label}</div>
                    <div className="sans" style={{ fontSize: '0.82rem', color: '#4a4a5e', lineHeight: 1.5, fontWeight: 300 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: '1100px', margin: '0 auto' }} />

      {/* Get Involved */}
      <section id="get-involved" style={{ padding: '6rem 1.5rem', background: '#fff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ maxWidth: '640px', marginBottom: '3rem' }}>
            <span className="tag tag-teal" style={{ marginBottom: '1rem', display: 'inline-block' }}>Collaboration</span>
            <h2 className="serif" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', lineHeight: 1.2, color: '#1a1a2e', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
              The knowledge is yours.<br />Care Query is just the structure.
            </h2>
            <p className="sans" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4a4a5e', fontWeight: 300 }}>
              The most valuable thing this project can encode is the operational knowledge that experienced MSK 
              clinicians carry but rarely write down — the nuance behind the criteria, the things that make 
              a referral land well. That knowledge belongs to the people doing the work, not to any single developer.
            </p>
            <p className="sans" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4a4a5e', fontWeight: 300, marginTop: '0.75rem' }}>
              If you work in MSK pathways in Cheshire and Merseyside — as an FCP, GP, physio, or service administrator — 
              and you recognise this problem, a conversation is enough to start. No commitment required.
            </p>
          </div>

          <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
            {[
              {
                title: 'Clinical Contributors',
                desc: 'You know what actually causes referral rejection in your service. We want to encode that knowledge accurately. In return, your service information stays current and you get a direct channel to update it.',
                tag: 'FCPs · GPs · Physios · Service admins',
              },
              {
                title: 'Pilot Practices',
                desc: 'We are looking for 5–10 GP practices in Cheshire and Merseyside to use the tool in a real referral workflow. The goal is simple: measure whether it reduces A&G rejection rate.',
                tag: 'GP Practice Managers · PCN Clinical Directors',
              },
            ].map((item, i) => (
              <div key={i} className="card" style={{ padding: '1.75rem' }}>
                <h3 className="serif" style={{ fontSize: '1.2rem', color: '#1a1a2e', marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>{item.title}</h3>
                <p className="sans" style={{ fontSize: '0.88rem', lineHeight: 1.65, color: '#4a4a5e', fontWeight: 300, marginBottom: '1rem' }}>{item.desc}</p>
                <span className="sans" style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#006272' }}>{item.tag}</span>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: '1.75rem', maxWidth: '560px' }}>
            <h3 className="serif" style={{ fontSize: '1.1rem', color: '#1a1a2e', marginBottom: '0.5rem' }}>Stay informed</h3>
            <p className="sans" style={{ fontSize: '0.85rem', color: '#4a4a5e', fontWeight: 300, marginBottom: '1.25rem' }}>
              Leave your email and we will contact you when the pilot opens for practices, or when a new service is published.
            </p>
            {submitted ? (
              <p className="sans" style={{ color: '#006272', fontWeight: 500, fontSize: '0.9rem' }}>Received — we will be in touch.</p>
            ) : (
              <form onSubmit={handleEmailSubmit} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com" required className="input-field" style={{ flex: 1, minWidth: '220px' }} />
                <button type="submit" className="btn-primary">Register interest</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: '1100px', margin: '0 auto' }} />

      {/* Contact */}
      <section id="contact" style={{ padding: '6rem 1.5rem', background: '#f8f7f4' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
            <div>
              <span className="tag tag-teal" style={{ marginBottom: '1rem', display: 'inline-block' }}>Contact</span>
              <h2 className="serif" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', lineHeight: 1.2, color: '#1a1a2e', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
                Get in touch
              </h2>
              <p className="sans" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4a4a5e', fontWeight: 300, marginBottom: '2rem' }}>
                Whether you are a clinician with a question about a specific service, a practice manager interested 
                in the pilot, or an ICB digital lead exploring the architecture — email is the right place to start.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <Mail size={18} color="#006272" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                  <div>
                    <div className="sans" style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9a9aaa', marginBottom: '0.2rem' }}>Email</div>
                    <a href="mailto:info@intelltechsolutions.co.uk" className="sans" style={{ color: '#006272', fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none' }}>
                      info@intelltechsolutions.co.uk
                    </a>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <MapPin size={18} color="#006272" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                  <div>
                    <div className="sans" style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9a9aaa', marginBottom: '0.2rem' }}>Registered Address</div>
                    <div className="sans" style={{ fontSize: '0.88rem', color: '#4a4a5e', lineHeight: 1.6, fontWeight: 300 }}>
                      Intelligent Technology Solutions Limited<br />
                      Bartle House, 9 Oxford Court<br />
                      Manchester, M2 3WQ<br />
                      Companies House No. 16455045
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <ExternalLink size={18} color="#006272" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                  <div>
                    <div className="sans" style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9a9aaa', marginBottom: '0.2rem' }}>The Tool</div>
                    <a href="https://carequery.app" target="_blank" rel="noreferrer" className="sans" style={{ color: '#006272', fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none' }}>
                      carequery.app
                    </a>
                    <span className="sans" style={{ fontSize: '0.82rem', color: '#9a9aaa', marginLeft: '0.5rem' }}>— the live PoC (DRAFT, not yet public)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card" style={{ padding: '1.75rem', alignSelf: 'start' }}>
              <div className="sans" style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9a9aaa', marginBottom: '1.25rem' }}>
                About this project
              </div>
              <p className="sans" style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#4a4a5e', fontWeight: 300, marginBottom: '1rem' }}>
                Care Query is developed by a practising NHS physiotherapist and First Contact Practitioner through 
                Intelligent Technology Solutions Limited — a sole-director private limited company operating entirely 
                independently of any NHS employer.
              </p>
              <p className="sans" style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#4a4a5e', fontWeight: 300, marginBottom: '1rem' }}>
                All development is conducted in personal time, on personal infrastructure, using publicly available 
                service information only. No NHS patient data is collected, stored, or processed at any stage.
              </p>
              <p className="sans" style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#4a4a5e', fontWeight: 300 }}>
                Care Query is an independent innovation developed in line with NHS digital standards. 
                It is not endorsed by, affiliated with, or developed on behalf of any NHS organisation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#1a1a2e', color: '#a8a8c0', padding: '2.5rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="serif" style={{ fontSize: '1.1rem', color: '#fff', marginRight: '0.75rem' }}>Care Query</span>
            <span className="sans" style={{ fontSize: '0.8rem', color: '#6a6a8a' }}>Proof of Concept — Cheshire and Merseyside ICB — 2026</span>
          </div>
          <div className="sans" style={{ fontSize: '0.78rem', color: '#6a6a8a' }}>
            © 2026 Intelligent Technology Solutions Limited · No cookies · No patient data
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CareQueryWebsite;
