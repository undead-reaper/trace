import ResponsiveModal from "@/components/ResponsiveModal"
import { Loader2 } from "lucide-react"
import { Suspense } from "react"
import UpdateIncomeForm from "@/features/transactions/components/UpdateIncomeForm"

type Props = Readonly<{
  open: boolean
  onOpenChange: (open: boolean) => void
  incomeId: string
}>

const UpdateIncomeDialog = ({ onOpenChange, open, incomeId }: Props) => {
  return (
    <ResponsiveModal
      title="Update Income Entry"
      open={open}
      onOpenChange={onOpenChange}
    >
      <Suspense
        fallback={
          <div className="flex h-40 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        }
      >
        {incomeId && (
          <UpdateIncomeForm onChange={onOpenChange} incomeId={incomeId} />
        )}
      </Suspense>
    </ResponsiveModal>
  )
}

export default UpdateIncomeDialog
