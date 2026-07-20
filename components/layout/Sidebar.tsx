'use client'

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

export default function Sidebar() {
  const pathname = usePathname()
  const { collapsed, toggle } = useSidebar()

  const w = collapsed ? 'w-[64px]' : 'w-64'

  function NavLink({ name, href, icon: Icon }: { name: string; href: string; icon: React.ElementType }) {
    const isActive = pathname === href || pathname.startsWith(href + '/')
    return (
      <Link
        href={href}
        title={collapsed ? name : undefined}
        className={`
          relative flex items-center rounded-lg transition-all duration-150 group
          ${collapsed ? 'justify-center px-0 py-3' : 'px-4 py-3'}
          ${isActive
            ? 'bg-brand-pink text-white'
            : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-primary)] hover:text-[var(--color-text-primary)]'
          }
        `}
      >
        <Icon className={`shrink-0 w-5 h-5 ${collapsed ? '' : 'mr-3'}`} />
        {!collapsed && <span className="text-sm font-medium truncate">{name}</span>}
        {/* Tooltip for collapsed state */}
        {collapsed && (
          <span className="
            pointer-events-none absolute left-full ml-2 z-50
            whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium
            bg-[var(--color-text-primary)] text-[var(--color-bg-primary)]
            opacity-0 group-hover:opacity-100 transition-opacity duration-150
          ">
            {name}
          </span>
        )}
      </Link>
    )
  }

  return (
    <div
      className={`
        flex flex-col h-full shrink-0 ${w}
        bg-[var(--color-bg-secondary)] border-r border-[var(--color-border)]
        transition-[width] duration-200 overflow-hidden
      `}
    >
      {/* Logo + toggle */}
      <div className={`flex items-center h-16 border-b border-[var(--color-border)] ${collapsed ? 'justify-center px-2' : 'px-4'}`}>
        {!collapsed && (
          <h1
            className="text-3xl font-bold flex-1 truncate"
            style={{ fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)', textShadow: '0 1px 3px rgba(28,25,23,0.18)' }}
          >
            <span className="text-brand-pink">Deal</span>
            <span className="text-brand-yellow">Hub</span>
          </h1>
        )}
        <button
          onClick={toggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="shrink-0 p-1.5 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-primary)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Tool nav + course link */}
      <nav className={`flex-1 py-4 flex flex-col gap-0.5 ${collapsed ? 'px-2' : 'px-3'}`}>
        {toolNav.map(item => (
          <NavLink key={item.href} {...item} />
        ))}
        <div className="border-t border-[var(--color-border)] my-2" />
        {courseNav.map(item => (
          <NavLink key={item.href} {...item} />
        ))}
      </nav>
    </div>
  )
}
