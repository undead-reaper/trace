import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table"
import { useEffect, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useNavigate } from "@tanstack/react-router"
import { TrashIcon } from "lucide-react"
import type { NavigateOptions } from "@tanstack/react-router"

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  page: number
  totalPages: number
  isPending: boolean
  startTransition: (callback: () => void) => void
  onUpdate: (id: string) => void
  onDelete: (id: string) => void
  onDeleteSelected: (ids: string[], clearSelection: () => void) => void
  getRowId?: (originalRow: TData) => string
  searchColumn: string
  nextLoader: NavigateOptions
  previousLoader: NavigateOptions
  nextPrefetch: () => void
  previousPrefetch: () => void
}

const DataTable = <TData, TValue>({
  columns,
  data,
  page,
  isPending,
  totalPages,
  startTransition,
  onUpdate,
  onDelete,
  onDeleteSelected,
  getRowId,
  searchColumn,
  nextLoader,
  previousLoader,
  nextPrefetch,
  previousPrefetch,
}: Props<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const navigate = useNavigate()

  const table = useReactTable({
    data,
    columns,
    getRowId,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta: {
      onUpdate: (id) => onUpdate(id),
      onDelete: (id) => onDelete(id),
    },
  })

  useEffect(() => {
    if (page > 1) {
      previousPrefetch()
    }

    if (page < totalPages) {
      nextPrefetch()
    }
  }, [page, totalPages, previousPrefetch, nextPrefetch])

  const handleDeleteSelected = () => {
    const selectedIds = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => row.id)
    onDeleteSelected(selectedIds, () => table.setRowSelection({}))
  }

  return (
    <div>
      {table.getFilteredSelectedRowModel().rows.length === 0 ? (
        <div className="flex items-center justify-between gap-2 py-4">
          <Input
            placeholder="Filter Items..."
            className="max-w-sm"
            value={
              (table.getColumn(searchColumn)?.getFilterValue() ?? "") as string
            }
            onChange={(e) =>
              table.getColumn(searchColumn)?.setFilterValue(e.target.value)
            }
          />

          <DropdownMenu>
            <DropdownMenuTrigger
              className="hidden md:flex"
              render={<Button variant="outline" className="ml-auto" />}
            >
              Columns
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-between py-4">
          <div className="flex items-center gap-2 p-2">
            <span className="text-xs font-medium">
              {table.getFilteredSelectedRowModel().rows.length} row(s) selected
            </span>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => table.setRowSelection({})}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteSelected}
              size="sm"
              variant="destructive"
            >
              <TrashIcon />
              <span>Delete Selected</span>
            </Button>
          </div>
        </div>
      )}
      <div className="rounded-lg border">
        <Table className={cn(isPending && "pointer-events-none animate-pulse")}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No Results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            startTransition(() => {
              navigate(previousLoader)
            })
          }}
          onMouseEnter={() => {
            if (page > 1) {
              previousPrefetch()
            }
          }}
          disabled={page === 1 || isPending}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            startTransition(() => {
              navigate(nextLoader)
            })
          }}
          onMouseEnter={() => {
            if (page < totalPages) {
              nextPrefetch()
            }
          }}
          disabled={page >= totalPages || isPending}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default DataTable
