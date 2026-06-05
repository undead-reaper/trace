import z from "zod"

export const getAllIncomesSchema = z.object({
  page: z.int().min(1).default(1),
  limit: z.int().min(10).max(100).default(10),
})
