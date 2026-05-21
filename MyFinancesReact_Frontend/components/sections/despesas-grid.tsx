'use client'

import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import type { Despesa } from '@/types'

interface DespesasGridProps {
  despesas: Despesa[]
  isLoading: boolean
  onAddClick: () => void
  onDeleteClick: (id: number) => void
}

export function DespesasGrid({ despesas, isLoading, onAddClick, onDeleteClick }: DespesasGridProps) {
  return (
    <div className="animate-fade-up" style={{ animationDelay: '200ms' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-slate-900">Despesas</h3>
        <Button onClick={onAddClick}>
          <Plus className="w-4 h-4" />
          Cadastrar Despesa
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-5 animate-pulse">
              <div className="h-3 bg-slate-100 rounded w-16 mb-3" />
              <div className="h-4 bg-slate-100 rounded w-24 mb-2" />
              <div className="h-6 bg-slate-100 rounded w-20" />
            </div>
          ))}
        </div>
      ) : despesas.length === 0 ? (
        <p className="text-slate-400 text-sm">Nenhuma despesa cadastrada ainda.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {despesas.map((despesa) => (
            <div
              key={despesa.id}
              className="group relative bg-white rounded-xl shadow-sm p-5 transition-shadow duration-200 hover:shadow-md animate-fade-up"
            >
              <button
                onClick={() => onDeleteClick(despesa.id)}
                className="absolute top-3 right-3 p-1.5 rounded-lg text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 hover:bg-red-50 transition-all duration-150"
                aria-label={`Excluir despesa ${despesa.descricao}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">
                Despesa
              </p>
              <p className="font-semibold text-slate-900 text-sm leading-snug truncate pr-6">
                {despesa.descricao}
              </p>
              <p className="text-xl font-bold text-slate-900 mt-1.5">
                {formatCurrency(despesa.valor)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
