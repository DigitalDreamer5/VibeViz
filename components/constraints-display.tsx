"use client"

interface ConstraintsDisplayProps {
  colorPalette?: string[]
  axisScale?: string
  labelingFocus?: string
  vibeScore?: number
}

export function ConstraintsDisplay({
  colorPalette = [],
  axisScale = "",
  labelingFocus = "",
  vibeScore = 0,
}: ConstraintsDisplayProps) {
  return (
    <div className="rounded-2xl p-6 border border-border bg-card/50 backdrop-blur-xl space-y-4">
      <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">📋 Design Constraints</h3>

      <div className="space-y-3">
        {/* Color Palette */}
        <div className="pb-4 border-b border-border/50">
          <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Color Palette</h4>
          <div className="flex gap-2">
            {colorPalette.map((color, idx) => (
              <div
                key={idx}
                className="w-8 h-8 rounded-lg border border-border shadow-lg hover:scale-110 transition-transform cursor-pointer"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Axis Scale */}
        <div className="pb-4 border-b border-border/50">
          <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Axis Scale</h4>
          <p className="text-sm text-foreground/50 leading-relaxed">{axisScale}</p>
        </div>

        {/* Labeling Focus */}
        <div>
          <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Labeling Focus</h4>
          <p className="text-sm text-foreground/50 leading-relaxed">{labelingFocus}</p>
        </div>
      </div>

      {vibeScore > 0 && (
        <div className="pt-4 border-t border-border/50 flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground/50 uppercase">VibeScore</span>
          <div className="flex items-center gap-2">
            <div className="w-20 h-1 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                style={{ width: `${vibeScore}%` }}
              />
            </div>
            <span className="text-xs font-bold text-primary">{vibeScore}%</span>
          </div>
        </div>
      )}
    </div>
  )
}
