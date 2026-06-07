import type { ComponentProps } from "react"
import AddIncomeDialog from "@/features/transactions/components/AddIncomeDialog"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { isAddIncomeDialogOpen } from "@/features/dashboard/stores/dialogStore"
import { useStore } from "@nanostores/react"

const AddIncomeButton = (props: ComponentProps<typeof Button>) => {
  const isDialogOpen = useStore(isAddIncomeDialogOpen)

  return (
    <>
      <AddIncomeDialog
        open={isDialogOpen}
        onOpenChange={isAddIncomeDialogOpen.set}
      />
      <Button
        onClick={() => isAddIncomeDialogOpen.set(true)}
        className="w-min"
        {...props}
      >
        <PlusIcon />
        <span>Add Income</span>
      </Button>
    </>
  )
}

export default AddIncomeButton
