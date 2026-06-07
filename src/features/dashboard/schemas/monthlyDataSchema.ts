import z from "zod"

export const montlyDataSchema = z.object({
  month: z.string(),
  monthKey: z.string(),
  income: z.number(),
  expenses: z.number(),
})

export type MonthlyData = z.infer<typeof montlyDataSchema>
