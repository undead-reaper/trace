import { requireAuthFunction } from "@/features/auth/middlewares/requireAuth"
import { createServerFn } from "@tanstack/react-start"
import { deleteExpenseSchema } from "@/features/transactions/schemas/deleteExpenseSchema"
import { db } from "@/lib/db"
import { expenses } from "@/lib/db/schemas/expenses"
import { and, eq } from "drizzle-orm"

export const deleteExpense = createServerFn()
  .middleware([requireAuthFunction])
  .inputValidator(deleteExpenseSchema)
  .handler(async ({ data, context }) => {
    const returnedRows = await db
      .delete(expenses)
      .where(
        and(
          eq(expenses.userId, context.userId),
          eq(expenses.id, data.expenseId)
        )
      )
      .returning({ id: expenses.id })
    if (returnedRows.length === 0) {
      throw new Error("Expense Not Found")
    } else {
      return returnedRows[0]
    }
  })
