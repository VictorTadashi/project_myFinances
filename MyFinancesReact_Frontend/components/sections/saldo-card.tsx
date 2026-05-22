'use client'

import { PlusCircle, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import type { Saldo } from '@/types'

interface SaldoCardProps {
  saldo: Saldo | null
  isLoading: boolean
  onAddClick: () => void
  onEditClick: () => void
}

export function SaldoCard({ saldo, isLoading, onAddClick, onEditClick }: SaldoCardProps) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md border-l-4 border-slate-200 p-6 max-w-sm animate-pulse">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg w-9 h-9" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-28" />
            <div className="h-7 bg-slate-100 dark:bg-slate-800 rounded w-36" />
          </div>
        </div>
      </div>
    )
  }

  const hasSaldo = saldo !== null && (saldo.saldo !== 0 || saldo.totalReceitas > 0)
  const isNegativo = saldo?.noVermelho ?? false

  if (!hasSaldo) {
    return (
      <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
        <Button onClick={onAddClick}>Adicionar Saldo</Button>
      </div>
    )
  }

  return (
    <div
      className={`group relative bg-white dark:bg-slate-900 rounded-xl shadow-md border-l-4 p-6 max-w-sm transition-shadow duration-200 hover:shadow-lg animate-fade-up ${
        isNegativo ? 'border-red-500' : 'border-emerald-500'
      }`}
      style={{ animationDelay: '100ms' }}
    >
      <button
        onClick={onEditClick}
        className="absolute top-3 right-3 p-1.5 rounded-lg text-amber-500 opacity-0 group-hover:opacity-100 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-all duration-150"
        aria-label="Adicionar ao saldo"
      >
        <PlusCircle className="w-5 h-5" />
      </button>

      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg flex-shrink-0 ${isNegativo ? 'bg-red-50 dark:bg-red-900/30' : 'bg-emerald-50 dark:bg-emerald-900/30'}`}>
          <Wallet className={`w-5 h-5 ${isNegativo ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`} />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            Saldo Disponível
          </p>
          <p className={`text-2xl font-bold mt-0.5 ${isNegativo ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
            {formatCurrency(saldo!.saldo)}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Receitas: {formatCurrency(saldo!.totalReceitas)} · Despesas: {formatCurrency(saldo!.totalDespesas)}
          </p>
        </div>
      </div>
    </div>
  )
}
