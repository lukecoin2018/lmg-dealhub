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
  LogOut
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="flex flex-col h-full w-64 bg-bg-secondary border-r border-border-color">
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-border-color">
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
                  : 'text-text-secondary hover:bg-bg-primary hover:text-text-primary'
                }
              `}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Sign Out */}
      <div className="px-4 py-4 border-t border-border-color">
        <button
          onClick={handleSignOut}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-text-secondary hover:bg-bg-primary hover:text-text-primary rounded-lg transition-all"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  )
}