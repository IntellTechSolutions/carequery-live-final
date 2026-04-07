{/* What It Does */}
<section id="what-it-does" style={{ padding: '6rem 1.5rem', background: '#ffffff', scrollMarginTop: '80px' }}>
  <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
    <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '4rem', alignItems: 'start', marginBottom: '3.5rem' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <Database size={20} color="#2563eb" />
          <span className="tag tag-blue" style={{ marginBottom: '0' }}>Five Outputs</span>
        </div>
        <h2 className="heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', lineHeight: 1.2, color: '#111827', letterSpacing: '-0.01em' }}>
          One source-linked record.<br />Five outputs.
        </h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
        <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
          Clinicians currently discover what a service requires by sending a referral and reading the return. Pathway criteria are held in commissioning documents and institutional memory — not in a format usable during a consultation. <span className="brand">Care Query</span> is a consultation-closure tool that helps clinicians answer the question before anything is submitted. One source-linked record per service generates five outputs — one for every stage of the consultation, from pathway orientation to patient handoff.
        </p>
        <p className="body-text" style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4b5563', fontWeight: 400 }}>
          The <strong style={{ color: OVERVIEW_ACCENT_COLOR }}>Overview Card</strong> gives the landscape. The <strong style={{ color: '#ca8a04' }}>Service Card</strong> shows what each service publicly states it does. The <strong style={{ color: '#9b2335' }}>Readiness Card</strong> helps the clinician confirm administrative prerequisites for this patient. The <strong style={{ color: '#16a34a' }}>Journey Card</strong> gives the patient a pathway summary when the referral is ready. The <strong style={{ color: '#4f46e5' }}>Preparation Card</strong> gives the patient a plan when prerequisites are outstanding. Based on published sources. The same record, available to every clinician.
        </p>
      </div>
    </div>
  </div>
</section>
