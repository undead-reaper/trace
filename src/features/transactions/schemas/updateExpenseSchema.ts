import z from "zod"
import { addExpenseSchema } from "@/features/transactions/schemas/addExpenseSchema"

export const updateExpenseSchema = addExpenseSchema.partial().extend({
  expenseId: z.nanoid(),
})

export type UpdateExpenseData = z.input<typeof updateExpenseSchema>
