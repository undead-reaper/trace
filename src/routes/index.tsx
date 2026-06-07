import { requireUnauth } from "@/features/auth/middlewares/requireUnauth"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  beforeLoad: () => requireUnauth(),
  component: App,
})

function App() {
  return <main className="p-4">Home</main>
}
