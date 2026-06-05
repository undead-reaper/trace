import { requireAuthFunction } from "@/features/auth/middlewares/requireAuth"
import { createServerFn } from "@tanstack/react-start"
import { addExpenseSchema } from "@/features/transactions/schemas/addExpenseSchema"
import { db } from "@/lib/db"
import { expenses } from "@/lib/db/schemas/expenses"

export const addExpense = createServerFn()
  .middleware([requireAuthFunction])
  .inputValidator(addExpenseSchema)
  .handler(async ({ data, context }) => {
    const [newExpense] = await db
      .insert(expenses)
      .values({
        ...data,
        userId: context.userId,
      })
      .returning()
    return newExpense
  })
