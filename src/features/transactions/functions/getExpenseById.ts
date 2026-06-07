import { requireAuthFunction } from "@/features/auth/middlewares/requireAuth"
import { createServerFn } from "@tanstack/react-start"
import { getExpenseByIdSchema } from "@/features/transactions/schemas/getExpenseByIdSchema"
import { db } from "@/lib/db"
import { and, eq } from "drizzle-orm"
import { expenses } from "@/lib/db/schemas/expenses"

export const getExpenseById = createServerFn({ method: "GET" })
  .middleware([requireAuthFunction])
  .inputValidator(getExpenseByIdSchema)
  .handler(async ({ data, context }) => {
    const expenseData = await db.query.expenses.findFirst({
      where: and(
        eq(expenses.id, data.expenseId),
        eq(expenses.userId, context.userId)
      ),
    })
    if (!expenseData) {
      throw new Error("Expense Entry Not Found")
    } else {
      return expenseData
    }
  })
