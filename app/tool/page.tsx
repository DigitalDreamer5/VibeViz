"use client"

import { useState } from "react"
import Link from "next/link"
import { analyzeGoal, type ChartRecommendation, vibeStyles } from "@/components/chart-recommendation-engine"
import { VibeScoreGauge } from "@/components/vibe-score-gauge"
import { ChartPreview } from "@/components/chart-preview"
import { FileUploader } from "@/components/file-uploader"
import RecommendationCard from "@/components/recommendation-card"
import { type ParsedData, inferChartType } from "@/lib/file-parser"
import { ConstraintsDisplay } from "@/components/constraints-display"
import { ThemeToggle } from "@/components/theme-toggle"
import UserMenu from "@/components/user-menu"

export default function ToolPage() {
  const [goal, setGoal] = useState("")
  const [vibe, setVibe] = useState("analytical")
  const [recommendation, setRecommendation] = useState<ChartRecommendation | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedData, setUploadedData] = useState<ParsedData | null>(null)
  const [fileName, setFileName] = useState("")
  const [builtChart, setBuiltChart] = useState<any>(null)
  const [isBuilding, setIsBuilding] = useState(false)
  const [buildError, setBuildError] = useState("")

  const handleGenerate = async () => {
    if (!goal.trim()) return

    setIsLoading(true)
    setBuildError("")
  await new Promise((resolve) => setTimeout(resolve, 800))
  const result = analyzeGoal(goal)
    setRecommendation(result)
    setIsLoading(false)

    if (uploadedData) {
      await buildChartFromData(result)
    }
  }

  const buildChartFromData = async (rec: ChartRecommendation) => {
    if (!uploadedData) return

    setIsBuilding(true)
    setBuildError("")

    try {
      const response = await fetch("/api/build", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal,
          vibe,
          data: uploadedData,
        }),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || "Failed to build chart")
      }

      const chartData = await response.json()
      setBuiltChart(chartData)
      console.log("[v0] Chart built successfully:", chartData)

      // persist generated chart to localStorage
      try {
        const saved = JSON.parse(localStorage.getItem("vibeviz_charts") || "[]")
        const entry = {
          id: Date.now(),
          title: goal || fileName || "Generated chart",
          chart: chartData,
          createdAt: new Date().toISOString(),
        }
        saved.unshift(entry)
        localStorage.setItem("vibeviz_charts", JSON.stringify(saved))
      } catch (e) {
        console.warn("Failed to persist chart:", e)
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Failed to build chart"
      console.error("[v0] Build error:", msg)
      setBuildError(msg)
    } finally {
      setIsBuilding(false)
    }
  }

  const handleFileUpload = (data: ParsedData, name: string) => {
    console.log("[v0] File uploaded:", name, data)
    setUploadedData(data)
    setFileName(name)

  const inferredType = inferChartType(data.headers, data.rows)
  console.log("[v0] Inferred chart type:", inferredType)
  const result = analyzeGoal(inferredType)
    setRecommendation(result)
    setGoal(`Visualize data from ${name}`)
  }

  const handleReset = () => {
    setGoal("")
    setRecommendation(null)
    setVibe("analytical")
    setUploadedData(null)
    setFileName("")
    setBuiltChart(null)
    setBuildError("")
  }

  const vibeOptions = Object.entries(vibeStyles).map(([key, value]) => ({
    id: key,
    ...value,
  }))

  return (
    <div>
      <header className="border-b border-border bg-card/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity group">
            <span className="text-xl">←</span>
            <span className="font-semibold text-foreground group-hover:text-primary transition-colors">Back</span>
          </Link>
          <div className="text-sm font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ✨ VibeViz
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="mb-12 animate-fadeIn">
            <div className="rounded-2xl p-8 bg-card/50 backdrop-blur-xl border border-border shadow-[0_0_20px_rgba(0,217,255,0.4)] border-l-2 border-l-primary">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">✨</span>
                <h1 className="text-3xl font-bold text-foreground">What's your data story?</h1>
              </div>
              <p className="text-foreground/50 mb-8">Upload files or describe what you want to visualize</p>

              {!uploadedData ? (
                <>
                  <div className="mb-6">
                    <FileUploader onFileUpload={handleFileUpload} isLoading={isLoading} />
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-xs font-medium text-foreground/50 uppercase tracking-wider">or describe</span>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                </>
              ) : (
                <div className="mb-6 p-4 bg-success/20 border border-success/50 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-success">✓ {fileName}</div>
                    <div className="text-sm text-success/90">
                      {uploadedData.rows.length} rows × {uploadedData.headers.length} columns
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setUploadedData(null)
                      setFileName("")
                      setBuiltChart(null)
                    }}
                    className="px-3 py-1 text-sm bg-success/30 text-success hover:bg-success/40 rounded transition-colors"
                  >
                    Change
                  </button>
                </div>
              )}

              <textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g., Compare monthly revenue across products, Show growth trend over 5 years..."
                className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none mb-6"
                rows={4}
              />

              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">Vibe Mode (optional)</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {vibeOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setVibe(option.id)}
                      className={`p-3 rounded-lg border-2 transition-all text-center hover:scale-105 active:scale-95 ${
                        vibe === option.id
                          ? "border-primary bg-primary/20 shadow-[0_0_20px_rgba(0,217,255,0.4)]"
                          : "border-border bg-card/40 hover:border-primary/60 hover:bg-card/70 hover:border-primary/50 transition-all backdrop-blur-xl"
                      }`}
                    >
                      <div className="text-xs font-semibold text-foreground">{option.name}</div>
                      <div className="text-xs text-foreground/50 mt-1">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleGenerate}
                  disabled={!goal.trim() || isLoading}
                  className="flex-1 px-6 py-3 rounded-lg text-primary-foreground font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center justify-center gap-2"
                  style={{
                    background: "linear-gradient(to right, var(--primary), var(--accent), var(--secondary))",
                    boxShadow: "0 0 20px rgba(255, 0, 110, 0.4)",
                  }}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <span>✨</span>
                      Generate Suggestion
                    </>
                  )}
                </button>

                {recommendation && (
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 rounded-lg border border-primary/60 bg-primary/15 text-primary font-semibold hover:bg-primary/25 transition-all active:scale-95 flex items-center gap-2"
                  >
                    <span>🔄</span>
                    Try Again
                  </button>
                )}
              </div>
            </div>
          </div>

          {recommendation && (
            <div className="space-y-6 animate-slideUp">
              <div className="grid lg:grid-cols-3 gap-6">
                <div
                  className="lg:col-span-1 rounded-2xl p-8 flex flex-col items-center justify-center animate-scaleIn backdrop-blur-xl border border-border bg-card/50"
                  style={{
                    boxShadow: "0 0 20px rgba(0, 217, 255, 0.4)",
                  }}
                >
                  <VibeScoreGauge score={recommendation.vibeScore} animated={true} />
                </div>

                <div className="lg:col-span-2 space-y-4 animate-scaleIn" style={{ animationDelay: "0.2s" }}>
                  <RecommendationCard
                    icon="📊"
                    label="Recommended Chart Type"
                    value={recommendation.chartType}
                    description={recommendation.explanation}
                  />

                  <RecommendationCard icon="🎨" label="Color Palette" value="" colors={recommendation.colorPalette} />

                  <RecommendationCard icon="📐" label="Axis Scale" value={recommendation.axisScale} />

                  <RecommendationCard icon="🏷️" label="Labeling Focus" value={recommendation.labelingFocus} />
                </div>
              </div>

              {isBuilding && (
                <div className="rounded-2xl p-12 border border-border bg-card/50 backdrop-blur-xl flex flex-col items-center justify-center gap-4 animate-pulse">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <p className="text-foreground/50">Building your chart...</p>
                </div>
              )}

              {buildError && (
                <div className="rounded-2xl p-6 border border-destructive/50 bg-destructive/20 backdrop-blur-xl">
                  <p className="text-destructive">⚠️ {buildError}</p>
                  <p className="text-sm text-destructive/80 mt-2">Please upload a structured CSV or Excel file.</p>
                </div>
              )}

              {builtChart && !isBuilding ? (
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <ChartPreview
                      chartType={builtChart.chartType}
                      colors={builtChart.colorPalette}
                      data={uploadedData ?? undefined}
                    />
                  </div>
                  <div className="lg:col-span-1">
                    <ConstraintsDisplay
                      colorPalette={builtChart.colorPalette}
                      axisScale={recommendation.axisScale}
                      labelingFocus={recommendation.labelingFocus}
                      vibeScore={recommendation.vibeScore}
                    />
                  </div>
                </div>
              ) : !isBuilding && uploadedData ? (
                <ChartPreview
                  chartType={recommendation.chartType}
                  colors={recommendation.colorPalette}
                  data={uploadedData ?? undefined}
                />
              ) : null}
            </div>
          )}

          {!recommendation && !isLoading && (
            <div className="text-center py-20 animate-fadeIn">
              <div className="text-6xl mb-4">📈</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">No visualization yet</h2>
              <p className="text-foreground/50">Upload a file or describe your data goal to get started.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
