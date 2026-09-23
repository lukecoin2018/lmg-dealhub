import LessonLayout from '@/components/course/LessonLayout'
import { module1 } from '@/lib/course/moduleData'

export const metadata = {
  title: 'Module 1 — The Partnership Landscape · LMG Media',
  description: 'Every way creators get paid, what sets your rates, and your honest baseline — Module 1 of the Brand Partnership Playbook.',
}

export default function Module1Page() {
  return <LessonLayout data={module1} />
}
