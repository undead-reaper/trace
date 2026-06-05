import z from "zod"

export const deleteManyIncomeSchema = z.object({
  ids: z.array(z.nanoid()),
})

export type DeleteManyIncomeData = z.infer<typeof deleteManyIncomeSchema>
