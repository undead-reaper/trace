import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Props = Readonly<{
  title: string
  description: string
  content: string
  contentClassName?: string
  className?: string
}>

const StatCard = ({
  title,
  description,
  content,
  contentClassName,
  className,
}: Props) => {
  return (
    <Card className={className}>
      <CardContent className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground">{title}</p>
        <h2
          className={cn("font-noto-serif text-2xl font-bold", contentClassName)}
        >
          {content}
        </h2>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

export default StatCard
