import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteIncomeOptions } from "@/features/transactions/queryOptions/deleteIncomeOptions"
import { getAllIncomesBaseOptions } from "@/features/transactions/queryOptions/getAllIncomesOptions"

export const useDeleteIncomeMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteIncomeOptions.mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(getAllIncomesBaseOptions)
    },
  })
}
