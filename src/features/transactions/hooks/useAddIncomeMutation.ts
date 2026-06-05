import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addIncomeOptions } from "@/features/transactions/queryOptions/addIncomeOptions"
import { getAllIncomesBaseOptions } from "@/features/transactions/queryOptions/getAllIncomesOptions"

export const useAddIncomeMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addIncomeOptions.mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(getAllIncomesBaseOptions)
    },
  })
}
