import type { Transaction } from '../types/transaction'

export const dummyData: Array<Transaction> = Array(40)
  .fill(null)
  .map((_, index) => ({
    railId: index + 100,
    payer: '0xa397...cc807',
    payee: '0x908fdd...2a7a4f...',
    operator: '0x806f7b...690ed...',
    status: 'Active' as const,
    paymentRate: '0 USDFC',
    settledAmount: '0 USDFC',
    date: 'Oct 23, 2025',
  }))
