import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { dateFormat } from "@/lib/utils"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { format, isSameDay } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useTransition } from "react"
import type { DateRange } from "react-day-picker"
import { getCategoryBreakdownOptions } from "../queryOptions/getCategoryBreakdown"

type Props = Readonly<{
  startDate: Date
  endDate: Date
}>

const DateRangePicker = ({ startDate, endDate }: Props) => {
  const navigate = useNavigate()
  const [isPending, startTransition] = useTransition()
  const queryClient = useQueryClient()
  const handleDateSelect = async (range: DateRange | undefined) => {
    if (!range) return
    const { from, to } = range
    if (from && to) {
      const hasChanged = !isSameDay(from, startDate) || !isSameDay(to, endDate)
      if (hasChanged) {
        await queryClient.ensureQueryData(
          getCategoryBreakdownOptions({ startDate: from, endDate: to })
        )
        startTransition(() => {
          navigate({
            to: "/dashboard/reports",
            search: (prev) => ({
              ...prev,
              startDate: format(from, "yyyy-MM-dd"),
              endDate: format(to, "yyyy-MM-dd"),
            }),
            resetScroll: false,
          })
        })
      }
    }
  }

  return (
    <Field className="w-60">
      <Popover>
        <PopoverTrigger
          disabled={isPending}
          aria-disabled={isPending}
          render={
            <Button
              variant="outline"
              className="justify-start px-2.5 font-normal"
            />
          }
        >
          <CalendarIcon />
          <span>
            {dateFormat(startDate)} - {dateFormat(endDate)}
          </span>
        </PopoverTrigger>
        <PopoverContent
          aria-disabled={isPending}
          className="w-auto p-0"
          align="start"
        >
          <Calendar
            mode="range"
            defaultMonth={startDate}
            selected={{ from: startDate, to: endDate }}
            onSelect={handleDateSelect}
            numberOfMonths={2}
            required
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}

export default DateRangePicker
