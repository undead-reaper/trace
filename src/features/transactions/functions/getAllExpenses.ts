import { requireAuthFunction } from "@/features/auth/middlewares/requireAuth"
import { db } from "@/lib/db"
import { expenses } from "@/lib/db/schemas/expenses"
import { createServerFn } from "@tanstack/react-start"
import { count, desc, eq } from "drizzle-orm"
import { getAllExpensesSchema } from "@/features/transactions/schemas/getAllExpensesSchema"

export const getAllExpenses = createServerFn()
  .middleware([requireAuthFunction])
  .inputValidator(getAllExpensesSchema)
  .handler(async ({ context, data }) => {
    const expenseList = await db.query.expenses.findMany({
      where: eq(expenses.userId, context.userId),
      orderBy: desc(expenses.date),
      limit: data.limit,
      offset: (data.page - 1) * data.limit,
    })
    const [totalRecords] = await db
      .select({ value: count() })
      .from(expenses)
      .where(eq(expenses.userId, context.userId))

    const totalPages = Math.ceil(totalRecords.value / data.limit)

    return {
      items: expenseList,
      totalPages,
      currentPage: data.page,
    }
  })
