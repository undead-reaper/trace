import { requireAuthFunction } from "@/features/auth/middlewares/requireAuth"
import { db } from "@/lib/db"
import { expenses } from "@/lib/db/schemas/expenses"
import { income } from "@/lib/db/schemas/income"
import { createServerFn } from "@tanstack/react-start"
import { desc, eq } from "drizzle-orm"
import type { Transaction } from "@/features/dashboard/types/transaction"

export const getRecentTransactions = createServerFn()
  .middleware([requireAuthFunction])
  .handler(async ({ context }) => {
    const [recentIncome, recentExpenses] = await Promise.all([
      db.query.income.findMany({
        where: eq(income.userId, context.userId),
        orderBy: desc(income.date),
        limit: 5,
      }),

      db.query.expenses.findMany({
        where: eq(expenses.userId, context.userId),
        orderBy: desc(expenses.date),
        limit: 5,
      }),
    ])

    const normalizedIncome = recentIncome.map((item) => {
      const entry: Transaction = {
        id: item.id,
        name: item.source,
        amount: Number(item.amount),
        date: item.date,
        type: "income",
      }
      return entry
    })

    const normalizedExpenses = recentExpenses.map((item) => {
      const entry: Transaction = {
        id: item.id,
        name: item.merchant,
        amount: Number(item.amount),
        date: item.date,
        type: "expense",
      }
      return entry
    })

    const recentTransactions = [...normalizedIncome, ...normalizedExpenses]
      .sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
      .slice(0, 5)

    return recentTransactions
  })
