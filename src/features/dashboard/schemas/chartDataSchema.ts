import z from "zod"

export const chartDataSchema = z.object({
  month: z.string(),
  income: z.number(),
  expenses: z.number(),
})

export type ChartData = z.infer<typeof chartDataSchema>
