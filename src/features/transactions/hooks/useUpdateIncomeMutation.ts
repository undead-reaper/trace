import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateIncomeOptions } from "@/features/transactions/queryOptions/updateIncomeOptions"
import { getAllIncomesBaseOptions } from "@/features/transactions/queryOptions/getAllIncomesOptions"

export const useUpdateIncomeMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateIncomeOptions.mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(getAllIncomesBaseOptions)
    },
  })
}
