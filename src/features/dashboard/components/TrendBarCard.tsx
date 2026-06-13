import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import TimeTrendsChart from "@/features/dashboard/components/TimeTrendsChart"
import type { ChartData } from "@/features/dashboard/schemas/chartDataSchema"

type Props = Readonly<{
  transactions: Array<ChartData>
}>

const TrendBarCard = ({ transactions }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trend Bar</CardTitle>
        <CardDescription>View your financial trends over time.</CardDescription>
      </CardHeader>
      <CardContent>
        <TimeTrendsChart data={transactions} />
      </CardContent>
    </Card>
  )
}

export default TrendBarCard
