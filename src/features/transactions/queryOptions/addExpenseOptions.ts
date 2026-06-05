import { mutationOptions } from "@tanstack/react-query"
import type { AddExpenseData } from "@/features/transactions/schemas/addExpenseSchema"
import { addExpense } from "../functions/addExpense"

export const addExpenseOptions = mutationOptions({
  mutationFn: async (payload: { data: AddExpenseData }) => {
    return await addExpense({ data: payload.data })
  },
})
