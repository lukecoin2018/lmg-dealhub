/* global React, useApp, Button, Icon */
function Hero() {
  const { setModal } = useApp();
  return (
    <section className="lmg-hero">
      <div className="lmg-hero-bg" />
      <div className="lmg-hero-fade" />
      <div className="lmg-hero-inner">
        <h1 className="lmg-display-1">
          Where Quality Brands<br />Meet <span className="lmg-accent-yellow">Iconic</span> <span className="lmg-accent-pink">Influence</span>
        </h1>
        <p className="lmg-hero-sub">
          Connecting visionary brands with influential voices in lifestyle,<br />
          luxury, fashion, wellness and travel
        </p>
        <div className="lmg-hero-stat">
          <div className="num">35.6%</div>
          <div className="lbl">YoY Growth</div>
        </div>
        <div className="lmg-hero-ctas">
          <Button variant="primary" size="lg" iconRight="arrow-right" onClick={() => setModal('brand')}>Start Your Campaign</Button>
          <Button variant="blue" size="lg" iconRight="users" onClick={() => setModal('influencer')}>Join as Influencer</Button>
        </div>
        <div className="lmg-hero-stats">
          <div className="lmg-inline-stat blue"><Icon name="trending-up" /> <span><b>86%</b> Consumer Influence Rate</span></div>
          <div className="lmg-inline-stat pink"><Icon name="play" /> <span><b>TikTok 18%</b> Engagement</span></div>
          <div className="lmg-inline-stat yellow"><Icon name="users" /> <span><b>10K-1M</b> Follower Range</span></div>
        </div>
      </div>
    </section>
  );
}
window.Hero = Hero;
