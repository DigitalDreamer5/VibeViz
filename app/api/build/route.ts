import { type ParsedData, inferChartType } from "@/lib/file-parser"
import { analyzeGoal } from "@/components/chart-recommendation-engine"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Support both form submissions (multipart/form-data) and JSON requests
    const contentType = request.headers.get("content-type") || ""
    let goal: string | undefined
    let vibe: string | undefined
    let data: ParsedData | undefined

    if (contentType.includes("application/json")) {
      const body = await request.json()
      goal = body.goal
      vibe = body.vibe
      data = body.data
    } else {
      const formData = await request.formData()
      goal = formData.get("goal") as string
      vibe = formData.get("vibe") as string

      // Parse data from request
      const dataJson = formData.get("data") as string
      if (dataJson) {
        data = JSON.parse(dataJson)
      }
    }

    if (!data) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 })
    }

    // Infer chart type from data structure
  const chartTypeStr = inferChartType(data.headers, data.rows)

    // Analyze goal to get recommendation with constraints
  // Use the user's goal if provided for recommendation; otherwise fall back to the inferred chart type
  const recommendation = analyzeGoal(goal ?? chartTypeStr)

    // Extract mapping - first column as x, rest as y
    const numericColumns = data.headers.filter((h) =>
      data.rows.every((row) => {
        const val = row[h]
        return typeof val === "number" || (typeof val === "string" && !isNaN(Number(val)) && val !== "")
      }),
    )

    const mapping = {
      x: data.headers[0],
      y: numericColumns.length > 0 ? numericColumns : [data.headers[1] || data.headers[0]],
    }

    // Build response with all necessary fields
    return NextResponse.json({
      chartType: recommendation.chartType,
      data: data.rows,
      headers: data.headers,
      mapping,
      constraints: [
        `Color Palette: ${recommendation.colorPalette.join(", ")}`,
        `Axis Scale: ${recommendation.axisScale}`,
        `Labeling Focus: ${recommendation.labelingFocus}`,
      ],
      colorPalette: recommendation.colorPalette,
      vibeScore: recommendation.vibeScore,
      explanation: recommendation.explanation,
    })
  } catch (error) {
    console.error("[v0] API Error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to build chart" },
      { status: 500 },
    )
  }
}
