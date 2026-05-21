import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/layout/sidebar'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'MyFinances',
  description: 'Gerencie seu saldo e despesas pessoais',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <body className="bg-slate-50">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 md:ml-60">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
