const questions = [
  {
    n: '01',
    q: 'What does a win look like?',
    detail: 'Ask for their goals and success metrics — awareness, traffic, or conversions. Flags unrealistic expectations before they become your problem.',
  },
  {
    n: '02',
    q: 'How much creative freedom do I have?',
    detail: "The best partnerships let you apply what you know about your audience. A brand that scripts every word produces stiff content — and the flop lands on your feed.",
  },
  {
    n: '03',
    q: "What's the timeline?",
    detail: 'Concepts due, review window, post date, revision rounds. Far easier to ask for time before you say yes than to scramble after.',
  },
  {
    n: '04',
    q: 'Exactly what are the deliverables?',
    detail: 'How many posts, which platforms, what formats, any events or extras. This single question kills scope creep before it starts.',
  },
]

export default function BrandQuestions() {
  return (
    <div className="bq-wrap">
      <p className="bq-eyebrow">Four questions to ask every brand</p>
      <div className="bq-cards">
        {questions.map(item => (
          <div key={item.n} className="bq-card">
            <span className="bq-num">{item.n}</span>
            <strong className="bq-q">{item.q}</strong>
            <p className="bq-detail">{item.detail}</p>
          </div>
        ))}
      </div>
      <p className="bq-footer">Then get three more details before you commit: usage rights, compensation structure, and exclusivity. You don't price them yet — but you need them on the table now.</p>
    </div>
  )
}
