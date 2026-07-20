'use client'

import { useState, useId } from 'react'
import { calculateRate } from '@/lib/calculator-engine'
import type { Niche } from '@/lib/types/calculator'

const NICHES: { group: string; options: { value: Niche; label: string }[] }[] = [
  {
    group: 'Premium niches',
    options: [
      { value: 'finance',   label: 'Finance / Investing' },
      { value: 'b2b',       label: 'B2B / SaaS' },
      { value: 'tech',      label: 'Technology' },
      { value: 'health',    label: 'Health / Medical' },
    ],
  },
  {
    group: 'Standard niches',
    options: [
      { value: 'fitness',   label: 'Fitness' },
      { value: 'fashion',   label: 'Fashion' },
      { value: 'beauty',    label: 'Beauty' },
      { value: 'lifestyle', label: 'Lifestyle' },
    ],
  },
  {
    group: 'Entertainment niches',
    options: [
      { value: 'gaming',        label: 'Gaming' },
      { value: 'entertainment', label: 'Entertainment / Memes' },
    ],
  },
]

const ENGAGEMENT_TIERS = [
  { range: '2–3%', label: 'Average',   cls: 'avg' },
  { range: '3–5%', label: 'Good',      cls: 'good' },
  { range: '5%+',  label: 'Excellent', cls: 'exc' },
]

