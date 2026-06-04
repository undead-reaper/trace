import { requireAuthFunction } from "@/features/auth/middlewares/requireAuth"
import { db } from "@/lib/db"
import { expenses } from "@/lib/db/schemas/expenses"
import { createServerFn } from "@tanstack/react-start"
import { desc, eq } from "drizzle-orm"

export const getAllExpenses = createServerFn()
  .middleware([requireAuthFunction])
  .handler(async ({ context }) => {
    const expenseList = await db.query.expenses.findMany({
      where: eq(expenses.userId, context.userId),
      orderBy: desc(expenses.date),
    })
    return expenseList
  })
