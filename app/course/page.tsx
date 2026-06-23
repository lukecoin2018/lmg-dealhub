import Link from 'next/link'
import { BookOpen, PenLine } from 'lucide-react'

const modules = [
  { n: 1,  title: 'The Partnership Landscape' },
  { n: 2,  title: 'Finding & Attracting Brands' },
  { n: 3,  title: 'Vetting Opportunities' },
  { n: 4,  title: 'Know Your Worth (Pricing)' },
  { n: 5,  title: 'The Perfect Pitch' },
  { n: 6,  title: 'Negotiating Like a Pro' },
  { n: 7,  title: 'Contracts & Legal' },
  { n: 8,  title: 'Delivering Results & Reporting' },
  { n: 9,  title: 'Building Long-Term Partnerships' },
  { n: 10, title: 'Protect & Scale (Capstone)' },
]

export default function CoursePage() {
  return (
    <div className="flex-1 overflow-y-auto">
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">
          The Complete Brand Partnership Playbook
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          10 modules · Free &amp; open access · Each module includes an Ebook and interactive Workbook
        </p>
      </div>

      <div className="space-y-3">
        {modules.map(({ n, title }) => (
          <div
            key={n}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5 flex items-center gap-5"
          >
            <span className="text-2xl font-bold text-[#FFD700] w-8 shrink-0">{n}</span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[var(--color-text-primary)] truncate">{title}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Link
                href={`/course/module-${n}-ebook`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-[#FF4D94]/10 text-[#FF4D94] hover:bg-[#FF4D94]/20 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Ebook
              </Link>
              <Link
                href={`/course/module-${n}-workbook`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-[#FFD700]/10 text-[#FFD700] hover:bg-[#FFD700]/20 transition-colors"
              >
                <PenLine className="w-4 h-4" />
                Workbook
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}
