import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { useState, useTransition } from "react"
import { TimeFrameData } from "@/features/dashboard/schemas/timeFrameSchema"
import type { TimeFrame } from "@/features/dashboard/schemas/timeFrameSchema"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetCashflowDataQuery } from "@/features/dashboard/hooks/useGetCashflowDataQuery"
import { useQueryClient } from "@tanstack/react-query"
import { getCashflowDataOptions } from "@/features/dashboard/queryOptions/getCashflowDataOptions"

const chartConfig: ChartConfig = {
  income: {
    label: "Income",
    color: "var(--color-green-400)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--color-red-400)",
  },
}

const TransactionsChart = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("3m")
  const { data: transactions } = useGetCashflowDataQuery({ timeFrame })
  const queryClient = useQueryClient()
  const [isPending, startTransition] = useTransition()

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-col items-start justify-between gap-2 lg:flex-row lg:items-center">
        <div>
          <CardTitle className="font-noto-serif text-lg font-bold">
            Cashflow Overview
          </CardTitle>
          <CardDescription>
            Income vs Expenses over the selected time range
          </CardDescription>
        </div>
        <Select
          value={timeFrame}
          onValueChange={(v) => {
            if (v) {
              startTransition(() => {
                setTimeFrame(v)
              })
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Time Range">
              {TimeFrameData[timeFrame].label}
            </SelectValue>
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false}>
            <SelectGroup>
              {Object.entries(TimeFrameData).map(([key, { label }]) => (
                <SelectItem
                  onMouseEnter={() => {
                    queryClient.prefetchQuery(
                      getCashflowDataOptions({ timeFrame: key as TimeFrame })
                    )
                  }}
                  key={key}
                  value={key}
                >
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-75 w-full"
        >
          <LineChart
            margin={{ top: 10, right: 12, left: 12, bottom: 0 }}
            data={transactions}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              opacity={0.5}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="var(--color-income)"
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="var(--color-expenses)"
              strokeWidth={3}
              dot={false}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default TransactionsChart
