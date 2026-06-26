const steps = [
  {
    title: 'Build the list',
    guidance: 'Aim for 20–30 brands: ones you use and love, ones whose aesthetic matches your content, ones whose customers look like your audience.',
  },
  {
    title: 'Look wide, not just big',
    guidance: "See what similar creators already partner with. Don't overlook smaller or newer brands — they're often easier to start with and can grow long-term.",
  },
  {
    title: 'Research each one',
    guidance: "Their recent campaigns, latest launches, who makes partnership decisions. Specifics are what separate a real pitch from a generic one.",
  },
  {
    title: 'Warm them up first',
    guidance: "Engage genuinely before you pitch — thoughtful comments, sharing their content, tagging them when you use the product. By the time you reach out, you're not a stranger.",
  },
]

export default function OutreachSteps() {
  return (
    <div className="os-wrap">
      <p className="os-eyebrow">Four moves for direct outreach</p>
      <ol className="os-list">
        {steps.map((s, i) => (
          <li key={s.title} className="os-step">
            <span className="os-num">{i + 1}</span>
            <div className="os-body">
              <strong className="os-title">{s.title}</strong>
              <p className="os-guidance">{s.guidance}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
