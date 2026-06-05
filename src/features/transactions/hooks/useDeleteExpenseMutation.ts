import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteExpenseOptions } from "@/features/transactions/queryOptions/deleteExpenseOptions"
import { getAllExpensesBaseOptions } from "../queryOptions/getAllExpensesOptions"

export const useDeleteExpenseMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteExpenseOptions.mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(getAllExpensesBaseOptions)
    },
  })
}
