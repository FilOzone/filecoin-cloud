export type Transaction = {
  railId: number
  payer: string
  payee: string
  operator: string
  status: 'active' | 'inactive'
  paymentRate: string
  settledAmount: string
  date: string
}
