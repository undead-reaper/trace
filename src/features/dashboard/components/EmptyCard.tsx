import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { CreditCardIcon } from "lucide-react"

const EmptyCard = () => {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader className="h-auto">
        <EmptyMedia variant="icon">
          <CreditCardIcon />
        </EmptyMedia>
        <EmptyTitle className="font-noto-serif text-sm">
          No Transactions Yet
        </EmptyTitle>
        <EmptyDescription className="text-xs">
          Add a transaction to get started
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

export default EmptyCard
