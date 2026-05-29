'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'
import { loginUsuario } from '@/lib/api'
import { LogoImage } from '@/components/ui/logo-image'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    setLoading(true)
    try {
      const usuario = await loginUsuario(email, senha)
      localStorage.setItem('userName', usuario.nome)
      localStorage.setItem('userId', String(usuario.id))
      router.push('/home')
    } catch (err: unknown) {
      setErro(err instanceof Error ? err.message : 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen">
      {/* Lado esquerdo — branding (40%) */}
      <div className="hidden md:flex md:w-[40%] bg-gradient-to-br from-indigo-600 to-indigo-900 flex-col items-center justify-between p-10">
        <div />

        <div className="flex flex-col items-start gap-6">
          <h1 className="text-6xl font-bold text-white leading-tight">
            Gerencie suas{' '}
            <span className="text-indigo-950">Finanças</span>
            {' '}com{' '}
            <span className="text-indigo-950">simplicidade</span>
          </h1>
          <p className="text-indigo-200 text-lg">
            Controle seu saldo, registre despesas e acompanhe seu histórico financeiro.
          </p>

          <ul className="mt-2 space-y-3">
            {[
              'Visualize seu saldo em tempo real',
              'Cadastre e gerencie despesas',
              'Acompanhe seu histórico completo',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-indigo-100">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-500/50 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-indigo-300 text-xs">© {new Date().getFullYear()} MyFinances</p>
      </div>

      {/* Lado direito — formulário (60%) */}
      <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6">
        <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl rounded-2xl px-8 py-10 flex flex-col items-center">
          <div className="mb-6">
            <LogoImage variant="auto" width={140} height={40} />
          </div>

          <div className="w-full text-center mb-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Bem-vindo de volta
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1.5 text-sm">
              Entre com suas credenciais para continuar.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5 w-full">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label
                htmlFor="senha"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Senha
              </label>
              <input
                id="senha"
                type="password"
                autoComplete="current-password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            {erro && (
              <p className="text-sm text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">
                {erro}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm rounded-lg py-2.5 transition-colors duration-150"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

