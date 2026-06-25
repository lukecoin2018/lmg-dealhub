/* global React, Icon */
const BLOG_CATS = [
  { n: 'All Posts',    c: 54, d: 'var(--lmg-blue)' },
  { n: 'Strategy',     c: 14, d: 'var(--lmg-blue)' },
  { n: 'Partnerships', c: 1,  d: '#8E5CE6' },
  { n: 'Platforms',    c: 7,  d: 'var(--lmg-pink)' },
  { n: 'Analytics',    c: 0,  d: 'var(--success)' },
  { n: 'Industry',     c: 19, d: '#E69500' },
  { n: 'Legal',        c: 1,  d: 'var(--danger)' },
];

const BLOG_POSTS = [
  { cat:'Uncategorized', tag:'Creator Economy', tagAccent:true, title:'Influencer Marketing Agency vs In-House: Which Is Right for Your Brand?', excerpt:'Deciding between an influencer marketing agency and building in-house? This complete guide cove...', photo:'../../assets/svc-brd-strategy.jpg', views:3, comments:0 },
  { cat:'Uncategorized', tag:'location', title:'Sydney Influencer Marketing: The Complete Brand Guide for Australia', excerpt:'Learn how brands run effective influencer marketing campaigns in Sydney and across...', photo:'../../assets/svc-inf-personal-brand.jpg', views:4, comments:0 },
  { cat:'Uncategorized', tag:'location', title:'Chicago Influencer Marketing: The Midwest Playbook', excerpt:'Why Chicago has become a quietly powerful hub for mid-market influencer programs...', photo:'../../assets/svc-brd-campaign.jpg', views:7, comments:1 },
  { cat:'Uncategorized', tag:'Platforms', tagAccent:true, title:'Tech Influencer Marketing in 2026: New Formats, New Buyers', excerpt:'B2B and consumer tech are both pivoting toward creator-led storytelling. Here is how...', photo:'../../assets/svc-inf-deal-flow.jpg', views:9, comments:2 },
];

function InsightsPage() {
  const [activeCat, setActiveCat] = React.useState('All Posts');
  return (
    <>
      <section className="lmg-blog-hero">
        <h1>Influencer Marketing Insights</h1>
        <p>Stay ahead of the curve with expert insights, industry trends, and actionable strategies for successful influencer marketing campaigns.</p>
      </section>

      <div className="lmg-blog-layout">
        <aside className="lmg-blog-side">
          <div className="lmg-side-card">
            <h4>Categories</h4>
            <ul>
              {BLOG_CATS.map(c => (
                <li key={c.n} className={activeCat === c.n ? 'active' : ''} onClick={() => setActiveCat(c.n)}>
                  <span className="dot" style={{ background: c.d }}></span>
                  <span className="nm">{c.n}</span>
                  <span className="ct">{c.c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lmg-subscribe-card">
            <h4>Stay Updated</h4>
            <p>Get the latest influencer marketing insights delivered to your inbox.</p>
            <input placeholder="Your email" />
            <button className="lmg-btn lmg-btn-primary">Subscribe</button>
          </div>
        </aside>

        <div>
          <div className="lmg-blog-search">
            <Icon name="search" size={16} />
            <input placeholder="Search articles..." />
            <span style={{ fontSize: 13, color: 'var(--fg-2)' }}>54 articles found</span>
          </div>
          <div className="lmg-blog-grid">
            {BLOG_POSTS.map((p, i) => (
              <article key={i} className="lmg-blog-card">
                <div className="lmg-blog-photo" style={{ backgroundImage: `url(${p.photo})` }}></div>
                <div className="lmg-blog-body">
                  <div className="lmg-blog-tags">
                    <span className="t">{p.cat}</span>
                    <span className={`t ${p.tagAccent ? 'accent' : ''}`}>{p.tag}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <div className="lmg-blog-foot">
                    <span className="author"><span className="av"></span> Anonymous</span>
                    <span className="stats">
                      <span><Icon name="eye" size={12} /> {p.views}</span>
                      <span><Icon name="message-circle" size={12} /> {p.comments}</span>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
window.InsightsPage = InsightsPage;
