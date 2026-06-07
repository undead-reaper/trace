export const BoldStats = () => {
  return (
    <section className="flex min-h-screen flex-col justify-center bg-background text-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-20 px-5 py-10">
        <div className="items-center justify-between border-b border-muted-foreground pb-5 md:flex">
          <div className="just flex flex-col items-baseline gap-4 md:flex-row">
            <span className="text-8xl font-medium tracking-tighter text-foreground md:text-8xl lg:text-9xl">
              $10B+
            </span>
            <div className="max-w-xs">
              <h3 className="text-xl font-semibold tracking-tight">
                Transactions Tracked
              </h3>
              <p className="text-sm text-pretty text-zinc-500">
                Securely processing and categorizing the world's financial flow
                in real-time.
              </p>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1604076984203-587c92ab2e58?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="supportive img"
            className="h-52 w-full object-fill sm:w-96 dark:invert"
          />
        </div>

        <div className="flex items-center justify-between gap-5">
          <div>
            <p className="mb-2 text-4xl font-medium tracking-tighter text-foreground md:text-5xl">
              99.9%
            </p>
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Categorization Accuracy
            </p>
          </div>
          <div>
            <p className="mb-2 text-4xl font-medium tracking-tighter text-foreground md:text-5xl">
              10k+
            </p>
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Supported Institutions
            </p>
          </div>
          <div>
            <p className="mb-2 text-4xl font-medium tracking-tighter text-foreground md:text-5xl">
              256-bit
            </p>
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Bank-Grade Security
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
