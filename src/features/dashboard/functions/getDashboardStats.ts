import { requireAuthFunction } from "@/features/auth/middlewares/requireAuth"
import { db } from "@/lib/db"
import { expenses } from "@/lib/db/schemas/expenses"
import { income } from "@/lib/db/schemas/income"
import { createServerFn } from "@tanstack/react-start"
import { startOfMonth } from "date-fns"
import { and, desc, eq, gte, sum } from "drizzle-orm"

export const getDashboardStats = createServerFn()
  .middleware([requireAuthFunction])
  .handler(async ({ context }) => {
    const [
      totalIncome,
      totalExpenses,
      monthlyIncome,
      monthlyExpenses,
      topExpenseCategory,
    ] = await Promise.all([
      db
        .select({ total: sum(income.amount) })
        .from(income)
        .where(eq(income.userId, context.userId)),

      db
        .select({ total: sum(expenses.amount) })
        .from(expenses)
        .where(eq(expenses.userId, context.userId)),

      db
        .select({ total: sum(income.amount) })
        .from(income)
        .where(
          and(
            eq(income.userId, context.userId),
            gte(income.date, startOfMonth(new Date()))
          )
        ),

      db
        .select({ total: sum(expenses.amount) })
        .from(expenses)
        .where(
          and(
            eq(expenses.userId, context.userId),
            gte(expenses.date, startOfMonth(new Date()))
          )
        ),

      db
        .select({ category: expenses.category, total: sum(expenses.amount) })
        .from(expenses)
        .where(
          and(
            eq(expenses.userId, context.userId),
            gte(expenses.date, startOfMonth(new Date()))
          )
        )
        .groupBy(expenses.category)
        .orderBy(desc(sum(expenses.amount)))
        .limit(1),
    ])

    const netBalance =
      Number(totalIncome.at(0)?.total ?? 0) -
      Number(totalExpenses.at(0)?.total ?? 0)
    const monthlyCashflow =
      Number(monthlyIncome.at(0)?.total ?? 0) -
      Number(monthlyExpenses.at(0)?.total ?? 0)

    return {
      netBalance,
      monthlyCashflow,
      topCategory: topExpenseCategory.at(0)?.category ?? null,
      topCategoryAmount: Number(topExpenseCategory.at(0)?.total ?? 0),
    }
  })
