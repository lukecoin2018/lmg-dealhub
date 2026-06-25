/* global React, useApp, Button, Eyebrow, Icon */
function AudienceSplit() {
  const { setModal } = useApp();
  return (
    <section className="lmg-section lmg-audience" id="brands">
      <div className="lmg-container">
        <div className="lmg-audience-grid">
          <article className="lmg-audience-card">
            <Eyebrow color="var(--lmg-yellow-deep)">For Brands</Eyebrow>
            <h2>Authentic creator partnerships, scaled.</h2>
            <p>Strategic matchmaking, end-to-end campaign execution, and real-time performance tracking — built for marketing leaders who need ROI without compromising taste.</p>
            <ul className="lmg-tick-list">
              <li><Icon name="check" size={16} /> AI-powered creator vetting</li>
              <li><Icon name="check" size={16} /> Performance-driven campaign development</li>
              <li><Icon name="check" size={16} /> Cross-platform content strategy</li>
            </ul>
            <Button variant="primary" iconRight="arrow-right" onClick={() => setModal('brand')}>Start Your Campaign</Button>
          </article>
          <article className="lmg-audience-card lmg-audience-card--pink" id="influencers">
            <Eyebrow color="var(--lmg-pink)">For Influencers</Eyebrow>
            <h2>Brand deals that respect your work.</h2>
            <p>Curated partnerships with brands that align with your audience, fair compensation, and the operational backbone to scale your business sustainably.</p>
            <ul className="lmg-tick-list">
              <li><Icon name="check" size={16} /> Exclusive brand partnerships</li>
              <li><Icon name="check" size={16} /> Contract negotiation &amp; representation</li>
              <li><Icon name="check" size={16} /> Content production support</li>
            </ul>
            <Button variant="secondary" iconRight="arrow-right" onClick={() => setModal('influencer')}>Join as Influencer</Button>
          </article>
        </div>
      </div>
    </section>
  );
}
window.AudienceSplit = AudienceSplit;
