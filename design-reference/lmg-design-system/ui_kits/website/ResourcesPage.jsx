/* global React, Eyebrow, Icon, Button, useApp */
function ResourcesPage() {
  const [tab, setTab] = React.useState('all');
  const [activeCat, setActiveCat] = React.useState('All Resources');
  return (
    <>
      <section className="lmg-section" style={{ paddingTop: 48 }}>
        <div className="lmg-container">
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap: 12, marginBottom: 24 }}>
            <Icon name="star" size={20} color="var(--lmg-yellow-deep)" />
            <h2 style={{ margin:0, fontSize: 36 }}>Featured This Week</h2>
            <Icon name="star" size={20} color="var(--lmg-yellow-deep)" />
          </div>
          <div className="lmg-featured-card">
            <div className="lmg-featured-photo" style={{ backgroundImage: 'url(../../assets/featured-photo.jpg), linear-gradient(135deg,#222,#444)'}}>
              <span className="lmg-featured-pill"><Icon name="star" size={12} /> Featured</span>
            </div>
            <div className="lmg-featured-body">
              <h3>Complete Brand Partnership Guide</h3>
              <p>Everything you need to know about securing and managing brand partnerships. Learn proven strategies for pitching to brands, negotiating contracts, and building long-term profitable relationships that elevate your influencer career.</p>
              <div className="lmg-featured-meta">
                <span><Icon name="eye" size={14} /> 2,547 views</span>
                <span><Icon name="download" size={14} /> 892 downloads</span>
                <span><Icon name="clock" size={14} /> 15 min read</span>
              </div>
              <button className="lmg-btn lmg-btn-primary lmg-btn-lg"><Icon name="download" size={18} /> Download Now - Free</button>
            </div>
          </div>
        </div>
      </section>

      <section className="lmg-section-alt" style={{ paddingTop: 48, paddingBottom: 96 }}>
        <div className="lmg-container">
          <div className="lmg-res-toolbar">
            <div className="lmg-res-search">
              <Icon name="search" size={16} />
              <input placeholder="Search resources... (Press Enter)" />
            </div>
            <select className="lmg-select" style={{ width: 140 }}><option>All</option><option>Strategy</option><option>Analytics</option></select>
            <select className="lmg-select" style={{ width: 140 }}><option>All Types</option><option>Guide</option><option>Template</option><option>Report</option></select>
            <select className="lmg-select" style={{ width: 140 }}><option>All Levels</option><option>Beginner</option><option>Advanced</option></select>
          </div>

          <div className="lmg-res-layout">
            <aside className="lmg-res-sidebar">
              <div className="lmg-side-card">
                <h4>Categories</h4>
                <ul>
                  {[
                    {n:'All Resources', c:'13', d:'var(--lmg-blue)'},
                    {n:'Strategy', c:'3', d:'#8E5CE6'},
                    {n:'Analytics', c:'2', d:'var(--success)'},
                    {n:'Campaign Management', c:'1', d:'var(--lmg-yellow-deep)'},
                    {n:'Legal & Compliance', c:'2', d:'var(--danger)'},
                    {n:'Platform Strategy', c:'1', d:'var(--lmg-pink)'},
                    {n:'Industry Insights', c:'1', d:'#E69500'},
                    {n:'Case Studies', c:'1', d:'#5BBFE9'},
                  ].map(cat => (
                    <li key={cat.n} className={activeCat === cat.n ? 'active' : ''} onClick={() => setActiveCat(cat.n)}>
                      <span className="dot" style={{ background: cat.d }}></span>
                      <span className="nm">{cat.n}</span>
                      <span className="ct">{cat.c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
            <div className="lmg-res-main">
              <div className="lmg-res-tabs">
                {['all','influencers','brands','universal'].map(k => (
                  <button key={k} className={tab===k ? 'active' : ''} onClick={() => setTab(k)}>
                    {k==='all' ? 'All Resources' : k==='influencers' ? 'For Influencers' : k==='brands' ? 'For Brands' : 'Universal'}
                  </button>
                ))}
              </div>
              <div className="lmg-caption" style={{ margin:'12px 0 20px' }}>Showing 12 of 23 resources</div>
              <div className="lmg-res-grid">
                {[
                  { tag:'beginner', tagColor:'var(--success)', icon:'image', title:'2026 Influencer Marketing Industry Report', excerpt:'Comprehensive analysis of trends, budgets, and ROI benchmarks across the 2026 creator economy.', featured:true, photo:'../../assets/svc-inf-deal-flow.jpg', accent:'var(--lmg-pink)' },
                  { tag:'beginner', tagColor:'var(--success)', icon:'book-open', title:'TikTok Growth Strategy Playbook 2025', excerpt:'A step-by-step playbook for organic and paid TikTok growth in 2025.', featured:true, photo:'../../assets/ref-instagram-grid.png', accent:'var(--lmg-pink)' },
                  { tag:'advanced', tagColor:'var(--lmg-pink-soft)', tagText:'#99214C', icon:'image', title:'Micro-Influencer Campaign ROI Calculator', excerpt:'A spreadsheet model + worked examples for projecting ROI on micro-influencer programs.', featured:true, photo:'../../assets/svc-inf-personal-brand.jpg', accent:'var(--lmg-pink)' },
                  { tag:'beginner', tagColor:'var(--success)', icon:'file-text', title:'Influencer Contract Template Pack', excerpt:'Three battle-tested contract templates for IG, TikTok, and long-form deals.', photo:'../../assets/svc-brd-partnership.jpg', accent:'var(--audience-brand)' },
                  { tag:'intermediate', tagColor:'var(--lmg-yellow-soft)', tagText:'#6B5500', icon:'bar-chart-3', title:'AI-Powered Influencer Vetting Workflow', excerpt:'How LMG’s AI vetting stack works — and how to replicate the methodology in-house.', photo:'../../assets/svc-brd-strategy.jpg', accent:'var(--audience-brand)' },
                  { tag:'beginner', tagColor:'var(--success)', icon:'sparkles', title:'Personal Brand Workbook for Creators', excerpt:'Twelve worksheets for nailing positioning, story, and visual identity.', photo:'../../assets/svc-inf-personal-brand.jpg', accent:'var(--lmg-pink)' },
                ].map((r, i) => (
                  <article key={i} className="lmg-res-card">
                    <div className="lmg-res-photo" style={{ backgroundImage: `url(${r.photo})` }}>
                      <span className="lmg-res-level" style={{ background: r.tagColor, color: r.tagText || '#0a5e34' }}>{r.tag}</span>
                      <span className="lmg-res-icon"><Icon name={r.icon} size={16} /></span>
                      {r.featured && <span className="lmg-res-featured"><Icon name="star" size={11} /> Featured</span>}
                      <span className="lmg-res-accent" style={{ background: r.accent }}></span>
                    </div>
                    <div className="lmg-res-body">
                      <h3>{r.title}</h3>
                      <p>{r.excerpt}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
window.ResourcesPage = ResourcesPage;
