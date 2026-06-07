import z from "zod"

export const timeFrameSchema = z.enum(["3m", "6m", "1y"])
export type TimeFrame = z.infer<typeof timeFrameSchema>

export const TimeFrameData: Record<
  TimeFrame,
  { label: string; months: number }
> = {
  "3m": { label: "Last 3 Months", months: 3 },
  "6m": { label: "Last 6 Months", months: 6 },
  "1y": { label: "Last Year", months: 12 },
}
