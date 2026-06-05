import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import AddExpenseDialog from "@/features/transactions/components/AddExpenseDialog"

const AddExpenseButton = () => {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <AddExpenseDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <Button onClick={() => setDialogOpen(true)} className="w-min">
        <PlusIcon />
        <span>Add Expense</span>
      </Button>
    </>
  )
}

export default AddExpenseButton
