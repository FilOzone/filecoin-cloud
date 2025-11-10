'use client'

import { TanstackTable } from '@/components/TanstackTable'

import { columns } from '../data/column-definition'
import { dummyData } from '../data/dummy-data'

export function FilecoinPayRailsTable() {
  return <TanstackTable data={dummyData} columns={columns} />
}
