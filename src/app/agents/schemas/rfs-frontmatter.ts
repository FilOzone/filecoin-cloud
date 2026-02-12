import { z } from 'zod'

export const RFSFrontmatterSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a numeric string'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
})

export type RFSFrontmatter = z.infer<typeof RFSFrontmatterSchema>
