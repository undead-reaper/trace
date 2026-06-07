import { queryOptions } from "@tanstack/react-query"
import { getCashflowData } from "@/features/dashboard/functions/getCashflowData"
import type { GetCashflowDataType } from "@/features/dashboard/schemas/getCashflowDataSchema"

export const getCashflowDataBaseOptions = queryOptions({
  queryKey: ["cashflow"],
})

export const getCashflowDataOptions = ({ timeFrame }: GetCashflowDataType) =>
  queryOptions({
    queryKey: [...getCashflowDataBaseOptions.queryKey, { timeFrame }],
    queryFn: async () => {
      return await getCashflowData({ data: { timeFrame } })
    },
  })
