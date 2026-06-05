import z from "zod"

export const deleteIncomeSchema = z.object({
  incomeId: z.nanoid(),
})

export type DeleteIncomeData = z.infer<typeof deleteIncomeSchema>
