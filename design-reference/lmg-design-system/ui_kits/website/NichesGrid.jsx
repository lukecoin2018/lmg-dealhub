/* global React, Eyebrow */
const NICHES = [
  { id: 'lifestyle', label: 'Lifestyle', accent: 'yellow', icon: 'sparkles', tag: '+820 creators' },
  { id: 'fashion', label: 'Fashion', accent: 'pink', icon: 'shirt', tag: '+540' },
  { id: 'luxury', label: 'Luxury', accent: 'dark', icon: 'gem', tag: '+210' },
  { id: 'travel', label: 'Travel', accent: 'blue', icon: 'plane', tag: '+390' },
  { id: 'wellness', label: 'Wellness', accent: 'yellow', icon: 'leaf', tag: '+470' },
  { id: 'fitness', label: 'Fitness & Health', accent: 'pink', icon: 'dumbbell', tag: '+330' },
  { id: 'ai', label: 'AI Influencers', accent: 'blue', icon: 'cpu', tag: '+45' },
];

function NichesGrid({ active, onPick }) {
  return (
    <section className="lmg-section lmg-section-alt" id="niches">
      <div className="lmg-container">
        <div className="lmg-section-head">
          <Eyebrow>Verticals</Eyebrow>
          <h2>A curated roster across seven niches.</h2>
          <p>Every creator in our network is hand-vetted for audience quality, engagement, and brand alignment.</p>
        </div>
        <div className="lmg-niche-grid">
          {NICHES.map(n => (
            <button
              key={n.id}
              className={`lmg-niche-tile lmg-niche-tile--${n.accent} ${active === n.id ? 'active' : ''}`}
              onClick={() => onPick(n.id === active ? null : n.id)}
            >
              <div className="ico"><Icon name={n.icon} size={22} /></div>
              <div className="lbl">{n.label}</div>
              <div className="tag">{n.tag}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
window.NichesGrid = NichesGrid;
window.NICHES = NICHES;
