import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"
import type { CategoryBreakdown } from "@/features/dashboard/schemas/categoryBreakdownSchema"
import { Pie, PieChart, ResponsiveContainer } from "recharts"

type Props = Readonly<{
  items: Array<CategoryBreakdown>
}>

const BreakdownChart = ({ items }: Props) => {
  const chartConfig: ChartConfig = {}
  const chartData = items.map((item, index) => {
    const colorVar = `var(--chart-${(index % 5) + 1})`
    chartConfig[item.name] = {
      label: item.name,
      color: colorVar,
    }
    return {
      ...item,
      fill: colorVar,
    }
  })

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-w-55"
    >
      <ResponsiveContainer>
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Pie
            data={chartData}
            dataKey="value"
            name="name"
            innerRadius={60}
            outerRadius={85}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export default BreakdownChart
