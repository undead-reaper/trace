import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { DeleteManyExpensesData } from "@/features/transactions/schemas/deleteManyExpensesSchema"
import { deleteManyExpenses } from "@/features/transactions/functions/deleteManyExpenses"
import { getAllExpensesBaseOptions } from "@/features/transactions/queryOptions/getAllExpensesOptions"

export const useDeleteManyExpensesMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ ids }: DeleteManyExpensesData) => {
      return await deleteManyExpenses({ data: { ids } })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(getAllExpensesBaseOptions)
    },
  })
}
