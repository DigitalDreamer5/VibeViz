"use client"

import { useEffect, useRef, useState } from "react"
import type { ParsedData } from "@/lib/file-parser"

interface ChartPreviewProps {
  chartType: string
  colors: string[]
  data?: ParsedData
}

export function ChartPreview({ chartType, colors, data }: ChartPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const renderMockChart = () => {
    switch (chartType) {
      case "Bar Chart":
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: colors[0], stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: colors[0], stopOpacity: 0.6 }} />
              </linearGradient>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: colors[1], stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: colors[1], stopOpacity: 0.6 }} />
              </linearGradient>
            </defs>
            <line x1="40" y1="200" x2="390" y2="200" stroke="#e2e8f0" strokeWidth="2" />
            <line x1="40" y1="20" x2="40" y2="200" stroke="#e2e8f0" strokeWidth="2" />
            <rect x="60" y="100" width="30" height="100" fill="url(#grad1)" rx="4" />
            <rect x="110" y="130" width="30" height="70" fill="url(#grad1)" rx="4" />
            <rect x="160" y="80" width="30" height="120" fill="url(#grad2)" rx="4" />
            <rect x="210" y="110" width="30" height="90" fill="url(#grad2)" rx="4" />
            <rect x="260" y="60" width="30" height="140" fill="url(#grad1)" rx="4" />
            <rect x="310" y="90" width="30" height="110" fill="url(#grad2)" rx="4" />
            <text x="60" y="220" fontSize="12" fill="#64748b" textAnchor="middle">
              Jan
            </text>
            <text x="110" y="220" fontSize="12" fill="#64748b" textAnchor="middle">
              Feb
            </text>
            <text x="160" y="220" fontSize="12" fill="#64748b" textAnchor="middle">
              Mar
            </text>
            <text x="210" y="220" fontSize="12" fill="#64748b" textAnchor="middle">
              Apr
            </text>
            <text x="260" y="220" fontSize="12" fill="#64748b" textAnchor="middle">
              May
            </text>
            <text x="310" y="220" fontSize="12" fill="#64748b" textAnchor="middle">
              Jun
            </text>
          </svg>
        )

      case "Line Chart":
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: colors[0], stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: colors[0], stopOpacity: 0 }} />
              </linearGradient>
            </defs>
            <line x1="40" y1="200" x2="390" y2="200" stroke="#e2e8f0" strokeWidth="2" />
            <line x1="40" y1="20" x2="40" y2="200" stroke="#e2e8f0" strokeWidth="2" />
            <polygon points="60,130 110,90 160,110 210,70 260,50 310,85" fill="url(#lineGrad)" />
            <polyline
              points="60,130 110,90 160,110 210,70 260,50 310,85"
              fill="none"
              stroke={colors[0]}
              strokeWidth="3"
            />
            <circle cx="60" cy="130" r="4" fill={colors[0]} />
            <circle cx="110" cy="90" r="4" fill={colors[0]} />
            <circle cx="160" cy="110" r="4" fill={colors[0]} />
            <circle cx="210" cy="70" r="4" fill={colors[0]} />
            <circle cx="260" cy="50" r="4" fill={colors[0]} />
            <circle cx="310" cy="85" r="4" fill={colors[0]} />
            <text x="60" y="220" fontSize="12" fill="#64748b" textAnchor="middle">
              Jan
            </text>
            <text x="110" y="220" fontSize="12" fill="#64748b" textAnchor="middle">
              Feb
            </text>
            <text x="160" y="220" fontSize="12" fill="#64748b" textAnchor="middle">
              Mar
            </text>
            <text x="210" y="220" fontSize="12" fill="#64748b" textAnchor="middle">
              Apr
            </text>
            <text x="260" y="220" fontSize="12" fill="#64748b" textAnchor="middle">
              May
            </text>
            <text x="310" y="220" fontSize="12" fill="#64748b" textAnchor="middle">
              Jun
            </text>
          </svg>
        )

      case "Donut Chart":
        const donutColors = colors.slice(0, 4)
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke={donutColors[0]}
              strokeWidth="30"
              strokeDasharray="75 300"
            />
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke={donutColors[1]}
              strokeWidth="30"
              strokeDasharray="60 300"
              strokeDashoffset="-75"
            />
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke={donutColors[2]}
              strokeWidth="30"
              strokeDasharray="50 300"
              strokeDashoffset="-135"
            />
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke={donutColors[3]}
              strokeWidth="30"
              strokeDasharray="55 300"
              strokeDashoffset="-185"
            />
            <circle cx="100" cy="100" r="50" fill="white" />
            <text x="100" y="105" fontSize="16" fontWeight="bold" fill="#64748b" textAnchor="middle">
              100%
            </text>
          </svg>
        )

      case "Histogram":
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full">
            <line x1="40" y1="200" x2="390" y2="200" stroke="#e2e8f0" strokeWidth="2" />
            <line x1="40" y1="20" x2="40" y2="200" stroke="#e2e8f0" strokeWidth="2" />
            <rect x="60" y="120" width="40" height="80" fill={colors[0]} rx="2" opacity="0.8" />
            <rect x="110" y="80" width="40" height="120" fill={colors[0]} rx="2" opacity="0.9" />
            <rect x="160" y="140" width="40" height="60" fill={colors[0]} rx="2" opacity="0.7" />
            <rect x="210" y="100" width="40" height="100" fill={colors[0]} rx="2" opacity="0.85" />
            <rect x="260" y="110" width="40" height="90" fill={colors[0]} rx="2" opacity="0.8" />
            <text x="80" y="220" fontSize="11" fill="#64748b" textAnchor="middle">
              0-10
            </text>
            <text x="130" y="220" fontSize="11" fill="#64748b" textAnchor="middle">
              10-20
            </text>
            <text x="180" y="220" fontSize="11" fill="#64748b" textAnchor="middle">
              20-30
            </text>
            <text x="230" y="220" fontSize="11" fill="#64748b" textAnchor="middle">
              30-40
            </text>
            <text x="280" y="220" fontSize="11" fill="#64748b" textAnchor="middle">
              40-50
            </text>
          </svg>
        )

      case "Scatter Plot":
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full">
            <line x1="40" y1="200" x2="390" y2="200" stroke="#e2e8f0" strokeWidth="2" />
            <line x1="40" y1="20" x2="40" y2="200" stroke="#e2e8f0" strokeWidth="2" />
            {[
              [100, 150],
              [150, 80],
              [200, 120],
              [250, 60],
              [300, 100],
              [120, 170],
              [180, 90],
              [280, 140],
            ].map((point, idx) => (
              <circle key={idx} cx={point[0]} cy={point[1]} r="5" fill={colors[0]} opacity="0.7" />
            ))}
          </svg>
        )

      default:
        return (
          <svg viewBox="0 0 400 250" className="w-full h-full">
            <text x="200" y="125" fontSize="18" fill="#64748b" textAnchor="middle">
              Chart Preview
            </text>
          </svg>
        )
    }
  }

  const renderDataChart = () => {
    if (!data || data.rows.length === 0) {
      return renderMockChart()
    }

    console.log("[v0] Rendering chart type:", chartType, "with data rows:", data.rows.length)

    switch (chartType) {
      case "Bar Chart":
        return renderBarChartFromData(data, colors)
      case "Line Chart":
        return renderLineChartFromData(data, colors)
      case "Scatter Plot":
        return renderScatterPlotFromData(data, colors)
      case "Histogram":
        return renderHistogramFromData(data, colors)
      case "Donut Chart":
        return renderDonutChartFromData(data, colors)
      default:
        return renderMockChart()
    }
  }

  const renderBarChartFromData = (data: ParsedData, colors: string[]) => {
    const numericColumns = data.headers.filter((h) =>
      data.rows.every((row) => {
        const val = row[h]
        return typeof val === "number" || (typeof val === "string" && !isNaN(Number(val)) && val !== "")
      }),
    )

    const [firstColumn, ...valueColumns] =
      numericColumns.length > 0 ? [data.headers[0], ...numericColumns] : data.headers

    if (valueColumns.length === 0) {
      console.log("[v0] No value columns found, using mock chart")
      return renderMockChart()
    }

    const maxValue = Math.max(
      ...data.rows.flatMap((row) =>
        valueColumns.map((col) => {
          const val = row[col]
          const num = typeof val === "number" ? val : typeof val === "string" ? Number.parseFloat(val) : 0
          return isNaN(num) ? 0 : num
        }),
      ),
      1,
    )

    console.log("[v0] Bar chart - maxValue:", maxValue, "rows:", data.rows.length)

    const barWidth = Math.min(40, 350 / data.rows.length)
    const spacing = Math.max(5, (350 - barWidth * data.rows.length) / (data.rows.length + 1))

    const yTicks = getAxisTicks(maxValue, 5)
    const chartHeight = 150

    return (
      <svg viewBox="0 0 400 250" className="w-full h-full">
        <defs>
          {valueColumns.map((_, idx) => (
            <linearGradient key={idx} id={`grad${idx}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: colors[idx % colors.length], stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: colors[idx % colors.length], stopOpacity: 0.4 }} />
            </linearGradient>
          ))}
        </defs>

        {yTicks.map((tick, idx) => {
          const y = 200 - (tick / maxValue) * chartHeight
          return (
            <g key={`tick-${idx}`}>
              <line
                x1="40"
                y1={y}
                x2="390"
                y2={y}
                stroke="#2a2f45"
                strokeWidth="1"
                strokeDasharray="4,4"
                opacity="0.5"
              />
              <text x="35" y={y + 4} fontSize="10" fill="#9ca3af" textAnchor="end">
                {formatAxisValue(tick)}
              </text>
            </g>
          )
        })}

        <line x1="40" y1="200" x2="390" y2="200" stroke="#3a3f55" strokeWidth="2" />
        <line x1="40" y1="20" x2="40" y2="200" stroke="#3a3f55" strokeWidth="2" />

        {data.rows.map((row, idx) => {
          const x = 40 + spacing + idx * (barWidth + spacing)
          const label = String(row[firstColumn]).substring(0, 10)

          return (
            <g key={idx}>
              {valueColumns.map((col, colIdx) => {
                const val = row[col]
                const numValue = typeof val === "number" ? val : typeof val === "string" ? Number.parseFloat(val) : 0
                const height = maxValue > 0 ? (numValue / maxValue) * 150 : 0
                const barX = x + (colIdx * barWidth) / valueColumns.length

                return (
                  <rect
                    key={`${idx}-${colIdx}`}
                    x={barX}
                    y={200 - height}
                    width={Math.max(2, barWidth / valueColumns.length - 2)}
                    height={Math.max(0, height)}
                    fill={`url(#grad${colIdx})`}
                    rx="2"
                  />
                )
              })}
              <text x={x + barWidth / 2} y="220" fontSize="11" fill="#9ca3af" textAnchor="middle">
                {label}
              </text>
            </g>
          )
        })}
      </svg>
    )
  }

  const renderLineChartFromData = (data: ParsedData, colors: string[]) => {
    const numericColumns = data.headers.filter((h) =>
      data.rows.every((row) => {
        const val = row[h]
        return typeof val === "number" || (typeof val === "string" && !isNaN(Number(val)) && val !== "")
      }),
    )

    if (numericColumns.length === 0) return renderMockChart()

    const maxValue = Math.max(
      ...data.rows.flatMap((row) =>
        numericColumns.map((col) => {
          const val = row[col]
          const num = typeof val === "number" ? val : typeof val === "string" ? Number.parseFloat(val) : 0
          return isNaN(num) ? 0 : num
        }),
      ),
      1,
    )

    console.log("[v0] Line chart - maxValue:", maxValue, "valueColumns:", numericColumns.length)

    const yTicks = getAxisTicks(maxValue, 5)
    const chartHeight = 150

    const points = data.rows.map((row, idx) => ({
      x: 50 + (idx / Math.max(1, data.rows.length - 1)) * 300,
      values: numericColumns.map((col) => {
        const val = row[col]
        const numValue = typeof val === "number" ? val : typeof val === "string" ? Number.parseFloat(val) : 0
        return maxValue > 0 ? 200 - ((isNaN(numValue) ? 0 : numValue) / maxValue) * chartHeight : 200
      }),
    }))

    return (
      <svg viewBox="0 0 400 250" className="w-full h-full">
        {yTicks.map((tick, idx) => {
          const y = 200 - (tick / maxValue) * chartHeight
          return (
            <g key={`tick-${idx}`}>
              <line
                x1="40"
                y1={y}
                x2="390"
                y2={y}
                stroke="#2a2f45"
                strokeWidth="1"
                strokeDasharray="4,4"
                opacity="0.5"
              />
              <text x="35" y={y + 4} fontSize="10" fill="#9ca3af" textAnchor="end">
                {formatAxisValue(tick)}
              </text>
            </g>
          )
        })}

        <line x1="40" y1="200" x2="390" y2="200" stroke="#3a3f55" strokeWidth="2" />
        <line x1="40" y1="20" x2="40" y2="200" stroke="#3a3f55" strokeWidth="2" />

        {numericColumns.map((_, colIdx) => (
          <g key={colIdx}>
            <polyline
              points={points.map((p) => `${p.x},${p.values[colIdx]}`).join(" ")}
              fill="none"
              stroke={colors[colIdx % colors.length]}
              strokeWidth="3"
              strokeLinecap="round"
            />
            {points.map((p, idx) => (
              <circle key={idx} cx={p.x} cy={p.values[colIdx]} r="3" fill={colors[colIdx % colors.length]} />
            ))}
          </g>
        ))}
      </svg>
    )
  }

  const renderScatterPlotFromData = (data: ParsedData, colors: string[]) => {
    if (data.headers.length < 2) return renderMockChart()

    const [xCol, yCol] = data.headers
    const xValues = data.rows.map((r) => {
      const val = r[xCol]
      return typeof val === "number" ? val : typeof val === "string" ? Number.parseFloat(val) : 0
    })
    const yValues = data.rows.map((r) => {
      const val = r[yCol]
      return typeof val === "number" ? val : typeof val === "string" ? Number.parseFloat(val) : 0
    })

    const maxX = Math.max(...xValues, 1)
    const maxY = Math.max(...yValues, 1)

    const yTicks = getAxisTicks(maxY, 4)
    const xTicks = getAxisTicks(maxX, 4)

    return (
      <svg viewBox="0 0 400 250" className="w-full h-full">
        {yTicks.map((tick, idx) => {
          const y = 200 - (tick / maxY) * 150
          return (
            <line
              key={`y-tick-${idx}`}
              x1="40"
              y1={y}
              x2="390"
              y2={y}
              stroke="#2a2f45"
              strokeWidth="1"
              strokeDasharray="4,4"
              opacity="0.3"
            />
          )
        })}
        {xTicks.map((tick, idx) => {
          const x = 40 + (tick / maxX) * 330
          return (
            <line
              key={`x-tick-${idx}`}
              x1={x}
              y1="20"
              x2={x}
              y2="200"
              stroke="#2a2f45"
              strokeWidth="1"
              strokeDasharray="4,4"
              opacity="0.3"
            />
          )
        })}

        <line x1="40" y1="200" x2="390" y2="200" stroke="#3a3f55" strokeWidth="2" />
        <line x1="40" y1="20" x2="40" y2="200" stroke="#3a3f55" strokeWidth="2" />

        {yTicks.map((tick, idx) => {
          const y = 200 - (tick / maxY) * 150
          return (
            <text key={`y-label-${idx}`} x="35" y={y + 4} fontSize="9" fill="#9ca3af" textAnchor="end">
              {formatAxisValue(tick)}
            </text>
          )
        })}

        {data.rows.map((_, idx) => {
          const x = 40 + (xValues[idx] / maxX) * 330
          const y = 200 - (yValues[idx] / maxY) * 150
          return <circle key={idx} cx={x} cy={y} r="4" fill={colors[0]} opacity="0.7" />
        })}
      </svg>
    )
  }

  const renderHistogramFromData = (data: ParsedData, colors: string[]) => {
    if (data.headers.length === 0) return renderMockChart()

    const values = data.rows
      .map((r) => {
        const val = r[data.headers[0]]
        return typeof val === "number" ? val : typeof val === "string" ? Number.parseFloat(val) : 0
      })
      .filter((v) => !isNaN(v))
      .sort((a, b) => a - b)

    if (values.length === 0) return renderMockChart()

    const binCount = Math.min(6, Math.ceil(Math.sqrt(values.length)))
    const minVal = Math.min(...values)
    const maxVal = Math.max(...values)
    const binSize = maxVal === minVal ? 1 : (maxVal - minVal) / binCount

    const bins = Array(binCount).fill(0)
    values.forEach((val) => {
      const binIdx = Math.min(binCount - 1, Math.floor((val - minVal) / binSize))
      bins[binIdx]++
    })

    const maxBin = Math.max(...bins)
    const barWidth = 300 / binCount

    const yTicks = getAxisTicks(maxBin, 4)

    return (
      <svg viewBox="0 0 400 250" className="w-full h-full">
        {yTicks.map((tick, idx) => {
          const y = 200 - (tick / maxBin) * 150
          return (
            <g key={`tick-${idx}`}>
              <line
                x1="40"
                y1={y}
                x2="390"
                y2={y}
                stroke="#2a2f45"
                strokeWidth="1"
                strokeDasharray="4,4"
                opacity="0.5"
              />
              <text x="35" y={y + 4} fontSize="10" fill="#9ca3af" textAnchor="end">
                {Math.round(tick)}
              </text>
            </g>
          )
        })}

        <line x1="40" y1="200" x2="390" y2="200" stroke="#3a3f55" strokeWidth="2" />
        <line x1="40" y1="20" x2="40" y2="200" stroke="#3a3f55" strokeWidth="2" />

        {bins.map((bin, idx) => {
          const height = maxBin > 0 ? (bin / maxBin) * 150 : 0
          const x = 50 + idx * barWidth
          return (
            <rect
              key={idx}
              x={x}
              y={200 - height}
              width={barWidth - 5}
              height={height}
              fill={colors[0]}
              opacity="0.8"
              rx="2"
            />
          )
        })}
      </svg>
    )
  }

  const renderDonutChartFromData = (data: ParsedData, colors: string[]) => {
    const firstCol = data.headers[0]
    const secondCol = data.headers[1] || firstCol

    const values = data.rows.map((r) => {
      const val = r[secondCol]
      return typeof val === "number" ? val : typeof val === "string" ? Number.parseFloat(val) : 0
    })
    const total = values.reduce((a, b) => a + b, 0)

    if (total === 0) return renderMockChart()

    let currentAngle = 0
    const slices = values.map((val, idx) => {
      const percentage = val / total
      const angle = percentage * 360
      const startAngle = currentAngle
      const endAngle = currentAngle + angle
      currentAngle = endAngle

      return { percentage, angle, startAngle, endAngle, color: colors[idx % colors.length] }
    })

    const radius = 70
    const centerX = 100
    const centerY = 100

    return (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {slices.map((slice, idx) => {
          const startRad = (slice.startAngle * Math.PI) / 180
          const endRad = (slice.endAngle * Math.PI) / 180

          const x1 = centerX + radius * Math.cos(startRad)
          const y1 = centerY + radius * Math.sin(startRad)
          const x2 = centerX + radius * Math.cos(endRad)
          const y2 = centerY + radius * Math.sin(endRad)

          const largeArc = slice.angle > 180 ? 1 : 0

          return (
            <path
              key={idx}
              d={`M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`}
              fill={slice.color}
              opacity="0.85"
            />
          )
        })}
        <circle cx={centerX} cy={centerY} r="40" fill="#0a0e27" />
        <text x={centerX} y={centerY + 5} fontSize="14" fontWeight="bold" fill="#ffffff" textAnchor="middle">
          {total}
        </text>
      </svg>
    )
  }

  const getAxisTicks = (maxValue: number, tickCount = 5) => {
    if (maxValue <= 0) return [0]

    const magnitude = Math.pow(10, Math.floor(Math.log10(maxValue)))
    const normalized = maxValue / magnitude

    let step = 1
    if (normalized > 5) step = 5
    if (normalized > 10) step = 10

    const tickValue = step * magnitude
    const ticks = []
    for (let i = 0; i <= tickCount; i++) {
      ticks.push((i * tickValue * maxValue) / (tickCount * tickValue))
    }
    return ticks
  }

  const formatAxisValue = (value: number) => {
    if (value >= 1000000) return (value / 1000000).toFixed(1) + "M"
    if (value >= 1000) return (value / 1000).toFixed(0) + "K"
    return Math.round(value).toString()
  }

  if (!isClient) return null

  return (
    <div
      className="rounded-2xl p-6 border-l-2 border-l-primary animate-slideUp bg-card/50 backdrop-blur-xl border border-border"
      style={{
        boxShadow: "0 0 20px rgba(0, 217, 255, 0.4)",
      }}
    >
      <h3 className="text-sm font-semibold text-primary mb-4">
        {data ? "📊 YOUR DATA VISUALIZATION" : "Live Preview"}
      </h3>
      <div
        ref={containerRef}
        className="h-80 flex items-center justify-center bg-gradient-to-br from-card to-card/50 rounded-xl p-4"
      >
        {renderDataChart()}
      </div>
    </div>
  )
}
