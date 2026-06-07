import { requireAuthFunction } from "@/features/auth/middlewares/requireAuth"
import { createServerFn } from "@tanstack/react-start"
import { deleteIncomeSchema } from "@/features/transactions/schemas/deleteIncomeSchema"
import { db } from "@/lib/db"
import { and, eq } from "drizzle-orm"
import { income } from "@/lib/db/schemas/income"

export const deleteIncome = createServerFn()
  .middleware([requireAuthFunction])
  .validator(deleteIncomeSchema)
  .handler(async ({ data, context }) => {
    const returnedRows = await db
      .delete(income)
      .where(
        and(eq(income.userId, context.userId), eq(income.id, data.incomeId))
      )
      .returning({ id: income.id })
    if (returnedRows.length === 0) {
      throw new Error("Income Not Found")
    } else {
      return returnedRows[0]
    }
  })
