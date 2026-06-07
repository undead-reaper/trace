import { requireAuthFunction } from "@/features/auth/middlewares/requireAuth"
import { db } from "@/lib/db"
import { expenses } from "@/lib/db/schemas/expenses"
import { income } from "@/lib/db/schemas/income"
import { createServerFn } from "@tanstack/react-start"
import { format, subMonths } from "date-fns"
import { and, eq, gte, lte } from "drizzle-orm"
import type { MonthlyData } from "@/features/dashboard/schemas/monthlyDataSchema"
import type { ChartData } from "@/features/dashboard/schemas/chartDataSchema"
import { getDateRange } from "@/lib/utils"
import { getCashflowDataSchema } from "@/features/dashboard/schemas/getCashflowDataSchema"
import { TimeFrameData } from "../schemas/timeFrameSchema"

export const getCashflowData = createServerFn()
  .middleware([requireAuthFunction])
  .inputValidator(getCashflowDataSchema)
  .handler(async ({ context, data }) => {
    const { startDate, endDate } = getDateRange(data.timeFrame)
    const months = TimeFrameData[data.timeFrame].months

    const [recentIncome, recentExpenses] = await Promise.all([
      db.query.income.findMany({
        where: and(
          eq(income.userId, context.userId),
          startDate ? gte(income.date, startDate) : undefined,
          lte(income.date, endDate)
        ),
      }),

      db.query.expenses.findMany({
        where: and(
          eq(expenses.userId, context.userId),
          startDate ? gte(expenses.date, startDate) : undefined,
          lte(expenses.date, endDate)
        ),
      }),
    ])

    const monthlyData = Array.from({ length: months }).map((_, index) => {
      const d = subMonths(new Date(), months - 1 - index)
      const result: MonthlyData = {
        month: format(d, "MMM"),
        monthKey: format(d, "yyyy-MM"),
        income: 0,
        expenses: 0,
      }
      return result
    })

    recentIncome.forEach((transaction) => {
      const monthKey = format(transaction.date, "yyyy-MM")
      const monthEntry = monthlyData.find(
        (entry) => entry.monthKey === monthKey
      )
      if (monthEntry) monthEntry.income += Number(transaction.amount)
    })

    recentExpenses.forEach((transaction) => {
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