export default function RateCalculatorMini() {
  const uid = useId()

  const [followers,      setFollowers]      = useState(50000)
  const [engagementRate, setEngagementRate] = useState(4.0)
  const [niche,          setNiche]          = useState<Niche>('lifestyle')
  const [result,         setResult]         = useState<ReturnType<typeof calculateRate> | null>(null)
  const [open,           setOpen]           = useState(false) // engagement sub-calc

  // engagement sub-calc state
  const [likes,    setLikes]    = useState('')
  const [comments, setComments] = useState('')
  const [posts,    setPosts]    = useState('10')

  function handleCalculate() {
    const res = calculateRate({
      followers,
      engagementRate,
      niche,
      deliverables: [{ id: '1', platform: 'instagram', contentType: 'reel-standard', quantity: 1 }],
      usageType:           'organic',
      usageDuration:       30,
      hasWhitelisting:     false,
      exclusivityDays:     0,
      isLongTermPartnership: false,
      hasPaymentTerms:     true,
      revisionRounds:      2,
    })
    setResult(res)
  }

  function fillEngagementRate() {
    const l = Number(likes) || 0
    const c = Number(comments) || 0
    const p = Number(posts) || 1
    if (followers && p > 0) {
      const rate = ((l + c) / p / followers) * 100
      setEngagementRate(Number(rate.toFixed(2)))
      setOpen(false)
    }
  }

  const engTier = result?.engagementTier ?? null
  const tierLabel =
    engTier === 'excellent' ? 'Excellent engagement' :
    engTier === 'good'      ? 'Good engagement' :
    engTier === 'average'   ? 'Average engagement' :
    engTier === 'poor'      ? 'Below-average engagement' : null

  return (
    <div className="rcm">
      <p className="rcm-eyebrow">Your rate estimate</p>
      <p className="rcm-desc">
        Enter your account stats — get an honest rate estimate in seconds.
      </p>

      {/* Inputs */}
      <div className="rcm-fields">

        {/* Followers */}
        <div className="rcm-field">
          <label htmlFor={`${uid}-followers`} className="rcm-label">Followers</label>
          <input
            id={`${uid}-followers`}
            className="rcm-input"
            type="number"
            min={10000}
            max={500000}
            step={1000}
            value={followers}
            onChange={e => setFollowers(Math.max(1, parseInt(e.target.value) || 0))}
          />
        </div>

        {/* Engagement rate */}
        <div className="rcm-field">
          <label htmlFor={`${uid}-er`} className="rcm-label">Engagement rate</label>
          <div className="rcm-input-wrap">
            <input
              id={`${uid}-er`}
              className="rcm-input rcm-input--pct"
              type="number"
              min={0.1}
              max={30}
              step={0.1}
              value={engagementRate}
              onChange={e => setEngagementRate(parseFloat(e.target.value) || 0)}
            />
            <span className="rcm-pct-sign">%</span>
          </div>
          <div className="rcm-er-tiers">
            {ENGAGEMENT_TIERS.map(t => (
              <span key={t.cls} className={`rcm-er-tier rcm-er-tier--${t.cls}`}>
                {t.range} {t.label}
              </span>
            ))}
          </div>

          {/* Inline engagement sub-calculator */}
          <button
            type="button"
            className="rcm-sub-toggle"
            onClick={() => setOpen(v => !v)}
            aria-expanded={open}
          >
            {open ? '▲' : '▼'} Calculate from my posts
          </button>

          {open && (
            <div className="rcm-sub">
              <p className="rcm-sub-note">Add totals from your last 10–20 posts.</p>
              <div className="rcm-sub-grid">
                <div>
                  <label className="rcm-sub-label" htmlFor={`${uid}-likes`}>Total likes</label>
                  <input id={`${uid}-likes`}    className="rcm-input" type="number" placeholder="e.g. 5 000" value={likes}    onChange={e => setLikes(e.target.value)} />
                </div>
                <div>
                  <label className="rcm-sub-label" htmlFor={`${uid}-comments`}>Total comments</label>
                  <input id={`${uid}-comments`} className="rcm-input" type="number" placeholder="e.g. 250" value={comments} onChange={e => setComments(e.target.value)} />
                </div>
                <div>
                  <label className="rcm-sub-label" htmlFor={`${uid}-posts`}>Number of posts</label>
                  <input id={`${uid}-posts`}    className="rcm-input" type="number" placeholder="e.g. 10"  value={posts}    onChange={e => setPosts(e.target.value)} />
                </div>
              </div>
              <button type="button" className="rcm-sub-calc" onClick={fillEngagementRate}>
                Calculate &amp; fill
              </button>
            </div>
          )}
        </div>

        {/* Niche */}
        <div className="rcm-field">
          <label htmlFor={`${uid}-niche`} className="rcm-label">Your niche</label>
          <select
            id={`${uid}-niche`}
            className="rcm-input rcm-select"
            value={niche}
            onChange={e => setNiche(e.target.value as Niche)}
          >
            {NICHES.map(g => (
              <optgroup key={g.group} label={g.group}>
                {g.options.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>

      {/* CTA */}
      <button type="button" className="rcm-btn" onClick={handleCalculate}>
        Calculate my rate
      </button>

      {/* Result */}
      {result && (
        <div className="rcm-result">
          <div className="rcm-result-label">Estimated rate for 1 sponsored post</div>
          <div className="rcm-result-range">
            ${result.minRate.toLocaleString()} – ${result.maxRate.toLocaleString()}
          </div>
          <div className="rcm-result-rec">
            Recommended: <strong>${result.recommendedRate.toLocaleString()}</strong>
          </div>
          {tierLabel && (
            <span className={`rcm-tier-badge rcm-tier-badge--${engTier}`}>{tierLabel}</span>
          )}
          <div className="rcm-upsell">
            <p className="rcm-upsell-lead">This is your baseline from followers and engagement alone. The full rate calculator also handles:</p>
            <ul className="rcm-checklist">
              {[
                'Full campaign pricing — multiple deliverables, not just one post',
                'Usage rights (organic vs. paid, 30 days → perpetual)',
                'Whitelisting',
                'Exclusivity terms',
                'Red-flag detection on bad-deal terms',
                'Negotiation strategy — opening ask, walk-away, script',
                'Ready-to-send rate email template',
              ].map(item => (
                <li key={item} className="rcm-checklist-item"><span className="rcm-check">✓</span>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
