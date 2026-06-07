import { requireAuthFunction } from "@/features/auth/middlewares/requireAuth"
import { createServerFn } from "@tanstack/react-start"
import { differenceInMonths, format, subMonths } from "date-fns"
import { db } from "@/lib/db"
import { and, eq, gte, lte } from "drizzle-orm"
import { income } from "@/lib/db/schemas/income"
import { expenses } from "@/lib/db/schemas/expenses"
import type { MonthlyData } from "@/features/dashboard/schemas/monthlyDataSchema"
import type { ChartData } from "@/features/dashboard/schemas/chartDataSchema"
import { dateRangeSchema } from "@/features/dashboard/schemas/dateRangeSchema"

export const getTimeTrendsData = createServerFn({ method: "GET" })
  .middleware([requireAuthFunction])
  .validator(dateRangeSchema)
  .handler(async ({ context, data }) => {
    const { startDate, endDate } = data
    const months = differenceInMonths(endDate, startDate) + 1

    const [rawIncome, rawExpenses] = await Promise.all([
      db.query.income.findMany({
        where: and(
          eq(income.userId, context.userId),
          gte(income.date, startDate),
          lte(income.date, endDate)
        ),
      }),

      db.query.expenses.findMany({
        where: and(
          eq(expenses.userId, context.userId),
          gte(expenses.date, startDate),
          lte(expenses.date, endDate)
        ),
      }),
    ])

    const monthlyData = Array.from({ length: months }).map((_, index) => {
      const d = subMonths(endDate, months - 1 - index)
      const result: MonthlyData = {
        month: format(d, "MMM"),
        monthKey: format(d, "yyyy-MM"),
        income: 0,
        expenses: 0,
      }
      return result
    })

    rawIncome.forEach((transaction) => {
      const monthKey = format(transaction.date, "yyyy-MM")
      const monthEntry = monthlyData.find(
        (entry) => entry.monthKey === monthKey
      )
      if (monthEntry) monthEntry.income += Number(transaction.amount)
    })

    rawExpenses.forEach((transaction) => {
      const monthKey = format(transaction.date, "yyyy-MM")
      const monthEntry = monthlyData.find(
        (entry) => entry.monthKey === monthKey
      )
      if (monthEntry) monthEntry.expenses += Number(transaction.amount)
    })

    const chartData = monthlyData.map(
      ({
        month,
        income: monthlyIncome,
        expenses: monthlyExpenses,
      }: MonthlyData) => {
        const chartResult: ChartData = {
          month,
          income: monthlyIncome,
          expenses: monthlyExpenses,
        }
        return chartResult
      }
    )

    return chartData
  })
