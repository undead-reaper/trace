import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getAllExpensesBaseOptions } from "@/features/transactions/queryOptions/getAllExpensesOptions"
import { updateExpenseOptions } from "@/features/transactions/queryOptions/updateExpenseOptions"

export const useUpdateExpenseMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateExpenseOptions.mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(getAllExpensesBaseOptions)
    },
  })
}
