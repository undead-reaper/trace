import { requireAuthFunction } from "@/features/auth/middlewares/requireAuth"
import { createServerFn } from "@tanstack/react-start"
import { deleteManyExpensesSchema } from "@/features/transactions/schemas/deleteManyExpensesSchema"
import { db } from "@/lib/db"
import { expenses } from "@/lib/db/schemas/expenses"
import { and, eq, inArray } from "drizzle-orm"

export const deleteManyExpenses = createServerFn()
  .middleware([requireAuthFunction])
  .inputValidator(deleteManyExpensesSchema)
  .handler(async ({ data, context }) => {
    const deletedExpenses = await db
      .delete(expenses)
      .where(
        and(inArray(expenses.id, data.ids), eq(expenses.userId, context.userId))
      )
      .returning()
    return deletedExpenses
  })
