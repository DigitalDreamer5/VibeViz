"use client"

import { useEffect, useState } from "react"

interface VibeScoreGaugeProps {
  score: number
  animated?: boolean
}

export function VibeScoreGauge({ score, animated = true }: VibeScoreGaugeProps) {
  const [displayScore, setDisplayScore] = useState(animated ? 0 : score)

  useEffect(() => {
    if (!animated) return

    let animationFrameId: number
    let currentScore = 0
    const increment = score / 30

    const animate = () => {
      currentScore += increment
      if (currentScore < score) {
        setDisplayScore(Math.round(currentScore))
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setDisplayScore(score)
      }
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [score, animated])

  const radius = 45
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (displayScore / 100) * circumference

  const getColor = (score: number) => {
    if (score >= 80) return "#10B981"
    if (score >= 60) return "#8b5cf6"
    if (score >= 40) return "#f59e0b"
    return "#ef4444"
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#2a2f45" strokeWidth="3" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={getColor(displayScore)}
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">{displayScore}</div>
            <div className="text-xs font-medium text-foreground/50">VibeScore</div>
          </div>
        </div>
      </div>

      <div
        className={`px-4 py-2 rounded-full text-sm font-medium text-center ${
          displayScore >= 80
            ? "bg-green-500/20 text-green-300"
            : displayScore >= 60
              ? "bg-primary/20 text-primary"
              : displayScore >= 40
                ? "bg-yellow-500/20 text-yellow-300"
                : "bg-destructive/20 text-destructive"
        }`}
      >
        {displayScore >= 80
          ? "Perfect match!"
          : displayScore >= 60
            ? "Great alignment"
            : displayScore >= 40
              ? "Good fit"
              : "Consider alternatives"}
      </div>
    </div>
  )
}
