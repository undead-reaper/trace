import { incomeCategories } from "@/lib/db/schemas/income"
import z from "zod"

export const createIncomeSchema = z.object({
  source: z.string().trim().min(1, "Source is required"),
  category: z.enum(incomeCategories.enumValues),
  amount: z
    .number()
    .positive("Amount must be a positive number")
    .transform((value) => value.toFixed(2)),
  date: z.date().default(new Date()),
  description: z.string().trim().optional(),
})
