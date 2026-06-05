import type { GetIncomeByIdData } from "@/features/transactions/schemas/getIncomeByIdSchema"
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { getIncomeByIdOptions } from "@/features/transactions/queryOptions/getIncomeByIdOptions"
import { getAllIncomesBaseOptions } from "../queryOptions/getAllIncomesOptions"
import type { Income } from "@/lib/db/schemas/income"

export const useGetIncomeByIdQuery = ({ incomeId }: GetIncomeByIdData) => {
  const queryClient = useQueryClient()
  return useSuspenseQuery({
    ...getIncomeByIdOptions({ incomeId }),
    initialData: () => {
      const allPages = queryClient.getQueriesData<{ items: Income[] }>(
        getAllIncomesBaseOptions
      )
      for (const [_, data] of allPages) {
        const found = data?.items.find((income) => income.id === incomeId)
        if (found) {
          return found
        }
      }
      return undefined
    },
    initialDataUpdatedAt: () => {
      const allStates = queryClient.getQueriesData<{ items: Income[] }>({
        queryKey: getAllIncomesBaseOptions.queryKey,
      })
      return Math.max(
        ...allStates.map(
          ([key]) => queryClient.getQueryState(key)?.dataUpdatedAt ?? 0
        )
      )
    },
  })
}
