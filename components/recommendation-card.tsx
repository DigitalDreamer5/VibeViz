"use client"

interface RecommendationCardProps {
  icon: string
  label: string
  value?: string
  description?: string
  colors?: string[]
}

export default function RecommendationCard({ icon, label, value, description, colors }: RecommendationCardProps) {
  return (
    <div className="rounded-xl p-4 border-l-2 border-l-primary hover:border-l-accent transition-colors bg-card/50 backdrop-blur-xl border border-border">
      <div className="flex items-start gap-3">
        <div className="text-xl">{icon}</div>
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">{label}</h4>
          {value && <p className="text-sm font-semibold text-foreground">{value}</p>}
          {description && <p className="text-xs text-foreground/50 mt-1">{description}</p>}
          {colors && (
            <div className="flex gap-2 mt-3">
              {colors.map((color, idx) => (
                <div
                  key={idx}
                  className="w-6 h-6 rounded-full border border-border"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
