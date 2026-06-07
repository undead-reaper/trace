import { requireAuthFunction } from "@/features/auth/middlewares/requireAuth"
import { db } from "@/lib/db"
import { income } from "@/lib/db/schemas/income"
import { createServerFn } from "@tanstack/react-start"
import { and, eq, gte, lte, sum } from "drizzle-orm"
import { dateRangeSchema } from "@/features/dashboard/schemas/dateRangeSchema"
import { expenses } from "@/lib/db/schemas/expenses"

export const getReportsStats = createServerFn()
  .middleware([requireAuthFunction])
  .inputValidator(dateRangeSchema)
  .handler(async ({ context, data }) => {
    const incomeWhereFilter = and(
      eq(income.userId, context.userId),
      data.startDate ? gte(income.date, data.startDate) : undefined,
      lte(income.date, data.endDate)
    )
    const expensesWhereFilter = and(
      eq(expenses.userId, context.userId),
      data.startDate ? gte(expenses.date, data.startDate) : undefined,
      lte(expenses.date, data.endDate)
    )

    const [incomeTotal, expensesTotal] = await Promise.all([
      db
        .select({ total: sum(income.amount) })
        .from(income)
        .where(incomeWhereFilter),
      db
        .select({ total: sum(expenses.amount) })
        .from(expenses)
        .where(expensesWhereFilter),
    ])

    const totalIncome = Number(incomeTotal.at(0)?.total ?? 0)
    const totalExpenses = Number(expensesTotal.at(0)?.total ?? 0)

    return {
      income: totalIncome,
      expenses: totalExpenses,
      netBalance: totalIncome - totalExpenses,
    }
  })
