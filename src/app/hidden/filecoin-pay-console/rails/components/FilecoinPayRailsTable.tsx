'use client'

import { TanstackTable } from '@/components/TanstackTable'

import { columns } from '../data/columnDefinition'
import { dummyData } from '../data/dummyData'

export function FilecoinPayRailsTable() {
  return <TanstackTable data={dummyData} columns={columns} />
}
