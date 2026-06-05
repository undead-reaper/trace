import { requireAuthFunction } from "@/features/auth/middlewares/requireAuth"
import { createServerFn } from "@tanstack/react-start"
import { db } from "@/lib/db"
import { income } from "@/lib/db/schemas/income"
import { and, eq } from "drizzle-orm"
import { updateIncomeSchema } from "@/features/transactions/schemas/updateIncomeSchema"

export const updateIncome = createServerFn()
  .middleware([requireAuthFunction])
  .inputValidator(updateIncomeSchema)
  .handler(async ({ data, context }) => {
    const { incomeId, ...updatePayload } = data
    if (Object.keys(updatePayload).length === 0) {
      const existingIncome = await db.query.income.findFirst({
        where: and(eq(income.userId, context.userId), eq(income.id, incomeId)),
      })
      if (!existingIncome) {
        throw new Error("Income Not Found")
      } else {
        return existingIncome
      }
    } else {
      const returnedRows = await db
        .update(income)
        .set(updatePayload)
        .where(and(eq(income.userId, context.userId), eq(income.id, incomeId)))
        .returning()
      if (returnedRows.length === 0) {
        throw new Error("Income Not Found")
      } else {
        return returnedRows[0]
      }
    }
  })
