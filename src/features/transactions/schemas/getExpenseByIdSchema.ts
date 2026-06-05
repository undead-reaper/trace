import z from "zod"

export const getExpenseByIdSchema = z.object({
  expenseId: z.nanoid(),
})

export type GetExpenseByIdData = z.input<typeof getExpenseByIdSchema>
