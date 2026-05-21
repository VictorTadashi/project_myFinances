'use client'

import { useState, useEffect } from 'react'
import { WelcomeSection } from '@/components/sections/welcome-section'
import { SaldoCard } from '@/components/sections/saldo-card'
import { SaldoModal } from '@/components/sections/saldo-modal'
import { SaldoAddModal } from '@/components/sections/saldo-add-modal'
import { DespesasGrid } from '@/components/sections/despesas-grid'
import { DespesaModal } from '@/components/sections/despesa-modal'
import { getSaldo, postSaldo, getDespesas, postDespesa, deleteDespesa } from '@/lib/api'
import type { Saldo, Despesa } from '@/types'

export default function HomePage() {
  const [saldo, setSaldo] = useState<Saldo | null>(null)
  const [isLoadingSaldo, setIsLoadingSaldo] = useState(true)
  const [despesas, setDespesas] = useState<Despesa[]>([])
  const [isLoadingDespesas, setIsLoadingDespesas] = useState(true)
  const [saldoModalOpen, setSaldoModalOpen] = useState(false)
  const [saldoAddModalOpen, setSaldoAddModalOpen] = useState(false)
  const [despesaModalOpen, setDespesaModalOpen] = useState(false)

  async function fetchSaldo() {
    try {
      setSaldo(await getSaldo())
    } catch {
      setSaldo(null)
    } finally {
      setIsLoadingSaldo(false)
    }
  }

  async function fetchDespesas() {
    try {
      setDespesas(await getDespesas())
    } catch {
      setDespesas([])
    } finally {
      setIsLoadingDespesas(false)
    }
  }

  useEffect(() => {
    fetchSaldo()
    fetchDespesas()
  }, [])

  async function handleSaldoSave(descricao: string, valor: number) {
    await postSaldo(descricao, valor)
    await fetchSaldo()
    setSaldoModalOpen(false)
  }

  async function handleSaldoAdd(descricao: string, valor: number) {
    await postSaldo(descricao, valor)
    await fetchSaldo()
    setSaldoAddModalOpen(false)
  }

  async function handleDespesaDelete(id: number) {
    await deleteDespesa(id)
    await fetchDespesas()
    await fetchSaldo()
  }

  async function handleDespesaSave(descricao: string, valor: number) {
    await postDespesa(descricao, valor)
    await fetchDespesas()
    await fetchSaldo()
    setDespesaModalOpen(false)
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      <WelcomeSection />

      <div className="mt-10">
        <SaldoCard
          saldo={saldo}
          isLoading={isLoadingSaldo}
          onAddClick={() => setSaldoModalOpen(true)}
          onEditClick={() => setSaldoAddModalOpen(true)}
        />
      </div>

      <div className="mt-12">
        <DespesasGrid
          despesas={despesas}
          isLoading={isLoadingDespesas}
          onAddClick={() => setDespesaModalOpen(true)}
          onDeleteClick={handleDespesaDelete}
        />
      </div>

      <SaldoModal
        open={saldoModalOpen}
        onClose={() => setSaldoModalOpen(false)}
        onSave={handleSaldoSave}
      />

      {saldo && (
        <SaldoAddModal
          open={saldoAddModalOpen}
          onClose={() => setSaldoAddModalOpen(false)}
          onAdd={handleSaldoAdd}
          currentSaldo={saldo.saldo}
        />
      )}

      <DespesaModal
        open={despesaModalOpen}
        onClose={() => setDespesaModalOpen(false)}
        onSave={handleDespesaSave}
      />
    </div>
  )
}
