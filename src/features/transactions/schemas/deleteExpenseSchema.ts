import z from "zod"

export const deleteExpenseSchema = z.object({
  expenseId: z.nanoid(),
})

export type DeleteExpenseData = z.infer<typeof deleteExpenseSchema>
