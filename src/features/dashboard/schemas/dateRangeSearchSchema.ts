import z from "zod"

export const dateRangeSearchSchema = z.object({
  startDate: z.iso.date().optional(),
  endDate: z.iso.date().optional(),
})

export type DateRangeSearch = z.infer<typeof dateRangeSearchSchema>
