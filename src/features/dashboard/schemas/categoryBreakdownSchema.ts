import z from "zod"

export const categoryBreakdownSchema = z.object({
  name: z.string(),
  value: z.number(),
})

export type CategoryBreakdown = z.infer<typeof categoryBreakdownSchema>
