import z from "zod"

export const paginationOptionsSchema = z.object({
  page: z.int().min(1).default(1).optional(),
  limit: z.int().min(1).max(100).default(10).optional(),
})

export type PaginationOptionsData = z.infer<typeof paginationOptionsSchema>
