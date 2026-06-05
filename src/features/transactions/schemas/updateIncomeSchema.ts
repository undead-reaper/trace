import { addIncomeSchema } from "@/features/transactions/schemas/addIncomeSchema"
import z from "zod"

export const updateIncomeSchema = addIncomeSchema.partial().extend({
  incomeId: z.nanoid(),
})

export type UpdateIncomeData = z.input<typeof updateIncomeSchema>
