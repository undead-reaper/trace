import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { DeleteManyIncomeData } from "@/features/transactions/schemas/deleteManyIncomeSchema"
import { deleteManyIncome } from "../functions/deleteManyIncome"
import { getAllIncomesBaseOptions } from "../queryOptions/getAllIncomesOptions"

export const useDeleteManyIncomeMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ ids }: DeleteManyIncomeData) => {
      return await deleteManyIncome({ data: { ids } })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(getAllIncomesBaseOptions)
    },
  })
}
