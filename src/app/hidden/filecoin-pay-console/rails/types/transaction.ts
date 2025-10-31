export type Transaction = {
  railId: number
  payer: string
  payee: string
  operator: string
  status: 'Active' | 'Inactive'
  paymentRate: string
  settledAmount: string
  date: string
}
