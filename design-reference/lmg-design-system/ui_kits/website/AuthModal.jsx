/* global React, useApp, Button, Field, Icon, Eyebrow */
const { useState: useStateA, useEffect: useEffectA } = React;

function AuthModal() {
  const { modal, setModal, showToast } = useApp();
  const [tab, setTab] = useStateA('brand');
  useEffectA(() => { if (modal) setTab(modal); }, [modal]);
  if (!modal) return null;
  const submit = (e) => {
    e.preventDefault();
    setModal(null);
    showToast(tab === 'brand'
      ? 'Thanks — a partnerships lead will be in touch within 1 business day.'
      : 'Thanks — our talent team will review your application this week.');
  };
  return (
    <div className="lmg-modal-overlay" onClick={(e) => e.target === e.currentTarget && setModal(null)}>
      <div className="lmg-modal">
        <button className="lmg-modal-close" onClick={() => setModal(null)} aria-label="Close"><Icon name="x" size={18} /></button>
        <div className="lmg-modal-head">
          <Eyebrow>{tab === 'brand' ? 'For Brands' : 'For Influencers'}</Eyebrow>
          <h2>{tab === 'brand' ? 'Start your campaign' : 'Join the LMG roster'}</h2>
          <p>{tab === 'brand' ? 'Tell us about your brand and goals — we’ll match you with the right creators.' : 'Apply in two minutes. Our talent team reviews every application personally.'}</p>
        </div>
        <div className="lmg-modal-tabs">
          <button className={tab === 'brand' ? 'active' : ''} onClick={() => setTab('brand')}>Brand / Advertiser</button>
          <button className={tab === 'influencer' ? 'active' : ''} onClick={() => setTab('influencer')}>Influencer / Creator</button>
        </div>
        <form className="lmg-modal-form" onSubmit={submit}>
          {tab === 'brand' ? (
            <>
              <Field label="Your name"><input className="lmg-input" required placeholder="Alex Rivera" /></Field>
              <Field label="Work email"><input className="lmg-input" required type="email" placeholder="alex@brand.com" /></Field>
              <Field label="Brand / Company"><input className="lmg-input" required placeholder="Maison Étoile" /></Field>
              <Field label="Campaign budget">
                <select className="lmg-select">
                  <option>$25k – $50k</option><option>$50k – $150k</option><option>$150k – $500k</option><option>$500k +</option>
                </select>
              </Field>
              <Field label="Goals"><textarea className="lmg-textarea" placeholder="Audience, timing, KPIs…" /></Field>
              <Button variant="primary" size="lg" type="submit" iconRight="arrow-right">Submit brief</Button>
            </>
          ) : (
            <>
              <Field label="Name"><input className="lmg-input" required placeholder="Iris Castel" /></Field>
              <Field label="Email"><input className="lmg-input" required type="email" placeholder="iris@gmail.com" /></Field>
              <Field label="Primary handle"><input className="lmg-input" required placeholder="@iris.styles" /></Field>
              <Field label="Niche">
                <select className="lmg-select">
                  <option>Lifestyle</option><option>Fashion</option><option>Luxury</option><option>Travel</option><option>Wellness</option><option>Fitness</option><option>AI</option>
                </select>
              </Field>
              <Field label="Follower count">
                <select className="lmg-select">
                  <option>10K – 50K</option><option>50K – 250K</option><option>250K – 1M</option><option>1M +</option>
                </select>
              </Field>
              <Button variant="secondary" size="lg" type="submit" iconRight="arrow-right">Apply now</Button>
            </>
          )}
          <p className="lmg-modal-fine">By submitting, you agree to LMG Media’s Terms &amp; Privacy Policy.</p>
        </form>
      </div>
    </div>
  );
}
window.AuthModal = AuthModal;
