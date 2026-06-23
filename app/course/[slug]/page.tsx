import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

const ALLOWED_SLUGS = new Set([
  'module-1-ebook', 'module-1-workbook',
  'module-2-ebook', 'module-2-workbook',
  'module-3-ebook', 'module-3-workbook',
  'module-4-ebook', 'module-4-workbook',
  'module-5-ebook', 'module-5-workbook',
  'module-6-ebook', 'module-6-workbook',
  'module-7-ebook', 'module-7-workbook',
  'module-8-ebook', 'module-8-workbook',
  'module-9-ebook', 'module-9-workbook',
  'module-10-ebook', 'module-10-workbook',
])

export async function generateStaticParams() {
  return Array.from(ALLOWED_SLUGS).map((slug) => ({ slug }))
}

export default async function CourseDocPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!ALLOWED_SLUGS.has(slug)) {
    notFound()
  }

  const label = slug
    .replace('module-', 'Module ')
    .replace('-ebook', ' — Ebook')
    .replace('-workbook', ' — Workbook')

  return (
    // flex-1: fills the remaining height below the course layout's brand header
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Sub-nav: back link + doc label */}
      <div className="shrink-0 flex items-center h-10 px-4 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
        <Link
          href="/course"
          className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Course
        </Link>
        <span className="ml-4 text-sm text-[var(--color-text-secondary)]">{label}</span>
      </div>
      {/* iframe src points at the route handler — never a /public path */}
      <iframe
        src={`/api/course/${slug}`}
        className="flex-1 w-full border-0"
        title={label}
        // allow-same-origin is required for localStorage to work inside the document
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation-by-user-activation"
      />
    </div>
  )
}
