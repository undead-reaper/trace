import { FeaturePlatform } from "@/components/feature-platform"
import { FooterPrivilege } from "@/components/footer-privilege"
import { HeroAiValueProposition } from "@/components/hero-ai-value-proposition"
import { BoldStats } from "@/components/stats-bold"
import { requireUnauth } from "@/features/auth/middlewares/requireUnauth"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  beforeLoad: () => requireUnauth(),
  component: App,
})

function App() {
  return (
    <main className="flex flex-col">
      <HeroAiValueProposition />
      <FeaturePlatform />
      <BoldStats />
      <FooterPrivilege />
    </main>
  )
}
