"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface SavedChart {
  id: number
  title: string
  chart: any
  createdAt: string
}

export default function ProfilePage() {
  const [token, setToken] = useState<string | null>(null)
  const [charts, setCharts] = useState<SavedChart[]>([])

  useEffect(() => {
    setToken(localStorage.getItem("vibeviz_auth_token"))
    try {
      const saved = JSON.parse(localStorage.getItem("vibeviz_charts") || "[]")
      setCharts(saved)
    } catch (e) {
      setCharts([])
    }
  }, [])

  function clearCharts() {
    localStorage.removeItem("vibeviz_charts")
    setCharts([])
  }

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl p-8 bg-card/50 backdrop-blur-xl border border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">My Profile</h1>
              <p className="text-sm text-foreground/50 mt-1">Manage your account and generated charts</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/tool" className="px-3 py-1 rounded bg-primary text-primary-foreground">Create chart</Link>
              <button onClick={clearCharts} className="px-3 py-1 rounded border border-border">
                Clear charts
              </button>
            </div>
          </div>

          <section className="mb-6">
            <h2 className="text-sm font-medium text-foreground mb-2">Account</h2>
            <div className="text-sm text-foreground/50">Token: {token ? token.substring(0, 12) + "…" : "Not signed in"}</div>
          </section>

          <section>
            <h2 className="text-sm font-medium text-foreground mb-4">Generated charts</h2>
            {charts.length === 0 ? (
              <div className="text-sm text-foreground/50">No saved charts yet.</div>
            ) : (
              <div className="grid gap-3">
                {charts.map((c) => (
                  <div key={c.id} className="p-4 bg-card/40 border border-border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-foreground">{c.title}</div>
                        <div className="text-sm text-foreground/50">{new Date(c.createdAt).toLocaleString()}</div>
                      </div>
                      <details className="text-sm text-foreground/50">
                        <summary className="cursor-pointer">View JSON</summary>
                        <pre className="mt-2 max-h-40 overflow-auto text-xs bg-card/20 p-2 rounded">{JSON.stringify(c.chart, null, 2)}</pre>
                      </details>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
