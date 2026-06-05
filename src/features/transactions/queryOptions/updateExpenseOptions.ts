import { mutationOptions } from "@tanstack/react-query"
import type { UpdateExpenseData } from "@/features/transactions/schemas/updateExpenseSchema"
import { updateExpense } from "@/features/transactions/functions/updateExpense"

export const updateExpenseOptions = mutationOptions({
  mutationFn: async (payload: { data: UpdateExpenseData }) => {
    return await updateExpense({ data: payload.data })
  },
})
