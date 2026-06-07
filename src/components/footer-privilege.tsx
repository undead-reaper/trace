import { buttonVariants } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"

export const FooterPrivilege = () => {
  return (
    <footer className="border-t border-muted-foreground bg-background px-8 py-20 text-foreground transition-colors duration-500">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-end gap-12 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-7xl font-light tracking-tighter">
            Total Clarity.
          </h2>
        </div>

        <div className="space-y-8">
          <h2 className="text-7xl font-light tracking-tighter text-foreground">
            Absolute Control.
          </h2>
          <p className="max-w-md leading-relaxed font-light text-muted-foreground">
            Take command of your financial future. Trace automatically tracks
            and categorizes every transaction, so you can stop managing
            spreadsheets and start building wealth.
          </p>
          <Link
            to="/sign-in/$"
            className={buttonVariants({ variant: "default" })}
          >
            Get started
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-32 flex max-w-7xl flex-col justify-between border-t border-muted-foreground pt-8 text-[10px] font-medium tracking-[0.3em] uppercase md:flex-row">
        <p>© {new Date().getFullYear()} TRACE </p>
        <p>ALL RIGHTS RESERVED</p>
        <a
          href="https://www.github.com/undead-reaper"
          target="_blank"
          rel="noreferrer"
        >
          MADE BY{" "}
          <span className="cursor-pointer text-foreground underline underline-offset-4">
            THE HIGH TABLE
          </span>
        </a>
      </div>
    </footer>
  )
}
