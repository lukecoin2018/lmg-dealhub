const MODULES = [
  { number: 1,  title: 'The Partnership Landscape' },
  { number: 2,  title: 'Finding & Attracting Brands' },
  { number: 3,  title: 'Vetting Opportunities' },
  { number: 4,  title: 'Setting Your Rates' },
  { number: 5,  title: 'Pitching That Gets Replies' },
  { number: 6,  title: 'Negotiating With Confidence' },
  { number: 7,  title: 'Contracts & Disclosure' },
  { number: 8,  title: 'Delivery & Reporting' },
  { number: 9,  title: 'Ambassadorships & Retainers' },
  { number: 10, title: 'Reputation & Longevity' },
]

interface CourseRoadmapProps {
  currentModule: number
}

export default function CourseRoadmap({ currentModule }: CourseRoadmapProps) {
  return (
    <div className="roadmap">
      <p className="roadmap-eyebrow">The Brand Partnership Playbook · 10 modules</p>
      <ol className="roadmap-list">
        {MODULES.map(m => {
          const isCurrent = m.number === currentModule
          const isPast    = m.number < currentModule
          return (
            <li
              key={m.number}
              className={`roadmap-item${isCurrent ? ' roadmap-item--current' : ''}${isPast ? ' roadmap-item--past' : ''}`}
            >
              <span className="roadmap-num">{String(m.number).padStart(2, '0')}</span>
              <span className="roadmap-title">{m.title}</span>
              {isCurrent && <span className="roadmap-badge">You are here</span>}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
