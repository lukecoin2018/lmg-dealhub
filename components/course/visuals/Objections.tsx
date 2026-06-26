const objections = [
  {
    say: '"That\'s above our budget."',
    respond: 'Trade, don\'t drop: "Let\'s look at what we can adjust — deliverables, usage window, or exclusivity."',
    flag: null,
  },
  {
    say: '"Other creators charge way less."',
    respond: 'Educate: "Engagement and fit vary widely. My rate reflects 6.8% engagement and an audience that\'s 82% your demographic."',
    flag: null,
  },
  {
    say: '"We can only do $X maximum."',
    respond: 'At or above floor? Accept — but ask for something back. Below floor? Trade scope. Won\'t work? Walk, politely.',
    flag: null,
  },
  {
    say: '"Can you be flexible on price?"',
    respond: 'Reframe: "I\'m flexible on scope, timing, and usage. What matters most to you, so we find a structure that works?"',
    flag: null,
  },
  {
    say: '"We\'re offering great exposure."',
    respond: 'Polite and firm: "Exposure isn\'t a currency I can pay rent with. Professional brands compensate fairly."',
    flag: 'red-flag',
  },
  {
    say: '"That\'s our standard rate, take it or leave it."',
    respond: 'Call it gently: "If there\'s no room on price, can we look at scope to find a fit?"',
    flag: null,
  },
  {
    say: '"I\'ll get back to you." → then silence.',
    respond: 'Wait 3–5 days, follow up warmly. One final nudge a week later, then stop. Revisit in a few months.',
    flag: 'stall',
  },
]

export default function Objections() {
  return (
    <div className="obj-wrap">
      <p className="obj-eyebrow">The seven objections — and how to meet each one</p>
      <div className="obj-table">
        <div className="obj-header">
          <span className="obj-col-head obj-col-say">What they say</span>
          <span className="obj-col-head obj-col-respond">How you respond</span>
        </div>
        {objections.map((o, i) => (
          <div key={i} className={`obj-row${o.flag === 'red-flag' ? ' obj-row--redflag' : o.flag === 'stall' ? ' obj-row--stall' : ''}`}>
            <div className="obj-say">
              {o.flag === 'red-flag' && <span className="obj-flag obj-flag--red">Red flag</span>}
              {o.flag === 'stall' && <span className="obj-flag obj-flag--stall">Stall</span>}
              <span className="obj-say-text">{o.say}</span>
            </div>
            <div className="obj-respond">
              <span className="obj-respond-text">{o.respond}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="obj-footer">Read these out loud before your next call. Sounding unbothered is half the battle.</p>
    </div>
  )
}
