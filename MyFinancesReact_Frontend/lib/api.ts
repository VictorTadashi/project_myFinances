import type { Saldo, Despesa } from '@/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000'

export async function getSaldo(): Promise<Saldo> {
  const res = await fetch(`${BASE_URL}/api/Saldo`)
  if (!res.ok) throw new Error('Erro ao buscar saldo')
  return res.json()
}

export async function postSaldo(descricao: string, valor: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/Saldo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ descricao, valor }),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data?.mensagem ?? 'Erro ao adicionar saldo')
  }
}

export async function getDespesas(): Promise<Despesa[]> {
  const res = await fetch(`${BASE_URL}/api/Despesas`)
  if (!res.ok) throw new Error('Erro ao buscar despesas')
  return res.json()
}

export async function postDespesa(descricao: string, valor: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/Despesas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ descricao, valor }),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data?.mensagem ?? 'Erro ao cadastrar despesa')
  }
}

export async function getSaldoEntradas(): Promise<Despesa[]> {
  const res = await fetch(`${BASE_URL}/api/saldo/entradas`)
  if (!res.ok) throw new Error('Erro ao buscar entradas')
  return res.json()
}

export async function deleteSaldoEntrada(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/Saldo/${id}`, { method: 'DELETE' })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data?.mensagem ?? 'Erro ao excluir entrada')
  }
}

export async function deleteDespesa(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/Despesas/${id}`, { method: 'DELETE' })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data?.mensagem ?? 'Erro ao excluir despesa')
  }
}

export async function loginUsuario(email: string, senha: string): Promise<{ id: number; nome: string; email: string }> {
  const res = await fetch(`${BASE_URL}/api/Usuarios/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data?.mensagem ?? 'Email ou senha inválidos')
  }
  return res.json()
}
