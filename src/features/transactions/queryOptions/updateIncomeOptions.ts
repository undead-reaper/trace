import { mutationOptions } from "@tanstack/react-query"
import type { UpdateIncomeData } from "@/features/transactions/schemas/updateIncomeSchema"
import { updateIncome } from "@/features/transactions/functions/updateIncome"

export const updateIncomeOptions = mutationOptions({
  mutationFn: async (payload: { data: UpdateIncomeData }) => {
    return await updateIncome({ data: payload.data })
  },
})
