import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { LoadingSwap } from "@/components/ui/loading-swap"

type Props = Readonly<{
  onClick: () => Promise<void>
}>
const ExportButton = ({ onClick }: Props) => {
  const [isPending, startTransition] = useTransition()
  const handleClick = () => {
    startTransition(async () => {
      await onClick()
    })
  }
  return (
    <Button onClick={handleClick}>
      <LoadingSwap isLoading={isPending}>Export CSV</LoadingSwap>
    </Button>
  )
}

export default ExportButton
