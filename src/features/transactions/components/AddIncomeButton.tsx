import { useState } from "react"
import AddIncomeDialog from "@/features/transactions/components/AddIncomeDialog"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

const AddIncomeButton = () => {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <AddIncomeDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <Button onClick={() => setDialogOpen(true)} className="w-min">
        <PlusIcon />
        <span>Create Income</span>
      </Button>
    </>
  )
}

export default AddIncomeButton
