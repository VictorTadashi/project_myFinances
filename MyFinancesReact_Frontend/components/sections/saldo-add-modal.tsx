'use client'

import { useState, FormEvent } from 'react'
import { Modal } from '@/components/ui/modal'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'

interface SaldoAddModalProps {
  open: boolean
  onClose: () => void
  onAdd: (descricao: string, valor: number) => void
  currentSaldo: number
}

export function SaldoAddModal({ open, onClose, onAdd, currentSaldo }: SaldoAddModalProps) {
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const num = parseFloat(valor.replace(',', '.'))
    if (!descricao.trim() || isNaN(num) || num <= 0) return
    onAdd(descricao.trim(), num)
    setDescricao('')
    setValor('')
  }

  function handleClose() {
    setDescricao('')
    setValor('')
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose} title="Adicionar ao Saldo">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-lg px-4 py-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">Saldo atual</p>
          <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(currentSaldo)}
          </p>
        </div>
        <Input
          id="saldo-add-descricao"
          label="Descrição"
          placeholder="Ex: Salário, Freelance..."
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <Input
          id="saldo-add-valor"
          label="Valor a adicionar"
          type="number"
          placeholder="0,00"
          prefix="R$"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          min="0.01"
          step="0.01"
          required
        />
        <div className="flex gap-3 mt-2">
          <Button type="button" variant="secondary" onClick={handleClose} className="flex-1">
            Cancelar
          </Button>
          <Button type="submit" className="flex-1">
            Adicionar
          </Button>
        </div>
      </form>
    </Modal>
  )
}
