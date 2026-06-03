import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"
import { ClerkProvider } from "@clerk/tanstack-react-start"
import { ui } from "@clerk/ui"
import { shadcn } from "@clerk/ui/themes"

import appCss from "@/styles.css?url"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Trace",
      },
      {
        name: "description",
        content:
          "A simple and intuitive expense tracker that helps you monitor your spending, manage budgets, and take control of your finances.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  notFoundComponent: () => (
    <main className="container mx-auto p-4 pt-16">
      <h1>404</h1>
      <p>The requested page could not be found.</p>
    </main>
  ),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                const applyTheme = (isDark) => {
                  document.documentElement.classList.toggle('dark', isDark)
                }
                const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
                applyTheme(mediaQuery.matches)
                mediaQuery.addEventListener('change', (event) => applyTheme(event.matches))
              })()
            `,
          }}
        />
        <HeadContent />
      </head>
      <body>
        <ClerkProvider ui={ui} appearance={{ theme: shadcn }}>
          {children}
        </ClerkProvider>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
