import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import type { ComponentProps } from "react"
import AddExpenseDialog from "@/features/transactions/components/AddExpenseDialog"
import { useStore } from "@nanostores/react"
import { isAddExpenseDialogOpen } from "@/features/dashboard/stores/dialogStore"

const AddExpenseButton = (props: ComponentProps<typeof Button>) => {
  const isDialogOpen = useStore(isAddExpenseDialogOpen)

  return (
    <>
      <AddExpenseDialog
        open={isDialogOpen}
        onOpenChange={isAddExpenseDialogOpen.set}
      />
      <Button
        onClick={() => isAddExpenseDialogOpen.set(true)}
        className="w-min"
        {...props}
      >
        <PlusIcon />
        <span>Add Expense</span>
      </Button>
    </>
  )
}

export default AddExpenseButton
