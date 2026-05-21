'use client'

import { useState, useEffect } from 'react'
import { HistoricoList } from '@/components/sections/historico-list'
import { getSaldoEntradas, getDespesas, deleteSaldoEntrada, deleteDespesa } from '@/lib/api'
import type { Despesa } from '@/types'

export default function HistoricoPage() {
  const [entradas, setEntradas] = useState<Despesa[]>([])
  const [isLoadingEntradas, setIsLoadingEntradas] = useState(true)
  const [despesas, setDespesas] = useState<Despesa[]>([])
  const [isLoadingDespesas, setIsLoadingDespesas] = useState(true)

  function fetchEntradas() {
    setIsLoadingEntradas(true)
    getSaldoEntradas()
      .then(setEntradas)
      .catch(() => setEntradas([]))
      .finally(() => setIsLoadingEntradas(false))
  }

  function fetchDespesas() {
    setIsLoadingDespesas(true)
    getDespesas()
      .then(setDespesas)
      .catch(() => setDespesas([]))
      .finally(() => setIsLoadingDespesas(false))
  }

  useEffect(() => {
    fetchEntradas()
    fetchDespesas()
  }, [])

  async function handleDeleteEntrada(id: number) {
    await deleteSaldoEntrada(id)
    fetchEntradas()
  }

  async function handleDeleteDespesa(id: number) {
    await deleteDespesa(id)
    fetchDespesas()
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      <div className="mb-10 animate-fade-up">
        <h2 className="text-2xl font-bold text-slate-900">Histórico</h2>
        <p className="text-slate-500 mt-1.5">
          Acompanhe todas as entradas de saldo e despesas cadastradas ao longo do tempo.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
          <HistoricoList
            title="Entradas de Saldo"
            items={entradas}
            isLoading={isLoadingEntradas}
            colorScheme="emerald"
            onDelete={handleDeleteEntrada}
          />
        </div>

        <div className="animate-fade-up" style={{ animationDelay: '200ms' }}>
          <HistoricoList
            title="Despesas"
            items={despesas}
            isLoading={isLoadingDespesas}
            colorScheme="red"
            onDelete={handleDeleteDespesa}
          />
        </div>
      </div>
    </div>
  )
}
