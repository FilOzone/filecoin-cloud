import type { ColumnSort } from '@tanstack/react-table'
import { createParser, useQueryState } from 'nuqs'

export const SORT_KEY = 'sort'

const sortParser = createParser({
  parse: (value) => {
    if (!value) return null
    const [id, direction] = value.split('.')

    if (!id || !direction) return null
    if (!['asc', 'desc'].includes(direction)) return null

    return { id, desc: direction === 'desc' } as const satisfies ColumnSort
  },
  serialize: (value) => {
    if (!value) return ''
    return `${value.id}.${value.desc ? 'desc' : 'asc'}`
  },
})

export function useSortingQueryState() {
  return useQueryState(SORT_KEY, sortParser.withOptions({ shallow: false }))
}
