export interface Saldo {
  saldo: number
  totalReceitas: number
  totalDespesas: number
  noVermelho: boolean
}

export interface Despesa {
  id: number
  descricao: string
  valor: number
  tipo: number
  data: string
}

export interface Usuario {
  id: number
  nome: string
  email: string
  criadoEm: string
}
