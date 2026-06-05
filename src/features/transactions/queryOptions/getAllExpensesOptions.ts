import type { PaginationOptionsData } from "@/features/dashboard/schemas/paginationOptionsSchema"
import { queryOptions } from "@tanstack/react-query"
import { getAllExpenses } from "@/features/transactions/functions/getAllExpenses"

export const getAllExpensesBaseOptions = queryOptions({
  queryKey: ["expenses"],
})

export const getAllExpensesOptions = ({
  page = 1,
  limit = 10,
}: PaginationOptionsData) =>
  queryOptions({
    queryKey: [...getAllExpensesBaseOptions.queryKey, { page, limit }],
    queryFn: async () => {
      return await getAllExpenses({ data: { page, limit } })
    },
  })
