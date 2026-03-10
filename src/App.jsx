import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ArrowRight, Mail, MapPin, FileText, CheckSquare, 
  Users, Shield, Cpu, Zap, Activity, Globe, Stethoscope, BookOpen
} from 'lucide-react';

const CareQueryWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'features', 'technology', 'impact', 'team', 'contact'];
      const scrollPosition = window.scrollY + 100;
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
    if (element) {
      const offset = 64;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
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
    { id: 'about', label: 'About' },
    { id: 'features', label: 'Features' },
    { id: 'technology', label: 'Technology' },
    { id: 'impact', label: 'Impact' },
    { id: 'team', label: 'Team' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="sans" style={{ background: '#FFFFFF', minHeight: '100vh', color: '#111827' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .sans { 
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; 
          line-height: 1.5;
          font-weight: 400;
          color: #4B5563;
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .section-padding {
          padding: 5rem 0;
        }

        h1, .stat-number { font-weight: 800; color: #111827; }
        h2 { font-weight: 700; color: #111827; }
        h3, h4 { font-weight: 600; color: #111827; }

        .nav-link { 
          font-size: 0.95rem; 
          font-weight: 500; 
          color: #4B5563;
          cursor: pointer; 
          border: none; 
          background: none; 
          transition: color 0.2s; 
        }
        .nav-link:hover { color: #2563EB; }
        .nav-link.active { color: #2563EB; }

        .btn-primary { 
          background: #2563EB; 
          color: white; 
          padding: 0.75rem 2rem; 
          border-radius: 0.5rem; 
          font-weight: 600; 
          font-size: 1rem; 
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .btn-primary:hover { background: #1D4ED8; }

        .btn-outline { 
          border: 2px solid #2563EB; 
          color: #2563EB; 
          background: transparent; 
          padding: 0.75rem 2rem; 
          border-radius: 0.5rem; 
          font-weight: 600; 
          font-size: 1rem; 
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-outline:hover { background: #EFF6FF; }

        .card { 
          background: #FFFFFF; 
          border: 1px solid #D1D5DB;
          border-radius: 0.75rem; 
          padding: 2rem; 
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.2s;
        }
        .card:hover { transform: translateY(-4px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }

        .badge-pill {
          background: #DBEAFE;
          color: #1E40AF;
          font-size: 0.875rem;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          display: inline-block;
        }

        .icon-box {
          width: 3rem;
          height: 3rem;
          background: #DBEAFE;
          color: #2563EB;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .stat-number {
          font-size: 3rem;
          color: #2563EB;
          margin-bottom: 0.5rem;
        }

        .input-field {
          padding: 0.75rem 1rem;
          border: 1px solid #D1D5DB;
          border-radius: 0.5rem;
          font-size: 1rem;
          width: 100%;
          outline: none;
          color: #374151;
        }
        .input-field:focus {
          border-color: #2563EB;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .grid-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }

        @media (max-width: 1024px) {
          .grid-3, .grid-4 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .grid-hero, .grid-3, .grid-4, .grid-2 { grid-template-columns: 1fr; }
          .section-padding { padding: 4rem 0; }
        }
      `}</style>

      {/* Navigation */}
      <nav style={{ height: '64px', position: 'fixed', top: 0, width: '100%', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', zIndex: 100, borderBottom: '1px solid #D1D5DB' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.025em' }}>CareQuery</span>
            <div className="hidden lg:flex" style={{ display: 'flex', gap: '1.5rem' }}>
              {navItems.map(item => (
                <button key={item.id} onClick={() => scrollToSection(item.id)} className={`nav-link ${activeSection === item.id ? 'active' : ''}`}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <button className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }} onClick={() => scrollToSection('contact')}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="section-padding" style={{ paddingTop: '8rem', background: 'linear-gradient(180deg, #EFF6FF 0%, #FFFFFF 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div className="grid-hero">
            <div>
              <div className="badge-pill" style={{ marginBottom: '1.5rem' }}>Healthcare Technology Platform</div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.025em' }}>
                Referral pathways <span style={{ color: '#2563EB' }}>reimagined</span> for MSK.
              </h1>
              <p style={{ fontSize: '1.25rem', color: '#4B5563', marginBottom: '2.5rem', fontWeight: 400 }}>
                A structured pre-referral platform for GPs and First Contact Practitioners. 
                Reduce rejection rates and streamline patient pathways with deterministic logic.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button className="btn-primary">
                  Explore Platform <ArrowRight size={20} />
                </button>
                <button className="btn-outline" onClick={() => scrollToSection('about')}>
                  How it Works
                </button>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ background: 'linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)', borderRadius: '1.5rem', padding: '2.5rem', boxShadow: '0 20px 25px -5px rgba(37, 99, 235, 0.2)' }}>
                <div style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', borderRadius: '1rem', padding: '1.5rem', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <Activity size={20} />
                    <span style={{ fontWeight: 600 }}>Real-time Data Governance</span>
                  </div>
                  {[
                    'Universal Red Flag Filtering',
                    'Catchment Area Logic',
                    'A&G Documentation Standard',
                    'Patient SMS Summary Sync'
                  ].map((step, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', padding: '0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: '0.5rem' }}>
                      <CheckSquare size={18} color="#22C55E" />
                      <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding" style={{ background: '#F9FAFB' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Deterministic Logic</h2>
            <p style={{ fontSize: '1.125rem', color: '#4B5563' }}>
              Care Query utilizes a deterministic engine to ensure clinical routing decisions are auditable, 
              transparent, and aligned with local clinical protocols.
            </p>
          </div>
          <div className="grid-2">
            <div className="card">
              <div className="icon-box"><Shield size={24} /></div>
              <h3>Data Governance</h3>
              <p style={{ marginTop: '1rem' }}>
                Every service record is versioned and timestamped. Record states are managed by clinical 
                stewards to ensure data integrity and clinical safety.
              </p>
            </div>
            <div className="card">
              <div className="icon-box"><Cpu size={24} /></div>
              <h3>Infrastructure</h3>
              <p style={{ marginTop: '1rem' }}>
                Built on a dependency-free architecture for maximum reliability. FHIR-compatible structures 
                ensure interoperability across clinical systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding">
        <div className="container">
          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Key Features</h2>
            <p style={{ fontSize: '1.125rem' }}>One governed source of truth powering clinical and patient-facing outputs.</p>
          </div>
          <div className="grid-3">
            {[
              { icon: <Zap size={24} />, title: 'Gate Cards', desc: 'Pre-referral checklists to verify clinician-confirmed eligibility.' },
              { icon: <FileText size={24} />, title: 'Service Records', desc: 'Structured data for service criteria, catchments, and wait times.' },
              { icon: <Users size={24} />, title: 'Journey Cards', desc: 'Clear summaries for patients to understand their care pathway.' },
            ].map((feat, i) => (
              <div key={i} className="card">
                <div className="icon-box">{feat.icon}</div>
                <h3>{feat.title}</h3>
                <p style={{ marginTop: '1rem', fontSize: '0.95rem' }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="section-padding" style={{ background: '#111827', color: 'white' }}>
        <div className="container">
          <div className="grid-hero">
            <div>
              <h2 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1.5rem' }}>NHS-Ready Stack</h2>
              <p style={{ fontSize: '1.125rem', color: '#9CA3AF', marginBottom: '2.5rem' }}>
                Designed for clinical safety and compliance with modern healthcare standards.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {[
                  { label: 'FHIR Standards', icon: <Globe size={20} /> },
                  { label: 'SNOMED CT', icon: <Activity size={20} /> },
                  { label: 'DCB0129 Standards', icon: <Shield size={20} /> },
                  { label: 'GitHub CI/CD', icon: <Activity size={20} /> },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ color: '#2563EB' }}>{item.icon}</div>
                    <span style={{ fontWeight: 600 }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#1F2937', borderRadius: '1rem', padding: '2rem', border: '1px solid #374151' }}>
              <pre style={{ fontSize: '0.875rem', color: '#9CA3AF', fontFamily: 'monospace' }}>
                <code>{`{
  "service": "WIN-FCP-01",
  "status": "PUBLISHED",
  "verified_on": "2026-03-10",
  "steward": "FCP-LEAD-01"
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="section-padding">
        <div className="container">
          <div className="grid-4">
            {[
              { num: '90%', label: 'First-time Accuracy' },
              { num: '24/7', label: 'Availability' },
              { num: '1.0', label: 'Safety Score' },
              { num: 'Zero', label: 'PII Storage' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div className="stat-number">{stat.num}</div>
                <div style={{ fontWeight: 600, color: '#374151' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="section-padding" style={{ background: '#F9FAFB' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Clinician-Led Development</h2>
            <p style={{ fontSize: '1.125rem' }}>
              Care Query is built by NHS clinicians for NHS clinicians, addressing the real-world 
              complexities of the primary-to-secondary care transition.
            </p>
          </div>
          <div className="grid-2">
            <div className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div className="icon-box" style={{ margin: 0 }}><Stethoscope size={24} /></div>
              <div>
                <h4>Safety & Compliance</h4>
                <p style={{ fontSize: '0.875rem' }}>Rigorous clinical safety management and DCB0129 auditing.</p>
              </div>
            </div>
            <div className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div className="icon-box" style={{ margin: 0 }}><BookOpen size={24} /></div>
              <div>
                <h4>Pathway Design</h4>
                <p style={{ fontSize: '0.875rem' }}>Evidence-based criteria aligned with NICE clinical guidelines.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding">
        <div className="container">
          <div className="card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '4rem 2rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Pilot 2026 Registration</h2>
            <p style={{ marginBottom: '2.5rem', fontSize: '1.125rem' }}>Currently accepting pilot practice registrations in Cheshire and Merseyside.</p>
            {submitted ? (
              <div className="badge-pill" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>Interest Registered</div>
            ) : (
              <form onSubmit={handleEmailSubmit} style={{ display: 'flex', gap: '1rem', maxWidth: '500px', margin: '0 auto' }}>
                <input 
                  type="email" 
                  className="input-field" 
                  placeholder="Clinical or NHS email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn-primary">Join Pilot</button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#111827', color: '#9CA3AF', padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '3rem' }}>
            <div>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', display: 'block', marginBottom: '1.5rem' }}>CareQuery</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a href="mailto:info@intelltechsolutions.co.uk" style={{ color: '#9CA3AF', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={16} /> info@intelltechsolutions.co.uk
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={16} /> Manchester, UK
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: '#9CA3AF', marginBottom: '1rem' }}>© 2026 Intelligent Technology Solutions Limited</p>
              <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'flex-end', fontSize: '0.875rem' }}>
                <span>Privacy Policy</span>
                <span>Terms of Service</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CareQueryWebsite;
