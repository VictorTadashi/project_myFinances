'use client'

import { useState, FormEvent } from 'react'
import { Modal } from '@/components/ui/modal'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface DespesaModalProps {
  open: boolean
  onClose: () => void
  onSave: (nome: string, valor: number) => void
}

export function DespesaModal({ open, onClose, onSave }: DespesaModalProps) {
  const [nome, setNome] = useState('')
  const [valor, setValor] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const num = parseFloat(valor.replace(',', '.'))
    if (!nome.trim() || isNaN(num) || num <= 0) return
    onSave(nome.trim(), num)
    setNome('')
    setValor('')
  }

  function handleClose() {
    setNome('')
    setValor('')
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose} title="Cadastrar Despesa">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="despesa-nome"
          label="Descrição"
          placeholder="Ex: Supermercado"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <Input
          id="despesa-valor"
          label="Valor"
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
            Salvar
          </Button>
        </div>
      </form>
    </Modal>
  )
}
