'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart2, History, Home, LayoutDashboard, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/historico', label: 'Histórico', icon: History },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-white border-r border-slate-100 flex flex-col z-40">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-slate-100">
        <BarChart2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />
        <span className="font-semibold text-slate-900 text-base">MyFinances</span>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150',
              pathname === href
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-700'
            )}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      {/* Separator + Logout */}
      <div className="px-3 pb-5">
        <hr className="border-slate-200 mb-3" />
        <button
          onClick={() => {}}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 w-full"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          Sair
        </button>
      </div>
    </aside>
  )
}
