import { requireAuthFunction } from "@/features/auth/middlewares/requireAuth"
import { createServerFn } from "@tanstack/react-start"
import { deleteManyIncomeSchema } from "@/features/transactions/schemas/deleteManyIncomeSchema"
import { db } from "@/lib/db"
import { income } from "@/lib/db/schemas/income"
import { and, eq, inArray } from "drizzle-orm"

export const deleteManyIncome = createServerFn()
  .middleware([requireAuthFunction])
  .inputValidator(deleteManyIncomeSchema)
  .handler(async ({ data, context }) => {
    const deletedIncomes = await db
      .delete(income)
      .where(
        and(inArray(income.id, data.ids), eq(income.userId, context.userId))
      )
      .returning()
    return deletedIncomes
  })
