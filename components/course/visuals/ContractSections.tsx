const foundation = [
  {
    num: 1,
    label: 'Parties & Scope',
    tag: 'Required',
    tagVariant: 'required',
    detail: 'Who\'s in the contract — signing as an individual vs. a business entity changes your legal exposure. Personal name = personal assets on the line.',
  },
  {
    num: 2,
    label: 'Deliverables & Timeline',
    tag: 'Required',
    tagVariant: 'required',
    detail: 'Your scope-creep shield. Platform, count, type, due date, specs, approval cadence, and a minimum days-live (30 standard) so they can\'t pull a post early.',
  },
  {
    num: 3,
    label: 'Payment Terms',
    tag: 'Required',
    tagVariant: 'required',
    detail: '50% upfront for new brands, Net 30, 1.5%/month late fee. Payment method in writing.',
  },
  {
    num: 4,
    label: 'Usage Rights & Licensing',
    tag: 'Critical',
    tagVariant: 'critical',
    detail: 'Duration (1 year default; perpetual = 2–3× rate), platform, organic-vs-paid. Never "general marketing purposes." You keep ownership — they get a license.',
  },
]

const protective = [
  {
    num: 5,
    label: 'Revisions & Approvals',
    tag: 'Required',
    tagVariant: 'required',
    detail: '2–3 rounds standard. Define what counts: a caption tweak is a revision; reshooting a Reel is new work, billed separately.',
  },
  {
    num: 6,
    label: 'Exclusivity Terms',
    tag: 'Optional',
    tagVariant: 'optional',
    detail: 'Never free. Specific competitor categories, capped period. Price per Module 4.',
  },
  {
    num: 7,
    label: 'Kill Fee & Termination',
    tag: 'Optional',
    tagVariant: 'optional',
    detail: 'The one creators forget until they need it. 25–50% if cancelled after work begins; 100% after delivery. Include on anything over a few hundred dollars.',
  },
  {
    num: 8,
    label: 'FTC Compliance & Disclosures',
    tag: 'Required',
    tagVariant: 'required',
    detail: 'Non-negotiable. A brand may try to soften this — don\'t let them. The fines fall on you, not them.',
  },
]

export default function ContractSections() {
  return (
    <div className="cs-wrap">
      <p className="cs-eyebrow">Eight sections — each guarding against a specific way creators get burned</p>

      <div className="cs-group">
        <div className="cs-group-label cs-group-label--foundation">
          <span className="cs-group-nums">1–4</span>
          Foundation
        </div>
        <div className="cs-rows">
          {foundation.map(s => (
            <div key={s.num} className={`cs-row cs-row--${s.tagVariant}`}>
              <div className="cs-row-left">
                <span className="cs-row-num">{s.num}</span>
                <span className={`cs-tag cs-tag--${s.tagVariant}`}>{s.tag}</span>
              </div>
              <div className="cs-row-body">
                <strong className="cs-row-label">{s.label}</strong>
                <p className="cs-row-detail">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cs-group cs-group--protective">
        <div className="cs-group-label cs-group-label--protective">
          <span className="cs-group-nums">5–8</span>
          Protective layers
        </div>
        <div className="cs-rows">
          {protective.map(s => (
            <div key={s.num} className={`cs-row cs-row--${s.tagVariant}`}>
              <div className="cs-row-left">
                <span className="cs-row-num">{s.num}</span>
                <span className={`cs-tag cs-tag--${s.tagVariant}`}>{s.tag}</span>
              </div>
              <div className="cs-row-body">
                <strong className="cs-row-label">{s.label}</strong>
                <p className="cs-row-detail">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="cs-footer">You keep ownership — they get a license. That one line is the difference between renting your work and giving it away.</p>
    </div>
  )
}
