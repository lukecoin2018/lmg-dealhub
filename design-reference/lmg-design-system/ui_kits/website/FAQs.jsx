/* global React, Eyebrow, Icon */
const FAQS = [
  { q: 'Why do brands partner with influencers?', a: 'Influencers bring trusted, audience-aligned voice that paid media cannot replicate. The right creator drives measurable lift in awareness, consideration, and conversion.' },
  { q: 'How do you find influencers?', a: 'A combination of AI-powered vetting (audience demographics, engagement quality, brand-safety) and human curation by our talent partnerships team.' },
  { q: 'What is a micro influencer?', a: 'A creator with roughly 10K–50K followers. Micro-influencers typically have higher engagement rates and tightly-defined niche audiences.' },
  { q: 'What is a macro influencer?', a: 'A creator with 500K–1M+ followers — broader reach, premium pricing, and larger production requirements.' },
  { q: 'How do I best hire influencers?', a: 'Work with an agency that vets audience quality, negotiates fair contracts, and measures performance against pre-agreed KPIs — not surface metrics.' },
  { q: 'Why work with an influencer agency?', a: 'You get strategic match-making, contractual & legal protection, and unified reporting across all creators — without standing up an in-house team.' },
];

const { useState: useStateF } = React;
function FAQs() {
  const [open, setOpen] = useStateF(0);
  return (
    <section className="lmg-section lmg-section-alt" id="faq">
      <div className="lmg-container lmg-container--narrow">
        <div className="lmg-section-head">
          <Eyebrow>FAQs</Eyebrow>
          <h2>Common questions.</h2>
        </div>
        <div className="lmg-faq">
          {FAQS.map((f, i) => (
            <div key={i} className={`lmg-faq-item ${open === i ? 'open' : ''}`}>
              <button className="lmg-faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{f.q}</span>
                <Icon name={open === i ? 'minus' : 'plus'} size={18} />
              </button>
              {open === i && <div className="lmg-faq-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.FAQs = FAQs;
