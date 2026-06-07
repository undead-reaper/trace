import { requireAuthFunction } from "@/features/auth/middlewares/requireAuth"
import { createServerFn } from "@tanstack/react-start"
import { dateRangeSchema } from "@/features/dashboard/schemas/dateRangeSchema"
import { db } from "@/lib/db"
import { and, desc, eq, gte, lte, sum } from "drizzle-orm"
import { expenses } from "@/lib/db/schemas/expenses"
import { income } from "@/lib/db/schemas/income"
import type { CategoryBreakdown } from "@/features/dashboard/schemas/categoryBreakdownSchema"

export const getCategoryBreakdown = createServerFn({ method: "GET" })
  .middleware([requireAuthFunction])
  .inputValidator(dateRangeSchema)
  .handler(async ({ context, data }) => {
    const expensesWhereFilter = and(
      eq(expenses.userId, context.userId),
      gte(expenses.date, data.startDate),
      lte(expenses.date, data.endDate)
    )

    const incomeWhereFilter = and(
      eq(income.userId, context.userId),
      gte(income.date, data.startDate),
      lte(income.date, data.endDate)
    )

    const [groupedIncome, groupedExpenses] = await Promise.all([
      db
        .select({ category: income.category, amount: sum(income.amount) })
        .from(income)
        .where(incomeWhereFilter)
        .groupBy(income.category)
        .orderBy(desc(sum(income.amount))),

      db
        .select({ category: expenses.category, amount: sum(expenses.amount) })
        .from(expenses)
        .where(expensesWhereFilter)
        .groupBy(expenses.category)
        .orderBy(desc(sum(expenses.amount))),
    ])

    const formattedIncome = groupedIncome.map((item): CategoryBreakdown => {
      const result: CategoryBreakdown = {
        name: item.category,
        value: Number(item.amount ?? 0),
      }
      return result
    })

    const formattedExpenses = groupedExpenses.map((item): CategoryBreakdown => {
      const result: CategoryBreakdown = {
        name: item.category,
        value: Number(item.amount ?? 0),
      }
      return result
    })

    return { income: formattedIncome, expenses: formattedExpenses }
  })
