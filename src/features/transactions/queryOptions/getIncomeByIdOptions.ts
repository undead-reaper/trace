import type { GetIncomeByIdData } from "@/features/transactions/schemas/getIncomeByIdSchema"
import { queryOptions } from "@tanstack/react-query"
import { getIncomeById } from "@/features/transactions/functions/getIncomeById"

export const getIncomeByIdOptions = ({ incomeId }: GetIncomeByIdData) =>
  queryOptions({
    queryKey: ["income", { incomeId }],
    queryFn: async () => {
      return await getIncomeById({ data: { incomeId } })
    },
  })
