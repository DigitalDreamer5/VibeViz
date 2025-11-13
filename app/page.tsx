"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import UserMenu from "@/components/user-menu"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const authToken = localStorage.getItem("vibeviz_auth_token")
    if (!authToken) {
      router.push("/auth/sign-in")
    }
  }, [router])

  const exampleGoals = [
    "Compare sales by region",
    "Show growth over time",
    "Highlight customer segments",
    "Track revenue trends",
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-gradient-to-r from-card via-card to-card sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
              style={{
                background: "linear-gradient(to right, var(--primary), var(--accent), var(--secondary))",
              }}
            >
              V
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-foreground to-muted bg-clip-text text-transparent">
              VibeViz
            </span>
          </div>
           <div className="flex items-center gap-3">
             <UserMenu />
             <Link href="/tool">
            <button
              className="px-6 py-2 rounded-full text-white font-medium hover:shadow-lg transition-all duration-300"
              style={{
                background: "linear-gradient(to right, var(--primary), var(--accent), var(--secondary))",
                boxShadow: "0 0 20px rgba(255, 0, 110, 0.4)",
              }}
            >
              Try Now
            </button>
          </Link>
           </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-32">
        <div className="text-center mb-16">
          <div className="mb-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground text-balance leading-tight mb-4">
              From goal to chart{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  background: "linear-gradient(to right, var(--primary), var(--accent), var(--secondary))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                instantly.
              </span>
            </h1>
            <p className="text-xl text-foreground text-balance max-w-2xl mx-auto leading-relaxed">
              Describe your data goal in plain English. Get AI-powered recommendations for the perfect chart type, color
              palette, and design guidance.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mb-12">
            <Link href="/tool">
              <button
                className="group px-8 py-4 rounded-full text-white font-semibold hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
                style={{
                  background: "linear-gradient(to right, var(--primary), var(--accent), var(--secondary))",
                  boxShadow: "0 0 20px rgba(255, 0, 110, 0.4)",
                }}
              >
                Try VibeViz
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </Link>
          </div>

          {/* Example Goals */}
          <div className="mb-16">
            <p className="text-sm font-medium text-foreground mb-4">Example goals you can try:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {exampleGoals.map((goal) => (
                <div
                  key={goal}
                  className="px-4 py-2 rounded-full border border-border bg-card text-foreground text-sm hover:bg-border transition-colors cursor-pointer"
                >
                  {goal}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Showcase - 3 Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Smart Chart Selection",
              description: "AI recommends the best chart type for your data story",
              emoji: "📊",
            },
            {
              title: "VibeScore Rating",
              description: "See how well your visualization aligns with your goal (0-100)",
              emoji: "⭐",
            },
            {
              title: "Design Guidance",
              description: "Get color palettes, axis scaling, and labeling recommendations",
              emoji: "🎨",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="p-8 rounded-2xl hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-xl border border-border"
            >
              <div className="text-3xl mb-4">{feature.emoji}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-foreground/50 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-8 bg-card/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-foreground/50 text-sm">
          <p>Where data meets design. Align your visuals with your message.</p>
        </div>
      </footer>
    </div>
  )
}
