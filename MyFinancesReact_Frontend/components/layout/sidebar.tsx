'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { History, Home, LayoutDashboard, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LogoImage } from '@/components/ui/logo-image'

const navLinks = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/historico', label: 'Histórico', icon: History },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-700 flex flex-col z-40">
      {/* Logo */}
      <div className="flex items-center px-5 py-5 border-b border-slate-100 dark:border-slate-700">
        <LogoImage variant="auto" width={130} height={36} />
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
                ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                : 'text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-700 dark:hover:text-indigo-300'
            )}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      {/* Separator + Logout */}
      <div className="px-3 pb-5">
        <hr className="border-slate-200 dark:border-slate-700 mb-3" />
        <button
          onClick={() => {
            localStorage.removeItem('userName')
            localStorage.removeItem('userId')
            router.push('/login')
          }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-150 w-full"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          Sair
        </button>
      </div>
    </aside>
  )
}
