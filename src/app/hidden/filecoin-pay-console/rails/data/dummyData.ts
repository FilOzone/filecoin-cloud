import type { Transaction } from '../types/transaction'

export const dummyData: Array<Transaction> = Array(40)
  .fill(null)
  .map((_, index) => ({
    railId: index + 100,
    payer: '0xa397874n9qh38wkjd8',
    payee: '0x908fddwqeu2384u82rdwe8y9284ue234h78dy',
    operator: '0x806f7b29384jasxas98opqekd9893ksa',
    status: 'active' as const,
    paymentRate: '0 USDFC',
    settledAmount: '0 USDFC',
    date: 'Oct 23, 2025',
  }))
