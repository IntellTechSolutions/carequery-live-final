import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Mail, MapPin, FileText, CheckSquare, Users, GitBranch, Shield, ExternalLink, Check, Compass, Handshake } from 'lucide-react';

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
        }
      `}</style>

      {/* Navigation */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', zIndex: 50, borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 700, color: '#111827', letterSpacing: '-0.01em' }}>Care Query</span>
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
              <em style={{ color: '#2563eb' }}>A simpler path.</em>
            </h1>
            <p className="body-text" style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#4b5563', marginBottom: '1.25rem', fontWeight: 400 }}>
              Accurate, up-to-date MSK pathway information — in one place, for every clinician who needs to refer.
            </p>
            <div style={{ borderLeft: '3px solid #374151', paddingLeft: '1rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#111827', fontWeight: 400 }}>
                The most common reason a well-judged referral fails is not clinical — it is informational. Criteria that changed. An investigation not yet done. A catchment boundary that shifted. From 1 April 2026, every A&G submission is mandatory and unpaid — and every return is an unfunded burden that increases the practice's risk of ICB performance scrutiny.
              </p>
              <p className="body-text" style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
                <span className="brand">Care Query</span> surfaces those requirements before the referral is sent — generating three pieces of information called cards. Whether an FCP prepares the submission or a GP signs it off, the information is the same.
              </p>
              <p className="body-text" style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
                The <strong style={{ color: '#9b2335' }}>Gate Card</strong> is a structured pre-referral checklist — confirming the eligibility, catchment, and investigation requirements are in place before the submission leaves the practice.
              </p>
              <p className="body-text" style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
                The <strong style={{ color: '#ca8a04' }}>Service Card</strong> provides a structured reference view of the service itself — criteria, catchment, operational contacts, and practical pathway information.
              </p>
              <p className="body-text" style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
                The <strong style={{ color: '#16a34a' }}>Journey Card</strong> is the patient-facing summary sent after referral, explaining what happens next and what the patient can expect while waiting.
              </p>
              <p className="body-text" style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
                All three come from a single governed service record, so when information changes, every card reflects the update.
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

      <div className="divider" style={{ maxWidth: '1100px' }} />

      {/* Current Scope */}
      <section style={{ padding: '3rem 1.5rem', background: '#f9fafb' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ maxWidth: '820px' }}>
            <div>
            <span className="tag tag-blue" style={{ marginBottom: '1rem', display: 'inline-block' }}>Current Scope</span>
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

      {/* What It Does */}
      <section id="what-it-does" style={{ padding: '6rem 1.5rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '4rem', alignItems: 'start', marginBottom: '3.5rem' }}>
            <div>
              <span className="tag tag-blue" style={{ marginBottom: '1rem', display: 'inline-block' }}>Three Clinical Outputs</span>
              <h2 className="heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', lineHeight: 1.2, color: '#111827', letterSpacing: '-0.01em' }}>
                One governed record.<br />Three practical outputs.
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
                Referral pathways are rarely clinically complex — but they are operationally complex. The eligibility criteria, catchment rules, required investigations, and administrative expectations vary between services, change over time, and are rarely documented in one place. <span className="brand">Care Query</span> focuses on making those operational requirements visible at the point of referral.
              </p>
              <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
                The Gate Card is a structured pre-referral checklist confirming that the key requirements are in place before an Advice and Guidance request is submitted. The Service Card is the governed reference view — criteria, catchment, contacts, and expected pathway. The Journey Card is the patient-facing summary shared after referral.
              </p>
              <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
                Each service has one governed data record. Every output — checklist, reference view, and patient summary — is generated from that single source. When the record is updated, all three outputs automatically reflect the change.
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
              summary: 'With A&G mandatory from 1 April 2026 and the per-request payment removed, returned submissions are unfunded work — and they contribute to ICB performance risk. Whether an FCP prepares the submission or a GP signs it off, the requirements are the same. The Gate Card confirms they are in place before the submission leaves the practice. Not another task. Protection from the most preventable failure in the referral process.',
              detail: (
                <>
                  <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '1.25rem' }}>
                    Any clinician who initiates an MSK referral — GP, Physician Associate, Paramedic, ACP, or FCP — can use the Gate Card. It confirms eligibility criteria, catchment, required investigations, and conservative management prerequisites before submission. Gates are tri-state: confirmed, not applicable, or flagged. Completion generates a clipboard-ready administrative summary. The clinician decides. The software records.
                  </p>
                  <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '1.25rem' }}>
                    The most common reasons MSK A&G is returned — missing imaging, wrong catchment, insufficient clinical information, incomplete conservative management — are all preventable. The Gate Card makes them visible before the submission is sent, not three weeks after it bounces back.
                  </p>
                  {/* Illustrative example — Community MSK Spinal Assessment */}
                  <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                    <div className="body-text" style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '0.75rem' }}>
                      Illustrative example — Community MSK Spinal Assessment Service
                    </div>
                    {[
                      'Patient is aged 18 or over',
                      'Patient is registered with a GP practice within the service catchment area',
                      'Primary complaint is spinal pain — cervical, thoracic, or lumbar — as the presenting problem',
                      'Conservative management has been attempted: minimum 6 weeks of physiotherapy, structured exercise, or self-management programme',
                      'Relevant imaging completed where clinically indicated — spinal X-ray or MRI for suspected nerve root involvement or red flag exclusion',
                      'Serious spinal pathology screened and excluded: cauda equina symptoms, progressive neurological deficit, unexplained weight loss, history of malignancy, suspected infection or fracture',
                      'Patient is NOT on an acute surgical pathway — no post-operative review within 12 weeks, no active cauda equina presentation',
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
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {['Hard gates', 'Soft gates', 'Red flag check', 'Clipboard summary'].map(t => (
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
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0', borderBottom: '1px solid #e5e7eb' }}>
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
              summary: 'Sent to the patient after referral — typically via Accurx SMS — explaining the service, what typically happens next, and what they can do while waiting. Pre-emptively answers the questions that would otherwise generate a callback to reception.',
              detail: (
                <>
                  <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '1.25rem' }}>
                    The Journey Card is the smallest of the three outputs and the simplest: plain language, no clinical jargon, no login, no data collection. It opens a static page at carequery.app. Because it pre-emptively answers wait time, next-steps, and self-management questions, it suppresses the callbacks that follow most MSK referrals. That is a direct benefit to reception staff, not just the patient.
                  </p>
                  <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                    <div className="body-text" style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '0.75rem' }}>
                      Illustrative example — Community Rheumatology Service
                    </div>
                    {[
                      {
                        heading: 'Your referral',
                        text: 'Your GP or physiotherapist has referred you to the Community Rheumatology Service. This is a specialist service for joint, muscle, and connective tissue problems that need a more detailed assessment. We know that waiting to be seen can be frustrating, especially when you are in pain. Here is what is happening and what you can do in the meantime.',
                      },
                      {
                        heading: 'What happens next',
                        text: 'Your referral has been sent to the service. They will review it and write to you with an appointment date. Typical waiting times for an initial assessment are currently around 12–18 weeks, though this can vary. You do not need to contact your GP surgery — your referral is with the service.',
                      },
                      {
                        heading: 'While you are waiting',
                        text: 'Staying as active as you comfortably can is usually helpful for joint and muscle conditions. If your symptoms change significantly — for example, new swelling in multiple joints, unexplained weight loss, fever alongside joint pain, or symptoms that are rapidly getting worse — contact your GP practice. For pain management while you wait, your GP or pharmacist can advise on suitable options.',
                      },
                      {
                        heading: 'Your first appointment',
                        text: 'A rheumatologist or specialist nurse will ask about your symptoms, how they affect your daily life, and review any investigations already done. They may request blood tests or imaging as part of the assessment. Please bring a list of your current medications.',
                      },
                    ].map((section, i) => (
                      <div key={i} style={{ marginBottom: i < 3 ? '0.85rem' : 0, paddingBottom: i < 3 ? '0.85rem' : 0, borderBottom: i < 3 ? '1px solid #e5e7eb' : 'none' }}>
                        <div className="body-text" style={{ fontSize: '0.72rem', fontWeight: 700, color: '#374151', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{section.heading}</div>
                        <p className="body-text" style={{ fontSize: '0.82rem', lineHeight: 1.65, color: '#4b5563', fontWeight: 400 }}>{section.text}</p>
                      </div>
                    ))}
                    <div style={{ marginTop: '0.75rem', padding: '0.5rem 0.75rem', background: '#dcfce7', borderRadius: '6px' }}>
                      <span className="body-text" style={{ fontSize: '0.75rem', color: '#166534', fontWeight: 500 }}>
                        No login · No data collected · Opens in any browser via a link sent by your clinician
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {['Patient-facing', 'Accurx-compatible', 'No data collection', 'Callback suppression'].map(t => (
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
          <div style={{ marginTop: '2rem', padding: '1.25rem 1.5rem', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <p className="body-text" style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#6b7280', fontWeight: 400 }}>
              Each service is described in a single <strong style={{ color: '#374151' }}>Underlying Service Record</strong> — a governed JSON file maintained by a named steward. From it, three outputs are generated. The Gate Card is the primary interaction for any clinician at the point of referral. The Service Card is the structured reference view. The Journey Card goes to the patient after referral.
            </p>
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: '1100px', margin: '0 auto' }} />

      {/* How It Works */}
      <section id="how-it-works" style={{ padding: '6rem 1.5rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start', marginBottom: '3.5rem' }}>
            <div>
              <span className="tag tag-blue" style={{ marginBottom: '1rem', display: 'inline-block' }}>Technical Architecture</span>
              <h2 className="heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', lineHeight: 1.2, color: '#111827', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
                Simple by design.<br />No black box, no AI, no guesswork.
              </h2>
              <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '0.75rem' }}>
                NHS referral pathways are operationally complex but rarely documented in a structured, machine-readable way. <span className="brand">Care Query</span> encodes that information into a single governed record per service — making it available at the point of referral in a consistent, auditable format.
              </p>
              <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '0.75rem' }}>
                <strong>For practice staff:</strong> <span className="brand">Care Query</span> runs in a browser tab. No installation, no IT request, no login, no integration with your clinical system required. Open it, use it, close it.
              </p>
              <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
                <strong>For commissioners and clinical leads:</strong> The tool reads a single structured data file and renders outputs from it. What you see is exactly what is in that file — no inference, no AI in the routing logic, nothing probabilistic. If a gate appears on a checklist, it is because a named steward put it there. Every output is auditable back to its source.
              </p>
            </div>
            <div className="card" style={{ padding: '1.75rem', background: '#fff' }}>
              <div className="body-text" style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '1rem' }}>
                The referral problem — in numbers
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', columnGap: '1rem' }}>
                {[
                  { stat: '5 services', label: 'MSK services currently encoded in the proof-of-concept' },
                  { stat: '3 outputs', label: 'Gate Card, Service Card, and Journey Card — all generated from a single Underlying Service Record' },
                  { stat: '1 record', label: 'Underlying Service Record per service — the single governed source that powers all three outputs' },
                  { stat: '1 ICB', label: 'Focused on MSK referral pathways across Cheshire and Merseyside Integrated Care Board' },
                  { stat: '1 Apr 2026', label: 'A&G mandatory under the 2026 GP contract — operational pathway requirements remain unstandardised across ICBs' },
                ].map((item, i) => (
                  <React.Fragment key={i}>
                    <span className="heading" style={{ fontSize: '1.2rem', color: '#374151', whiteSpace: 'nowrap', lineHeight: 1, padding: '0.65rem 0', borderBottom: i < 4 ? '1px solid #f3f4f6' : 'none', display: 'flex', alignItems: 'center' }}>{item.stat}</span>
                    <span className="body-text" style={{ fontSize: '0.82rem', color: '#4b5563', lineHeight: 1.4, fontWeight: 400, padding: '0.65rem 0', borderBottom: i < 4 ? '1px solid #f3f4f6' : 'none', display: 'flex', alignItems: 'center' }}>{item.label}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="three-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
            {[
              {
                step: '01',
                title: 'Governed Data Source',
                body: 'A single service-records.json file is the source of truth. Each service record contains identity, referral gates, operational signals, and governance metadata. Records are DRAFT until a steward manually verifies and publishes.',
                pills: ['Structured JSON schema', 'DRAFT / PUBLISHED states'],
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
              <span className="tag tag-blue" style={{ marginBottom: '1rem', display: 'inline-block' }}>Regulatory Position</span>
              <h2 className="heading" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', lineHeight: 1.2, color: '#111827', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
                Your judgment.<br />Our structure.
              </h2>
              <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '0.75rem' }}>
                Clinical judgment comes from you — built over years of training and practice. <span className="brand">Care Query</span> does not second-guess it. What it does is make sure the administrative groundwork is solid before the submission leaves, so that your referral decision reaches the service it was meant for.
              </p>
              <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginBottom: '0.75rem' }}>
                <span className="brand">Care Query</span> does not provide diagnosis, triage, or clinical decision support. This lies in the hands of clinicians. The Gate Card surfaces criteria, catchment, and investigation requirements. You confirm what applies. The software records it.
              </p>
              <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
                <span className="brand">Care Query</span> structures referral requirements that already exist across NHS services — making them visible at the point the referral is prepared. The clinical decision remains entirely yours; the platform exists only to support the administrative accuracy around it.
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
          <div style={{ maxWidth: '760px', marginBottom: '3rem', display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
            <div style={{ width: '68px', height: '68px', borderRadius: '16px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.25rem' }}>
              <Handshake size={30} color="#2563eb" />
            </div>
            <div style={{ flex: 1 }}>
            <span className="tag tag-blue" style={{ marginBottom: '1rem', display: 'inline-block' }}>Collaboration</span>
            <h2 className="heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', lineHeight: 1.2, color: '#111827', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
              The knowledge is yours.<br /><span className="brand">Care Query</span> is just the structure.
            </h2>
            <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
              The most valuable thing this project can encode is the operational knowledge that experienced clinicians and administrative staff carry but rarely write down — the nuance behind referral criteria, pathway expectations, and the details that make a referral land well. That knowledge belongs to the people running these services every day.
            </p>
            <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, marginTop: '0.75rem' }}>
              If you recognise this problem in your own referral pathways, a short conversation is enough to start. No commitment required.
            </p>
            </div>
          </div>

          <div className="three-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginBottom: '1.5rem' }}>
            {[
              {
                title: 'Clinical Contributors',
                desc: 'You know what actually causes A&G to bounce — the operational nuance that no published pathway document captures. That knowledge is what a Service Card is built to capture. A Service Card verified by you means fewer inappropriate referrals reaching your service and fewer calls from practices asking basic questions.',
                tag: 'GPs · Physician Associates · Paramedics · ACPs · FCPs · Physios · Service admins',
              },
              {
                title: 'Pilot Practices',
                desc: 'From 1 April 2026, every A&G submission is mandatory with no per-request payment. We are looking for 5–10 GP practices in Cheshire and Merseyside to use the Gate Card in a real referral workflow. Pilot evaluation will measure the change in returned A&G submissions before and after Gate Card use across participating practices.',
                tag: 'GP Practice Managers · PCN Clinical Directors · FCP leads',
              },
              {
                title: 'Service Owners and Clinical Leads',
                desc: 'An accurate Service Card means fewer inappropriate referrals reaching your service, fewer admin queries, and a description you control — not one that lives in an out-of-date document. You also get a direct channel to update it.',
                tag: 'Service managers · Clinical leads · MSK service administrators',
              },
            ].map((item, i) => (
              <div key={i} className="card" style={{ padding: '1.75rem' }}>
                <h3 className="heading" style={{ fontSize: '1.2rem', color: '#111827', marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>{item.title}</h3>
                <p className="body-text" style={{ fontSize: '0.88rem', lineHeight: 1.65, color: '#4b5563', fontWeight: 400, marginBottom: '1rem' }}>{item.desc}</p>
                <span className="body-text" style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#2563eb' }}>{item.tag}</span>
              </div>
            ))}
          </div>

          <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400, maxWidth: '640px', marginBottom: '3rem' }}>
            Each service added to <span className="brand">Care Query</span> increases its value for every clinician who uses it. The system grows through the contributions of service owners and clinical teams — not as a favour to the project, but because an accurate, current description of their service is directly in their interest: fewer inappropriate referrals, fewer phone calls from practices, fewer returns through A&G.
          </p>

          <div className="card" style={{ padding: '1.75rem', maxWidth: '560px' }}>
            <h3 className="heading" style={{ fontSize: '1.1rem', color: '#111827', marginBottom: '0.5rem' }}>Stay informed</h3>
            <p className="body-text" style={{ fontSize: '0.85rem', color: '#4b5563', fontWeight: 400, marginBottom: '1.25rem' }}>
              Leave your email and we will contact you when the pilot opens for practices, or when a new service is published.
            </p>
            {submitted ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Check size={18} color="#22c55e" />
                <p className="body-text" style={{ color: '#2563eb', fontWeight: 500, fontSize: '0.9rem' }}>Received — we will be in touch.</p>
              </div>
            ) : (
              <form name="stay-informed" data-netlify="true" onSubmit={handleEmailSubmit} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <input type="hidden" name="form-name" value="stay-informed" />
                <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com" required className="input-field" style={{ flex: 1, minWidth: '220px' }} />
                <button type="submit" className="btn-primary">Register interest</button>
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
