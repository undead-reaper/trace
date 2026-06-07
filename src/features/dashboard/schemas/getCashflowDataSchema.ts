import z from "zod"
import { timeFrameSchema } from "@/features/dashboard/schemas/timeFrameSchema"

export const getCashflowDataSchema = z.object({
  timeFrame: timeFrameSchema,
})

export type GetCashflowDataType = z.infer<typeof getCashflowDataSchema>
