import z from "zod"

export const dateRangeSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
})

export type DateRange = z.infer<typeof dateRangeSchema>
