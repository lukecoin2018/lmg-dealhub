'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Calculator,
  MessageSquare,
  FileText,
  Briefcase,
  Building2,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useSidebar } from '@/contexts/SidebarContext'

const toolNav = [
  { name: 'Dashboard',     href: '/dashboard',  icon: LayoutDashboard },
  { name: 'Calculate Rate',href: '/calculator', icon: Calculator },
  { name: 'Negotiate',     href: '/negotiate',  icon: MessageSquare },
  { name: 'Contracts',     href: '/contracts',  icon: FileText },
  { name: 'Deals',         href: '/deals',      icon: Briefcase },
  { name: 'Brands',        href: '/brands',     icon: Building2 },
]

const courseNav = [
  { name: 'Course', href: '/course', icon: BookOpen },
]

export interface SidebarCourseModule {
  number: number
  slug: string
  title: string
  segmentIds: string[]
}

interface Promo {
  href: string
  label: string
  title: string
  desc: string
  cta: string
}

const MODULE_1_PROMO: Promo = {
  href: '/course/module-1',
  label: 'Module 1 · Free',
  title: 'The Partnership Landscape',
  desc: 'Start the Brand Partnership Playbook — the course builds in order.',
  cta: 'Enter Module 1',
}

// Same per-browser store the lesson pages write (components/course/LessonLayout.tsx):
// `lmg-lesson-progress-v1-{slug}` → { segmentId: boolean }.
const PROGRESS_KEY_PREFIX = 'lmg-lesson-progress-v1-'

function nextModulePromo(modules: SidebarCourseModule[]): Promo {
  const next = modules.find(m => {
    try {
      const raw = localStorage.getItem(PROGRESS_KEY_PREFIX + m.slug)
      const done: Record<string, boolean> = raw ? JSON.parse(raw) : {}
      return !m.segmentIds.every(id => done[id])
    } catch {
      return true
    }
  })

  if (!next) {
    return {
      href: '/course',
      label: 'Course complete',
      title: 'The Brand Partnership Playbook',
      desc: 'All ten modules done. Revisit any of them whenever you need to.',
      cta: 'Back to the course',
    }
  }
  if (next.number === 1) return MODULE_1_PROMO
  return {
    href: `/course/${next.slug}`,
    label: `Module ${next.number} · Up next`,
    title: next.title,
    desc: 'Continue the Brand Partnership Playbook — the course builds in order.',
    cta: `Enter Module ${next.number}`,
  }
}

export default function Sidebar({ courseModules = [] }: { courseModules?: SidebarCourseModule[] }) {
  const pathname = usePathname()
  const { collapsed, toggle } = useSidebar()
  const [promo, setPromo] = useState<Promo>(MODULE_1_PROMO)
  // Below 900px the sidebar is always the icon rail (styles/app-shell.css)
  const [narrow, setNarrow] = useState(false)

  useEffect(() => {
    if (courseModules.length) setPromo(nextModulePromo(courseModules))
  }, [courseModules])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)')
    const update = () => setNarrow(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const iconsOnly = collapsed || narrow

  function NavLink({ name, href, icon: Icon }: { name: string; href: string; icon: React.ElementType }) {
    const isActive = pathname === href || pathname.startsWith(href + '/')
    return (
      <Link
        href={href}
        title={iconsOnly ? name : undefined}
        aria-current={isActive ? 'page' : undefined}
        className={`app-nav__link ${isActive ? 'app-nav__link--active' : ''}`}
      >
        <Icon aria-hidden="true" />
        <span className="app-nav__text">{name}</span>
      </Link>
    )
  }

  return (
    <aside className={`app-sidebar ${collapsed ? 'app-sidebar--collapsed' : ''}`}>
      <div className="app-sidebar__top">
        <button
          onClick={toggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="app-sidebar__toggle"
        >
          {collapsed ? <ChevronRight aria-hidden="true" /> : <ChevronLeft aria-hidden="true" />}
        </button>
      </div>

      <nav className="app-nav" aria-label="App">
        <p className="app-nav__label">Workspace</p>
        {toolNav.map(item => (
          <NavLink key={item.href} {...item} />
        ))}
        <div className="app-nav__divider" />
        <p className="app-nav__label">Learn</p>
        {courseNav.map(item => (
          <NavLink key={item.href} {...item} />
        ))}
      </nav>

      <Link className="app-promo" href={promo.href}>
        <span className="app-promo__label">{promo.label}</span>
        <span className="app-promo__title">{promo.title}</span>
        <span className="app-promo__desc">{promo.desc}</span>
        <span className="app-promo__cta">{promo.cta} →</span>
      </Link>
    </aside>
  )
}
