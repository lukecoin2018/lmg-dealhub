/* global React, Icon, Eyebrow */
function ResourceDetailPage() {
  return (
    <>
      <section className="lmg-detail-hero">
        <div className="lmg-detail-hero-inner">
          <div>
            <div className="lmg-detail-tags">
              <span className="level">beginner</span>
              <span className="cat">General</span>
            </div>
            <h1>Platform Comparison Guide: Instagram vs TikTok vs YouTube vs LinkedIn</h1>
            <p className="lead">A comprehensive side-by-side comparison of the four primary influencer marketing platforms. Covers audience demographics, content formats, pricing norms, best-fit brand categories, and how to decide where to invest your influencer marketing budget.</p>
            <div className="lmg-detail-meta">
              <span><Icon name="file-text" size={14} /> ebook</span>
              <span><Icon name="clock" size={14} /> 18 minutes</span>
              <span><Icon name="eye" size={14} /> 2 views</span>
              <span><Icon name="download" size={14} /> 0 downloads</span>
            </div>
            <div className="lmg-detail-ctas">
              <button className="lmg-btn lmg-btn-primary lmg-btn-lg"><Icon name="download" size={18} /> Download Free</button>
              <button className="lmg-btn lmg-btn-outline lmg-btn-lg"><Icon name="heart" size={18} /> Like</button>
              <button className="lmg-btn lmg-btn-outline lmg-btn-lg" aria-label="Share"><Icon name="share-2" size={18} /></button>
            </div>
          </div>
          <div className="lmg-detail-photo" style={{ backgroundImage: 'url(../../assets/svc-brd-strategy.jpg)' }}></div>
        </div>
      </section>

      <section className="lmg-section-alt" style={{ padding: '56px 0 96px' }}>
        <div className="lmg-container">
          <div className="lmg-detail-grid">
            <div className="lmg-detail-card">
              <div className="topbar">
                <span><Icon name="calendar" size={14} /> Published Wed Mar 18 2026</span>
                <span><Icon name="user" size={14} /> For brands</span>
                <span className="audtag">brands</span>
              </div>
              <p style={{ marginTop: 0 }}>One of the most common — and most expensive — mistakes brands make in influencer marketing is choosing platforms based on assumptions rather than data. Brands invest in Instagram because it feels like the obvious choice. They avoid LinkedIn because it does not feel relevant. They chase TikTok because it is what every executive is asking about.</p>
              <p>This guide breaks down each of the four major platforms — Instagram, TikTok, YouTube, and LinkedIn — across the dimensions that actually matter: audience size and quality, average engagement rate, content format constraints, creator pricing norms (CPM, flat-fee, and performance), conversion behavior, and the brand categories that consistently perform on each.</p>
              <h3 style={{ fontSize: 22, marginTop: 28, marginBottom: 8 }}>What you'll learn</h3>
              <ul style={{ paddingLeft: 18, lineHeight: 1.8, color: 'var(--fg-1)' }}>
                <li>Audience demographics &amp; behavior on each platform</li>
                <li>Engagement-rate benchmarks (and how to read them honestly)</li>
                <li>Creator pricing norms by follower tier</li>
                <li>A decision framework for allocating budget across platforms</li>
                <li>Case studies from luxury, fashion, beauty, and B2B brands</li>
              </ul>
            </div>
            <aside>
              <div className="lmg-detail-download">
                <div className="ico"><Icon name="file-text" size={24} /></div>
                <h3>Free Download</h3>
                <p>Get instant access to this professional template.</p>
                <button className="lmg-btn lmg-btn-primary" style={{ background: 'var(--lmg-pink)' }}><Icon name="download" size={16} /> Download Free</button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
window.ResourceDetailPage = ResourceDetailPage;
