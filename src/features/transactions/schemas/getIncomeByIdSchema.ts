import z from "zod"

export const getIncomeByIdSchema = z.object({
  incomeId: z.nanoid(),
})

export type GetIncomeByIdData = z.input<typeof getIncomeByIdSchema>
