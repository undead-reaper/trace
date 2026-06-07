import { requireAuthFunction } from "@/features/auth/middlewares/requireAuth"
import { createServerFn } from "@tanstack/react-start"
import { addIncomeSchema } from "@/features/transactions/schemas/addIncomeSchema"
import { db } from "@/lib/db"
import { income } from "@/lib/db/schemas/income"

export const addIncome = createServerFn()
  .middleware([requireAuthFunction])
  .validator(addIncomeSchema)
  .handler(async ({ data, context }) => {
    const [newIncome] = await db
      .insert(income)
      .values({
        ...data,
        userId: context.userId,
      })
      .returning()
    return newIncome
  })
