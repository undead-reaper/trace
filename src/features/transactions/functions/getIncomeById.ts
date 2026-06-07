import { requireAuthFunction } from "@/features/auth/middlewares/requireAuth"
import { createServerFn } from "@tanstack/react-start"
import { getIncomeByIdSchema } from "@/features/transactions/schemas/getIncomeByIdSchema"
import { db } from "@/lib/db"
import { and, eq } from "drizzle-orm"
import { income } from "@/lib/db/schemas/income"

export const getIncomeById = createServerFn({ method: "GET" })
  .middleware([requireAuthFunction])
  .validator(getIncomeByIdSchema)
  .handler(async ({ data, context }) => {
    const incomeData = await db.query.income.findFirst({
      where: and(
        eq(income.id, data.incomeId),
        eq(income.userId, context.userId)
      ),
    })
    if (!incomeData) {
      throw new Error("Income Entry Not Found")
    } else {
      return incomeData
    }
  })
