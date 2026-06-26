const questions = [
  {
    q: 'Does it align with my values and content style?',
    hint: 'Would my audience be surprised to see me promoting this? Surprise is a red flag.',
    dealBreaker: true,
  },
  {
    q: 'Can I authentically recommend the product?',
    hint: "Ideally you already use and love it. If you wouldn't spend your own money on it, decline — whatever the fee.",
    dealBreaker: true,
  },
  {
    q: 'Would my audience genuinely benefit?',
    hint: 'Audiences can always tell the difference between genuine enthusiasm and a paycheck.',
    dealBreaker: false,
  },
  {
    q: 'Does it fit my long-term brand?',
    hint: 'Every deal shapes how brands and audiences see you. Ask whether this moves you toward where you want to be in three years.',
    dealBreaker: false,
  },
  {
    q: "Am I comfortable with the whole company?",
    hint: "You're endorsing the business, not just the product. Search the company name + \"controversy\" before you attach your name to it.",
    dealBreaker: false,
  },
]

export default function SelfQuestions() {
  return (
    <div className="sq-wrap">
      <p className="sq-eyebrow">Five questions — run before you reply</p>
      <ol className="sq-list">
        {questions.map((item, i) => (
          <li key={i} className={`sq-item${item.dealBreaker ? ' sq-item--db' : ''}`}>
            <div className="sq-left">
              <span className="sq-num">{i + 1}</span>
              {item.dealBreaker && <span className="sq-db-badge">Deal-breaker</span>}
            </div>
            <div className="sq-body">
              <strong className="sq-q">{item.q}</strong>
              <p className="sq-hint">{item.hint}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="sq-footer">Fail either of the first two and it's a no — regardless of the fee.</p>
    </div>
  )
}
