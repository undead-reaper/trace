import z from "zod"

export const transactionSchema = z.object({
  id: z.nanoid(),
  name: z.string(),
  amount: z.coerce.number(),
  date: z.date(),
  type: z.enum(["income", "expense"]),
})

export type Transaction = z.infer<typeof transactionSchema>
