import AddIncomeButton from "@/features/transactions/components/AddIncomeButton"
import { IncomeColumns } from "@/features/transactions/tables/IncomeTables"
import DataTable from "@/features/dashboard/components/DataTable"
import { useState, useTransition } from "react"
import { useGetAllIncomesQuery } from "@/features/transactions/hooks/useGetAllIncomesQuery"
import { getRouteApi } from "@tanstack/react-router"
import { useDeleteIncomeMutation } from "@/features/transactions/hooks/useDeleteIncomeMutation"
import { toast } from "sonner"
import ConfirmDialog from "@/components/ConfirmDialog"
import UpdateIncomeDialog from "@/features/transactions/components/UpdateIncomeDialog"

const IncomeView = () => {
  const routeApi = getRouteApi("/dashboard/income")
  const { page = 1 } = routeApi.useSearch()

  const [isPending, startTransition] = useTransition()
  const { data } = useGetAllIncomesQuery({ page })
  const deleteIncomeMutation = useDeleteIncomeMutation()

  const [idToDelete, setIdToDelete] = useState<string | null>(null)
  const [idToUpdate, setIdToUpdate] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    deleteIncomeMutation.mutate(
      { data: { incomeId: id } },
      {
        onSuccess: () => {
          toast.success("Income Entry Deleted", {
            description: "Your income entry has been successfully deleted.",
          })
          setIdToDelete(null)
        },
        onError: (error) => {
          toast.error("Failed to Delete Income Entry", {
            description: error.message,
          })
        },
      }
    )
  }

  return (
    <>
      <ConfirmDialog
        open={!!idToDelete}
        onOpenChange={(isOpen) => {
          if (!isOpen) setIdToDelete(null)
        }}
        title="Delete Income Entry"
        description="Are you sure you want to delete the income entry? This action is not reversible"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={() => {
          if (idToDelete) handleDelete(idToDelete)
        }}
      />

      {idToUpdate && (
        <UpdateIncomeDialog
          incomeId={idToUpdate}
          open={!!idToUpdate}
          onOpenChange={(isOpen) => {
            if (!isOpen) setIdToUpdate(null)
          }}
        />
      )}

      <div className="flex flex-col gap-6 px-6 pt-10">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div className="flex flex-col gap-1">
            <h1 className="font-noto-serif text-5xl font-bold">Income</h1>
            <p className="text-sm text-muted-foreground">
              Manage your income sources and track your earnings.
            </p>
          </div>
          <AddIncomeButton />
        </div>
        <DataTable
          data={data.items}
          columns={IncomeColumns}
          page={page}
          totalPages={data.totalPages}
          isPending={isPending}
          startTransition={startTransition}
          onDelete={setIdToDelete}
          onUpdate={setIdToUpdate}
        />
      </div>
    </>
  )
}

export default IncomeView
