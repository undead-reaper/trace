import { mutationOptions } from "@tanstack/react-query"
import { deleteIncome } from "@/features/transactions/functions/deleteIncome"
import type { DeleteIncomeData } from "@/features/transactions/schemas/deleteIncomeSchema"

export const deleteIncomeOptions = mutationOptions({
  mutationFn: async (payload: { data: DeleteIncomeData }) => {
    return await deleteIncome({ data: payload.data })
  },
})
