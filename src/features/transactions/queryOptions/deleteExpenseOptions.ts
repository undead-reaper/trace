import { mutationOptions } from "@tanstack/react-query"
import type { DeleteExpenseData } from "@/features/transactions/schemas/deleteExpenseSchema"
import { deleteExpense } from "@/features/transactions/functions/deleteExpense"

export const deleteExpenseOptions = mutationOptions({
  mutationFn: async (payload: { data: DeleteExpenseData }) => {
    return await deleteExpense({ data: payload.data })
  },
})
