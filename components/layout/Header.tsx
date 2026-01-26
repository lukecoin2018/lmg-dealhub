'use client'

import { Bell, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

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
    <header className="h-16 bg-bg-secondary border-b border-border-color flex items-center justify-between px-6">
      {/* Breadcrumb or page title can go here */}
      <div className="flex-1"></div>

      {/* Right side actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications (placeholder for future) */}
        <button className="p-2 text-text-tertiary hover:text-text-primary hover:bg-bg-primary rounded-lg transition-all">
          <Bell className="w-5 h-5" />
        </button>

        {/* User menu */}
        <div className="flex items-center space-x-3 px-3 py-2 bg-bg-primary rounded-lg">
          <div className="w-8 h-8 bg-brand-pink rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-text-primary" />
          </div>
          <span className="text-sm text-text-secondary">{userEmail}</span>
        </div>
      </div>
    </header>
  )
}