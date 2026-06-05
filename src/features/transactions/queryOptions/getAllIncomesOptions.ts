import { queryOptions } from "@tanstack/react-query"
import { getAllIncome } from "@/features/transactions/functions/getAllIncome"
import type { PaginationOptionsData } from "@/features/dashboard/schemas/paginationOptionsSchema"

export const getAllIncomesBaseOptions = queryOptions({
  queryKey: ["incomes"],
})

export const getAllIncomesOptions = ({
  page = 1,
  limit = 10,
}: PaginationOptionsData) =>
  queryOptions({
    queryKey: [...getAllIncomesBaseOptions.queryKey, { page, limit }],
    queryFn: async () => {
      return await getAllIncome({ data: { page, limit } })
    },
  })
