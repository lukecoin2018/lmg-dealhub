'use client'

import { Bell, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export default function Header() {
  const [userEmail, setUserEmail] = useState<string>('')
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email) {
        setUserEmail(user.email)
      }
    }
    getUser()
  }, [supabase.auth])

  return (
    <header className="h-16 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] flex items-center justify-between px-6">
      <div className="flex-1"></div>

      <div className="flex items-center space-x-4">
        <ThemeToggle />

        <button className="p-2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-primary)] rounded-lg transition-all">
          <Bell className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 px-3 py-2 bg-[var(--color-bg-primary)] rounded-lg">
          <div className="w-8 h-8 bg-brand-pink rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-[var(--color-text-primary)]" />
          </div>
          <span className="text-sm text-[var(--color-text-secondary)]">{userEmail}</span>
        </div>
      </div>
    </header>
  )
}