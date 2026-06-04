import { requireAuthFunction } from "@/features/auth/middlewares/requireAuth"
import { createServerFn } from "@tanstack/react-start"
import { createIncomeSchema } from "@/features/transactions/schemas/createIncomeSchema"
import { db } from "@/lib/db"
import { income } from "@/lib/db/schemas/income"

export const createIncome = createServerFn()
  .middleware([requireAuthFunction])
  .inputValidator(createIncomeSchema)
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
