import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CategoryBreakdown } from "@/features/dashboard/schemas/categoryBreakdownSchema"
import EmptyCard from "@/features/dashboard/components/EmptyCard"
import BreakdownChart from "@/features/dashboard/components/BreakdownChart"
import { formatCurrency } from "@/lib/utils"

type Props = Readonly<{
  expenses: Array<CategoryBreakdown>
}>

const ExpensesBreakdownCard = ({ expenses }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-noto-serif text-lg font-bold">
          Expenses Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        {expenses.length === 0 ? (
          <EmptyCard />
        ) : (
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="flex-1">
              <BreakdownChart items={expenses} />
            </div>
            <div className="flex flex-1 flex-col items-start justify-start space-y-2">
              <h4 className="pb-2 text-lg leading-none font-bold">
                Top Categories
              </h4>
              <div className="flex w-full flex-col gap-1">
                {expenses.slice(0, 5).map((category) => (
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

export default ExpensesBreakdownCard
