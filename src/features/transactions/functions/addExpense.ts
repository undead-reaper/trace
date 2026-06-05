import { requireAuthFunction } from "@/features/auth/middlewares/requireAuth"
import { createServerFn } from "@tanstack/react-start"
import { createExpenseSchema } from "@/features/transactions/schemas/createExpenseSchema"
import { db } from "@/lib/db"
import { expenses } from "@/lib/db/schemas/expenses"

export const createExpense = createServerFn()
  .middleware([requireAuthFunction])
  .inputValidator(createExpenseSchema)
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
