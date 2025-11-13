export interface ChartRecommendation {
  chartType: string
  colorPalette: string[]
  axisScale: string
  labelingFocus: string
  vibeScore: number
  explanation: string
}

const keywordMapping = {
  comparison: ["compare", "across", "versus", "by", "difference", "against"],
  trend: ["trend", "over time", "growth", "decline", "change", "trajectory"],
  proportion: ["composition", "proportion", "percentage", "part of", "distribution"],
  distribution: ["distribution", "range", "spread", "variance", "histogram"],
  correlation: ["relationship", "correlation", "association", "connected", "depend"],
}

const chartConfigs: Record<string, ChartRecommendation> = {
  comparison: {
    chartType: "Bar Chart",
    colorPalette: ["#3B82F6", "#EC4899", "#8B5CF6", "#06B6D4", "#F59E0B"],
    axisScale: "Categorical",
    labelingFocus: "Emphasize category names",
    vibeScore: 85,
    explanation: "Bar charts excel at comparing values across categories.",
  },
  trend: {
    chartType: "Line Chart",
    colorPalette: ["#3B82F6", "#0EA5E9", "#06B6D4", "#14B8A6", "#10B981"],
    axisScale: "Time-based X-axis",
    labelingFocus: "Highlight peak points",
    vibeScore: 88,
    explanation: "Line charts effectively show changes and trends over time.",
  },
  proportion: {
    chartType: "Donut Chart",
    colorPalette: ["#F59E0B", "#FCA311", "#F97316", "#EA580C", "#D97706"],
    axisScale: "Equal proportion",
    labelingFocus: "Show percentages clearly",
    vibeScore: 82,
    explanation: "Donut charts clearly display parts of a whole.",
  },
  distribution: {
    chartType: "Histogram",
    colorPalette: ["#6366F1", "#8B5CF6", "#A78BFA", "#C4B5FD", "#DDD6FE"],
    axisScale: "Numeric bins",
    labelingFocus: "Highlight outliers",
    vibeScore: 80,
    explanation: "Histograms reveal data distribution and frequency patterns.",
  },
  correlation: {
    chartType: "Scatter Plot",
    colorPalette: ["#3B82F6", "#EC4899", "#F59E0B", "#10B981", "#06B6D4"],
    axisScale: "Continuous",
    labelingFocus: "Add trendline focus",
    vibeScore: 84,
    explanation: "Scatter plots reveal relationships between two variables.",
  },
}

export function analyzeGoal(goal: string): ChartRecommendation {
  const goalLower = goal.toLowerCase()

  for (const [category, keywords] of Object.entries(keywordMapping)) {
    if (keywords.some((keyword) => goalLower.includes(keyword))) {
      const baseConfig = chartConfigs[category]
      // Add slight randomness to VibeScore for realism
      return {
        ...baseConfig,
        vibeScore: Math.min(100, baseConfig.vibeScore + Math.floor(Math.random() * 10)),
      }
    }
  }

  // Default fallback
  return {
    chartType: "Line Chart",
    colorPalette: ["#3B82F6", "#0EA5E9", "#06B6D4", "#14B8A6", "#10B981"],
    axisScale: "Standard",
    labelingFocus: "Balanced labeling",
    vibeScore: 75,
    explanation: "Line chart is a versatile default choice for most data storytelling.",
  }
}

export const vibeStyles = {
  analytical: {
    name: "Analytical",
    description: "Professional and data-focused",
    colors: ["#1F2937", "#374151", "#4B5563", "#6B7280", "#9CA3AF"],
  },
  storytelling: {
    name: "Storytelling",
    description: "Narrative and engaging",
    colors: ["#7C3AED", "#A78BFA", "#DDD6FE", "#EDE9FE", "#F3E8FF"],
  },
  persuasive: {
    name: "Persuasive",
    description: "Bold and impactful",
    colors: ["#DC2626", "#EF4444", "#FCA5A5", "#FECACA", "#FEE2E2"],
  },
  calm: {
    name: "Calm",
    description: "Soft and peaceful",
    colors: ["#06B6D4", "#22D3EE", "#A5F3FC", "#CFFAFE", "#ECFDF5"],
  },
  energetic: {
    name: "Energetic",
    description: "Vibrant and dynamic",
    colors: ["#F59E0B", "#FBBF24", "#FCD34D", "#FEF3C7", "#FFFBEB"],
  },
}
