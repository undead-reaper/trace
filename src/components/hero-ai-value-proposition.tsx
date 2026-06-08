import { useRef } from "react"
import { TimelineAnimation } from "@/components/ui/timeline-animation"
import { Link } from "@tanstack/react-router"

export const HeroAiValueProposition = () => {
  const timelineRef = useRef<HTMLDivElement>(null)

  return (
    <section
      className="relative flex min-h-screen flex-col overflow-hidden bg-background text-foreground"
      ref={timelineRef}
    >
      <TimelineAnimation
        once={true}
        as="header"
        animationNum={1}
        timelineRef={timelineRef}
        className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between p-6"
      >
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Trace Logo" className="dark:invert" />
          <span className="text-xl font-bold tracking-tight text-foreground">
            Trace
          </span>
        </div>

        <Link
          to="/sign-in/$"
          className="cursor-pointer rounded-full bg-foreground px-4 py-2.5 text-sm font-bold text-background shadow-sm transition-all"
        >
          Sign in
        </Link>
      </TimelineAnimation>

      {/* Main Hero Content */}
      <div className="relative z-10 px-6">
        <article className="w-full border-y text-muted-foreground">
          <div className="mx-auto flex max-w-7xl flex-col items-center space-y-4 border-x p-8 text-center text-muted-foreground">
            <TimelineAnimation
              once={true}
              as="h1"
              animationNum={2}
              timelineRef={timelineRef}
              className="text-5xl leading-[1.05] font-semibold tracking-tight text-foreground md:text-7xl"
            >
              Financial reports & insights <br className="hidden md:block" />{" "}
              built for modern builders
            </TimelineAnimation>
            <TimelineAnimation
              once={true}
              as="p"
              animationNum={3}
              timelineRef={timelineRef}
              className="max-w-4xl text-lg leading-relaxed font-medium text-muted-foreground md:text-xl"
            >
              Track every income stream, subscription, and business expense
              automatically. Let Trace handle the numbers so you can focus on
              creativity, execution, and scaling.
            </TimelineAnimation>
          </div>
        </article>
        <div className="border-b">
          <div className="mx-auto flex max-w-7xl flex-col justify-center gap-5 border-x p-10">
            <TimelineAnimation
              once={true}
              as="a"
              href="/sign-in"
              animationNum={4}
              timelineRef={timelineRef}
              className="mx-auto w-fit cursor-pointer rounded-full border-4 border-muted-foreground bg-background px-10 py-4 text-base font-bold text-foreground shadow-2xl transition-all duration-300 hover:bg-foreground hover:text-background"
            >
              Get started for free
            </TimelineAnimation>
            {/* Business Proof */}
            <div className="relative z-10 flex flex-col items-center gap-1">
              <TimelineAnimation
                once={true}
                as="p"
                animationNum={5}
                timelineRef={timelineRef}
                className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase"
              >
                Join 80,000+ builders & teams
              </TimelineAnimation>
              <div className="flex items-center gap-1">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <TimelineAnimation
                      once={true}
                      key={i}
                      animationNum={6}
                      timelineRef={timelineRef}
                    >
                      <img
                        src={`https://picsum.photos/seed/trace-user-${i}/100`}
                        className="h-10 w-10 rounded-full border-2 border-foreground object-cover shadow-sm"
                        alt=""
                      />
                    </TimelineAnimation>
                  ))}
                </div>
                <TimelineAnimation
                  once={true}
                  as="div"
                  animationNum={7}
                  timelineRef={timelineRef}
                  className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-white shadow-lg"
                >
                  1,234+
                </TimelineAnimation>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mb-10 w-full border-b">
        <div className="mx-auto max-w-7xl border-x px-6 sm:px-8 md:px-10">
          <TimelineAnimation
            once={true}
            animationNum={8}
            timelineRef={timelineRef}
            className="relative overflow-hidden rounded-t-4xl border bg-background p-2 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] backdrop-blur-xl"
          >
            <div className="relative overflow-hidden rounded-t-[2rem] bg-linear-to-b from-background/20 from-50% to-primary/80 pt-10 sm:pt-12 lg:pt-16">
              <div className="absolute top-0 right-0 h-75 w-75 rounded-full bg-primary/10 opacity-40 blur-[100px]"></div>
              <div className="absolute bottom-0 left-0 h-75 w-75 rounded-full bg-primary/20 opacity-40 blur-[100px]"></div>
              <TimelineAnimation
                once={true}
                animationNum={9}
                timelineRef={timelineRef}
                className="relative z-10 mx-auto max-w-5xl"
              >
                <div className="w-full overflow-hidden rounded-t-2xl shadow-2xl">
                  <img
                    src="/dashboard-dark.jpg"
                    alt="Trace Dashboard Overview"
                    className="hidden aspect-video max-h-[60vh] w-full scale-[1.02] object-cover transition-transform duration-500 will-change-transform hover:scale-[1.04] dark:block"
                  />
                  <img
                    src="/dashboard-light.jpg"
                    alt="Trace Dashboard Overview"
                    className="block aspect-video max-h-[65vh] w-full scale-[1.02] object-cover transition-transform duration-500 will-change-transform hover:scale-[1.04] dark:hidden"
                  />
                </div>
              </TimelineAnimation>
            </div>
          </TimelineAnimation>
        </div>
      </div>
    </section>
  )
}
