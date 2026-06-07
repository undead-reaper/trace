import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useGetTimeTrendsDataQuery } from "@/features/dashboard/hooks/useGetTimeTrendsDataQuery"
import type { DateRange } from "@/features/dashboard/schemas/dateRangeSchema"
import TimeTrendsChart from "@/features/dashboard/components/TimeTrendsChart"

type Props = Readonly<{
  timeFrame: DateRange
}>

const TrendBarCard = ({ timeFrame }: Props) => {
  const { startDate, endDate } = timeFrame
  const { data: transactions } = useGetTimeTrendsDataQuery({
    startDate,
    endDate,
  })

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
