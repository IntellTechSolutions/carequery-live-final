import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Mail,
  MapPin,
  FileText,
  CheckSquare,
  Users,
  Shield,
  Stethoscope,
  BookOpen,
  Cpu,
  Zap,
  Activity,
  Globe
} from "lucide-react";

const CareQueryWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  /* ---------------- Scroll tracking ---------------- */

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "features",
        "technology",
        "impact",
        "team",
        "contact"
      ];

      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);

        if (!element) continue;

        const { offsetTop, offsetHeight } = element;

        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- Scroll helper ---------------- */

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const offset = 64;

    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;

    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });

    setIsMenuOpen(false);
  };

  /* ---------------- Email form ---------------- */

  const handleEmailSubmit = (e) => {
    e.preventDefault();

    if (!email) return;

    setSubmitted(true);
    setEmail("");
  };

  /* ---------------- Navigation items ---------------- */

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "features", label: "Features" },
    { id: "technology", label: "Technology" },
    { id: "impact", label: "Impact" },
    { id: "team", label: "Team" },
    { id: "contact", label: "Contact" }
  ];

  return (
    <div
      className="sans"
      style={{
        background: "#ffffff",
        minHeight: "100vh",
        color: "#111827"
      }}
    >

      {/* ---------------- Fonts + Global CSS ---------------- */}

      <style>{`

      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

      *{
        box-sizing:border-box;
        margin:0;
        padding:0;
      }

      .sans{
        font-family:'Inter', -apple-system, system-ui, sans-serif;
        line-height:1.5;
      }

      .container{
        max-width:1280px;
        margin:0 auto;
        padding:0 1.5rem;
      }

      .section-padding{
        padding:5rem 0;
      }

      .nav-link{
        font-size:0.95rem;
        font-weight:500;
        color:#4b5563;
        cursor:pointer;
        border:none;
        background:none;
        transition:color 0.2s;
      }

      .nav-link:hover{
        color:#2563eb;
      }

      .nav-link.active{
        color:#2563eb;
      }

      .btn-primary{
        background:#2563eb;
        color:white;
        padding:0.75rem 2rem;
        border-radius:0.5rem;
        font-weight:600;
        border:none;
        cursor:pointer;
        display:inline-flex;
        align-items:center;
        gap:0.5rem;
        transition:all 0.2s;
      }

      .btn-primary:hover{
        background:#1d4ed8;
        transform:translateY(-1px);
      }

      .btn-outline{
        border:2px solid #2563eb;
        color:#2563eb;
        background:transparent;
        padding:0.75rem 2rem;
        border-radius:0.5rem;
        font-weight:600;
        cursor:pointer;
      }

      .btn-outline:hover{
        background:#eff6ff;
      }

      .card{
        background:white;
        border:1px solid #f3f4f6;
        border-radius:0.75rem;
        padding:2rem;
        box-shadow:0 10px 15px -3px rgba(0,0,0,0.1);
        transition:all 0.2s;
      }

      .card:hover{
        transform:translateY(-4px);
        box-shadow:0 20px 25px -5px rgba(0,0,0,0.1);
      }

      .badge-pill{
        background:#dbeafe;
        color:#1e40af;
        font-size:0.875rem;
        font-weight:600;
        padding:0.5rem 1rem;
        border-radius:9999px;
        display:inline-block;
      }

      .icon-box{
        width:3rem;
        height:3rem;
        background:#dbeafe;
        color:#2563eb;
        border-radius:0.5rem;
        display:flex;
        align-items:center;
        justify-content:center;
        margin-bottom:1.5rem;
      }

      .stat-number{
        font-size:2.5rem;
        font-weight:800;
        color:#2563eb;
      }

      .input-field{
        padding:0.75rem 1rem;
        border:1px solid #d1d5db;
        border-radius:0.5rem;
        font-size:1rem;
        width:100%;
      }

      .grid-hero{
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:3rem;
        align-items:center;
      }

      .grid-3{
        display:grid;
        grid-template-columns:repeat(3,1fr);
        gap:2rem;
      }

      .grid-4{
        display:grid;
        grid-template-columns:repeat(4,1fr);
        gap:2rem;
      }

      .grid-2{
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:2rem;
      }

      @media (max-width:768px){

        .grid-hero,
        .grid-3,
        .grid-4,
        .grid-2{
          grid-template-columns:1fr;
        }

      }

      `}</style>

      {/* ---------------- NAVBAR ---------------- */}

      <nav
        style={{
          height: "64px",
          position: "fixed",
          top: 0,
          width: "100%",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(8px)",
          zIndex: 100,
          borderBottom: "1px solid #f3f4f6"
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%"
          }}
        >
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <span
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                letterSpacing: "-0.02em"
              }}
            >
              CareQuery
            </span>

            <div style={{ display: "flex", gap: "1.5rem" }}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-link ${
                    activeSection === item.id ? "active" : ""
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <button
            className="btn-primary"
            style={{ padding: "0.5rem 1.25rem", fontSize: "0.875rem" }}
            onClick={() => scrollToSection("contact")}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* ---------------- HERO ---------------- */}

      <section
        id="home"
        className="section-padding"
        style={{
          paddingTop: "10rem",
          background: "linear-gradient(to bottom right,#eff6ff,#ffffff)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center"
        }}
      >
        <div className="container">
          <div className="grid-hero">
            <div>
              <div className="badge-pill" style={{ marginBottom: "1.5rem" }}>
                Next-Gen MSK Referrals
              </div>

              <h1
                style={{
                  fontSize: "clamp(2.5rem,5vw,4rem)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  marginBottom: "1.5rem"
                }}
              >
                Referrals done right,
                <span style={{ color: "#2563eb" }}> first time.</span>
              </h1>

              <p
                style={{
                  fontSize: "1.25rem",
                  color: "#4b5563",
                  marginBottom: "2rem",
                  maxWidth: "600px"
                }}
              >
                Structured pre-referral intelligence for GPs and First Contact
                Practitioners. Reduce rejections and streamline patient
                pathways.
              </p>

              <div style={{ display: "flex", gap: "1rem" }}>
                <button className="btn-primary">
                  Explore Platform <ArrowRight size={20} />
                </button>

                <button
                  className="btn-outline"
                  onClick={() => scrollToSection("about")}
                >
                  How it Works
                </button>
              </div>
            </div>

            <div>
              <div
                style={{
                  background:
                    "linear-gradient(135deg,#3b82f6,#2563eb)",
                  borderRadius: "1.5rem",
                  padding: "2rem",
                  color: "white"
                }}
              >
                {[
                  "Confirm Patient Age > 18",
                  "Exclude Red Flags",
                  "Validate Catchment Area",
                  "Upload Imaging Results"
                ].map((step, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "1rem",
                      marginBottom: "1rem"
                    }}
                  >
                    <CheckSquare size={18} />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- IMPACT ---------------- */}

      <section id="impact" className="section-padding">
        <div className="container">
          <div className="grid-4">
            {[
              { num: "90%", label: "Rejection Reduction" },
              { num: "4M+", label: "Clinical Hours Saved" },
              { num: "100%", label: "Auditability" },
              { num: "24/7", label: "Pathways Active" }
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div className="stat-number">{stat.num}</div>
                <div style={{ color: "#4b5563", fontWeight: 600 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CONTACT ---------------- */}

      <section id="contact" className="section-padding">
        <div className="container">
          <div
            className="card"
            style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}
          >
            <h2 style={{ fontSize: "2rem", fontWeight: 800 }}>
              Join the 2026 Pilot
            </h2>

            {submitted ? (
              <div className="badge-pill">Registration successful</div>
            ) : (
              <form
                onSubmit={handleEmailSubmit}
                style={{
                  display: "flex",
                  gap: "1rem",
                  marginTop: "2rem"
                }}
              >
                <input
                  className="input-field"
                  type="email"
                  placeholder="Professional email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button type="submit" className="btn-primary">
                  Join
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}

      <footer
        style={{
          background: "#111827",
          color: "#9ca3af",
          padding: "4rem 0"
        }}
      >
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontWeight: 800, color: "#fff" }}>CareQuery</div>

              <div style={{ marginTop: "1rem" }}>
                <Mail size={16} /> info@intelltechsolutions.co.uk
              </div>

              <div style={{ marginTop: "0.5rem" }}>
                <MapPin size={16} /> Manchester, UK
              </div>
            </div>

            <div>© 2026 Intelligent Technology Solutions Limited</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CareQueryWebsite;
