import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CategoryBreakdown } from "@/features/dashboard/schemas/categoryBreakdownSchema"
import EmptyCard from "@/features/dashboard/components/EmptyCard"
import BreakdownChart from "@/features/dashboard/components/BreakdownChart"
import { formatCurrency } from "@/lib/utils"

type Props = Readonly<{
  incomes: Array<CategoryBreakdown>
}>

const IncomeBreakdownCard = ({ incomes }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-noto-serif text-lg font-bold">
          Income Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        {incomes.length === 0 ? (
          <EmptyCard />
        ) : (
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="flex-1">
              <BreakdownChart items={incomes} />
            </div>
            <div className="flex flex-1 flex-col items-start justify-start space-y-2">
              <h4 className="pb-2 text-lg leading-none font-bold">
                Top Categories
              </h4>
              <div className="flex w-full flex-col gap-1">
                {incomes.slice(0, 5).map((category) => (
                  <div
                    key={category.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-muted-foreground">
                      {category.name}
                    </span>
                    <span className="font-medium">
                      {formatCurrency(category.value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default IncomeBreakdownCard
