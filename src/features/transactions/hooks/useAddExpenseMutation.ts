import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addExpenseOptions } from "@/features/transactions/queryOptions/addExpenseOptions"
import { getAllExpensesBaseOptions } from "@/features/transactions/queryOptions/getAllExpensesOptions"

export const useAddExpenseMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addExpenseOptions.mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(getAllExpensesBaseOptions)
    },
  })
}
