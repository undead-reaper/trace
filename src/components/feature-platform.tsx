import {
  Home,
  Wallet,
  TrendingUp,
  DollarSign,
  Package,
  BadgeCent,
  ArrowRightIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export const FeaturePlatform = () => {
  return (
    <section className="font-dmSans min-h-screen bg-background px-6 py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-12">
        {/* Title Cell */}
        <div className="flex flex-col justify-start md:col-span-3">
          <h2 className="text-4xl leading-tight font-bold text-balance text-foreground">
            Trace <br /> Platform
          </h2>
          <p className="pt-4 text-sm leading-relaxed text-pretty text-muted-foreground">
            Comprehensive tools designed to give you total clarity and control
            over your business finances.
          </p>
        </div>

        <div className="relative flex h-80 flex-col justify-between overflow-hidden rounded-3xl border bg-background p-10 md:col-span-4">
          <img
            src="https://images.unsplash.com/photo-1763010156322-2fb80d48ea8b?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="absolute top-0 left-0 h-full w-full object-cover transition-opacity duration-300 ease-out dark:invert"
          />
          <div className="relative z-2 flex items-start justify-between">
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              Automated Tracking
            </h3>
            <Package className="size-8 text-foreground" />
          </div>
          <p className="relative z-2 text-sm leading-relaxed text-pretty text-foreground">
            Connect your accounts once and let Trace categorize every
            transaction automatically.
          </p>
        </div>

        <div className="flex h-80 flex-col justify-between rounded-3xl border border-foreground bg-background p-10 md:col-span-5">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              Centralized Hub
            </h3>
            <Home className="size-8 text-foreground" />
          </div>
          <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
            Manage multiple income streams, personal accounts, and business
            expenses all from one place.
          </p>
        </div>

        <div className="flex h-80 flex-col justify-between rounded-3xl border border-foreground bg-background p-10 md:col-span-4">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              Precise Reporting
            </h3>
            <BadgeCent className="size-8 text-foreground" />
          </div>
          <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
            Generate beautifully formatted, tax-ready financial reports with a
            single click.
          </p>
        </div>

        <div className="flex h-80 flex-col justify-between rounded-3xl border border-foreground bg-background p-10 md:col-span-4">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              Growth Analytics
            </h3>
            <TrendingUp className="size-8 text-foreground" />
          </div>
          <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
            Understand your cash flow trajectory with real-time insights and
            predictive forecasting.
          </p>
        </div>

        <div className="group relative flex h-80 flex-col justify-between overflow-hidden rounded-3xl bg-primary p-10 md:col-span-4">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold tracking-tight text-white">
              Simple Pricing
            </h3>
            <Wallet className="size-8 text-white" />
          </div>
          <div className="pointer-events-none absolute inset-0 grid grid-cols-4 gap-2 p-4 opacity-10">
            {Array.from({ length: 16 }).map((_, i) => (
              <DollarSign key={i} className="size-6 text-white" />
            ))}
          </div>
          <div className="relative z-10 flex h-full flex-col justify-end">
            <Button className="flex h-12 items-center gap-2 rounded-full bg-background text-lg font-bold text-foreground transition-all duration-300 hover:gap-4 hover:bg-foreground hover:text-background">
              <span>View pricing</span>
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
