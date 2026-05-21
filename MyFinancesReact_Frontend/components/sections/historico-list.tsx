'use client'

import { Trash2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import type { Despesa } from '@/types'

interface HistoricoListProps {
  title: string
  items: Despesa[]
  isLoading: boolean
  colorScheme: 'emerald' | 'red'
  onDelete: (id: number) => void
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso))
}

export function HistoricoList({ title, items, isLoading, colorScheme, onDelete }: HistoricoListProps) {
  const valueClass = colorScheme === 'emerald' ? 'text-emerald-600' : 'text-red-500'

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        {!isLoading && (
          <span className="bg-slate-100 text-slate-600 rounded-full px-2 py-0.5 text-xs font-medium">
            {items.length}
          </span>
        )}
      </div>

      {isLoading ? (
        <ul className="divide-y divide-slate-100">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className="flex items-center justify-between px-5 py-4 animate-pulse">
              <div className="flex flex-col gap-1.5">
                <div className="h-3 bg-slate-100 rounded w-32" />
                <div className="h-2.5 bg-slate-100 rounded w-20" />
              </div>
              <div className="h-4 bg-slate-100 rounded w-20" />
            </li>
          ))}
        </ul>
      ) : items.length === 0 ? (
        <p className="px-5 py-6 text-slate-400 text-sm">Nenhum registro encontrado.</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {items.map((item) => (
            <li key={item.id} className="group flex items-center justify-between px-5 py-4">
              <div>
                <p className="font-medium text-slate-900 text-sm">{item.descricao}</p>
                <p className="text-xs text-slate-400 mt-0.5">{formatDate(item.data)}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`font-semibold text-sm ${valueClass}`}>
                  {formatCurrency(item.valor)}
                </span>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-1.5 rounded-lg text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 hover:bg-red-50 transition-all duration-150"
                  aria-label={`Excluir ${item.descricao}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
