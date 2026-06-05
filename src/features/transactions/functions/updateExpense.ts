import { requireAuthFunction } from "@/features/auth/middlewares/requireAuth"
import { createServerFn } from "@tanstack/react-start"
import { addExpenseSchema } from "@/features/transactions/schemas/addExpenseSchema"
import z from "zod"
import { db } from "@/lib/db"
import { expenses } from "@/lib/db/schemas/expenses"
import { and, eq } from "drizzle-orm"

export const updateExpense = createServerFn()
  .middleware([requireAuthFunction])
  .inputValidator(addExpenseSchema.partial().extend({ expenseId: z.nanoid() }))
  .handler(async ({ data, context }) => {
    const { expenseId, ...updatePayload } = data
    if (Object.keys(updatePayload).length === 0) {
      const existingExpense = await db.query.expenses.findFirst({
        where: and(
          eq(expenses.userId, context.userId),
          eq(expenses.id, expenseId)
        ),
      })
      if (!existingExpense) {
        throw new Error("Expense Not Found")
      } else {
        return existingExpense
      }
    } else {
      const returnedRows = await db
        .update(expenses)
        .set(updatePayload)
        .where(
          and(eq(expenses.userId, context.userId), eq(expenses.id, expenseId))
        )
        .returning()
      if (returnedRows.length === 0) {
        throw new Error("Expense Not Found")
      } else {
        return returnedRows[0]
      }
    }
  })
