import z from "zod"

export const deleteIncomeSchema = z.object({
  incomeId: z.nanoid(),
})
