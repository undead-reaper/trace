import { mutationOptions } from "@tanstack/react-query"
import { addIncome } from "@/features/transactions/functions/addIncome"
import type { AddIncomeData } from "@/features/transactions/schemas/addIncomeSchema"

export const addIncomeOptions = mutationOptions({
  mutationFn: async (payload: { data: AddIncomeData }) => {
    return await addIncome({ data: payload.data })
  },
})
