import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import type { ChartData } from "@/features/dashboard/schemas/chartDataSchema"

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

type Props = Readonly<{
  data: Array<ChartData>
}>

const TimeTrendsChart = ({ data }: Props) => {
  return (
    <ChartContainer config={chartConfig} className="h-75 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            className="stroke-muted"
          />

          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            className="text-xs font-medium text-muted-foreground"
            // Optional: Format the date string nicely here
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            className="text-xs font-medium text-muted-foreground"
            tickFormatter={(value) => `$${value}`}
          />

          <Tooltip content={<ChartTooltipContent />} />
          <Legend verticalAlign="top" height={36} />

          <Bar
            dataKey="income"
            fill="var(--color-income)"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
          <Bar
            dataKey="expenses"
            fill="var(--color-expenses)"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export default TimeTrendsChart
