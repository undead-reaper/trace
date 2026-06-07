import { requireAuthFunction } from "@/features/auth/middlewares/requireAuth"
import { db } from "@/lib/db"
import { income } from "@/lib/db/schemas/income"
import { createServerFn } from "@tanstack/react-start"
import { count, desc, eq } from "drizzle-orm"
import { getAllIncomesSchema } from "@/features/transactions/schemas/getAllIncomeSchema"

export const getAllIncome = createServerFn({ method: "GET" })
  .middleware([requireAuthFunction])
  .validator(getAllIncomesSchema)
  .handler(async ({ context, data }) => {
    const incomeList = await db.query.income.findMany({
      where: eq(income.userId, context.userId),
      orderBy: desc(income.date),
      limit: data.limit,
      offset: (data.page - 1) * data.limit,
    })
    const [totalRecords] = await db
      .select({ value: count() })
      .from(income)
      .where(eq(income.userId, context.userId))

    const totalPages = Math.ceil(totalRecords.value / data.limit)

    return {
      items: incomeList,
      totalPages,
      currentPage: data.page,
    }
  })
