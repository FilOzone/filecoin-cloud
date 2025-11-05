import type { Address } from 'viem'

export type Transaction = {
  railId: number
  payer: Address
  payee: Address
  operator: Address
  status: 'active' | 'inactive'
  paymentRate: string
  settledAmount: string
  date: Date
}
