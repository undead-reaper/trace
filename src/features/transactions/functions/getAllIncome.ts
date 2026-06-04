import { requireAuthFunction } from "@/features/auth/middlewares/requireAuth"
import { db } from "@/lib/db"
import { income } from "@/lib/db/schemas/income"
import { createServerFn } from "@tanstack/react-start"
import { desc, eq } from "drizzle-orm"

export const getAllIncome = createServerFn()
  .middleware([requireAuthFunction])
  .handler(async ({ context }) => {
    const incomeList = await db.query.income.findMany({
      where: eq(income.userId, context.userId),
      orderBy: desc(income.date),
    })
    return incomeList
  })
