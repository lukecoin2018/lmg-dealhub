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
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Calculate Rate', href: '/calculator', icon: Calculator },
  { name: 'Negotiate', href: '/negotiate', icon: MessageSquare },
  { name: 'Contracts', href: '/contracts', icon: FileText },
  { name: 'Deals', href: '/deals', icon: Briefcase },
  { name: 'Brands', href: '/brands', icon: Building2 },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full w-64 bg-[var(--color-bg-secondary)] border-r border-[var(--color-border)]">
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-[var(--color-border)]">
        <h1 className="text-xl font-bold">
          <span className="text-brand-yellow">Deal</span>
          <span className="text-brand-pink">Hub</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all
                ${isActive
                  ? 'bg-brand-yellow text-black'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-primary)] hover:text-[var(--color-text-primary)]'
                }
              `}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}