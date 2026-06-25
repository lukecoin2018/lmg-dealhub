/* global React, useApp, Button, Eyebrow, Icon */
const SVC_DATA = {
  brand: [
    {
      photo: '../../assets/svc-brd-strategy.jpg',
      icon: 'target',
      title: 'Influencer Marketing Strategy',
      desc: 'Develop data-driven strategies that identify the perfect creators for your brand. We analyze audience demographics, engagement patterns, and content alignment to ensure maximum campaign impact and authentic brand partnerships.',
      features: ['Data-driven influencer identification and vetting', 'Comprehensive audience demographic analysis', 'Platform strategy and channel optimization'],
      more: 2,
    },
    {
      photo: '../../assets/svc-brd-partnership.jpg',
      icon: 'handshake',
      title: 'Brand Partnership Development',
      desc: 'Build long-term, mutually beneficial relationships with top-tier influencers. Our team facilitates partnership opportunities, negotiates favorable terms, and manages ongoing collaborations that deliver consistent value for your brand.',
      features: ['Strategic partnership opportunity identification', 'Professional negotiation and contract structuring', 'Ongoing relationship management and support'],
      more: 2,
    },
    {
      photo: '../../assets/svc-brd-campaign.jpg',
      icon: 'settings',
      title: 'Campaign Management',
      desc: 'From concept to completion, we handle every aspect of your influencer campaigns. Our end-to-end management includes creator outreach, content approval, performance tracking, and detailed reporting to ensure seamless execution and measurable results.',
      features: ['End-to-end campaign execution and coordination', 'Professional influencer outreach and negotiation', 'Content review and brand guideline compliance'],
      more: 2,
    },
  ],
  influencer: [
    {
      photo: '../../assets/svc-inf-deal-flow.jpg',
      icon: 'briefcase',
      title: 'Brand Opportunities and Deal Flow',
      desc: 'Gain exclusive access to premium brand partnerships tailored to your niche and audience. We connect you with quality brands seeking authentic collaborations, negotiate competitive rates, and ensure a steady pipeline of opportunities that align with your personal brand.',
      features: ['Exclusive access to premium brand partnerships', 'Personalized opportunity matching and curation', 'Competitive rate negotiation on your behalf'],
      more: 2,
    },
    {
      photo: '../../assets/svc-inf-personal-brand.jpg',
      icon: 'sparkles',
      title: 'Personal Brand Development',
      desc: 'Elevate your creator business with strategic brand positioning and growth planning. We help you define your unique value proposition, optimize your content strategy, and develop a cohesive brand identity that attracts premium partnerships and expands your influence.',
      features: ['Strategic brand positioning and identity development', 'Unique value proposition definition', 'Content strategy optimization and planning'],
      more: 2,
    },
    {
      photo: '../../assets/svc-inf-production.jpg',
      icon: 'video',
      title: 'Creative and Production Support',
      desc: 'Access professional creative direction and production resources to enhance your content quality. From concept development to post-production, we provide the tools and expertise needed to create standout content that captivates your audience and exceeds brand expectations.',
      features: ['Professional creative direction and concept development', 'High-quality production resources and support', 'Content editing and post-production services'],
      more: 2,
    },
  ],
};

function ServicesList() {
  const [tab, setTab] = React.useState('influencer');
  const items = SVC_DATA[tab];
  return (
    <section className="lmg-section" id="services">
      <div className="lmg-container">
        <div className="lmg-section-head">
          <span className={`lmg-pill-tab lmg-pill-tab--${tab}`}>{tab === 'brand' ? 'For Brands' : 'For Influencers'}</span>
          <h2>
            {tab === 'brand' ? 'Our Most Requested Brand Services' : 'Our Most Requested Influencer Services'}
          </h2>
          <p>
            {tab === 'brand'
              ? 'Everything you need to run high-performing influencer campaigns with measurable ROI.'
              : 'Everything you need to build a sustainable creator business and maximize your earning potential.'}
          </p>
        </div>
        <div className="lmg-aud-toggle">
          <button className={tab === 'influencer' ? 'active influencer' : ''} onClick={() => setTab('influencer')}>For Influencers</button>
          <button className={tab === 'brand' ? 'active brand' : ''} onClick={() => setTab('brand')}>For Brands</button>
        </div>
        <div className="lmg-svc-grid">
          {items.map((s, i) => (
            <article key={i} className={`lmg-svc-card audience-${tab === 'brand' ? 'brand' : 'influencer'}`}>
              <div className="lmg-svc-photo" style={{ backgroundImage: `url(${s.photo})` }}>
                <span className="lmg-pill">{tab === 'brand' ? 'For Brands' : 'For Influencers'}</span>
              </div>
              <div className="lmg-svc-body">
                <div className="lmg-svc-head">
                  <div className="lmg-svc-badge"><Icon name={s.icon} size={22} /></div>
                  <h3 className="lmg-svc-title">{s.title}</h3>
                </div>
                <p className="lmg-svc-desc">{s.desc}</p>
                <div className="lmg-svc-features">
                  <div className="lbl">Key Features:</div>
                  <ul>
                    {s.features.map((f, j) => <li key={j}>{f}</li>)}
                  </ul>
                </div>
                <a href="#" className="lmg-svc-more">+{s.more} more features</a>
                <div className="lmg-svc-ctas">
                  <button className="lmg-btn lmg-btn-primary"><span>Learn More</span><Icon name="arrow-right" size={16} /></button>
                  <button className="lmg-btn lmg-btn-outline">{tab === 'brand' ? 'Get Quote' : 'Apply Now'}</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
window.ServicesList = ServicesList;
