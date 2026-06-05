import z from "zod"

export const deleteManyExpensesSchema = z.object({
  ids: z.array(z.nanoid()),
})

export type DeleteManyExpensesData = z.infer<typeof deleteManyExpensesSchema>
