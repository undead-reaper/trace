import type { AddIncomeData } from "@/features/transactions/schemas/addIncomeSchema"
import { useAddIncomeMutation } from "@/features/transactions/hooks/useAddIncomeMutation"
import { toast } from "sonner"
import BaseIncomeForm from "@/features/transactions/components/BaseIncomeForm"

type Props = Readonly<{
  onChange: (open: boolean) => void
}>

const AddIncomeForm = ({ onChange }: Props) => {
  const addIncomeMutation = useAddIncomeMutation()

  const defaultValues: AddIncomeData = {
    amount: 0,
    source: "",
    category: "Employment",
    date: new Date(),
    description: "",
  }

  const handleSubmit = (data: AddIncomeData) => {
    addIncomeMutation.mutate(
      { data: data },
      {
        onSuccess: () => {
          onChange(false)
          toast.success("Income Entry Created", {
            description: "Your income entry has been successfully created.",
          })
        },
        onError: (error) => {
          toast.error("Failed to Create Income Entry", {
            description: error.message,
          })
        },
      }
    )
  }

  return (
    <BaseIncomeForm
      initialValues={defaultValues}
      onSubmit={handleSubmit}
      isPending={addIncomeMutation.isPending}
      onCancel={() => onChange(false)}
    />
  )
}

export default AddIncomeForm
