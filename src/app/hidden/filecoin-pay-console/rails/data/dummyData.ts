import type { Transaction } from '../types/transaction'

export const dummyData: Array<Transaction> = Array(40)
  .fill(null)
  .map((_, index) => ({
    railId: index + 100,
    payer: '0xa3971A7234a3379A1813d9867B531e7EeB20ae07',
    payee: '0xa3971A7234a3379A1813d9867B531e7EeB20ae07',
    operator: '0xa3971A7234a3379A1813d9867B531e7EeB20ae07',
    status: 'active' as const,
    paymentRate: '0 USDFC',
    settledAmount: '0 USDFC',
    date: new Date(2025, index % 3, (index % 30) + 1),
  }))
