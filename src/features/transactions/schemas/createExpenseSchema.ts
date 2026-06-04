import { expenseCategories } from "@/lib/db/schemas/expenses"
import z from "zod"

export const createExpenseSchema = z.object({
  merchant: z.string().trim().min(1, "Merchant name is required"),
  category: z.enum(expenseCategories.enumValues),
  amount: z
    .number()
    .positive("Amount must be a positive number")
    .transform((value) => value.toFixed(2)),
  date: z.date().default(() => new Date()),
  description: z.string().trim().optional(),
})
