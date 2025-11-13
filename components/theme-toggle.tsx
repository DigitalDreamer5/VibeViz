"use client"

import { useTheme } from "./theme-provider"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  if (!theme || !toggleTheme) {
    return null
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg border border-border bg-card/40 hover:bg-card/70 transition-colors hover:border-primary/60 flex items-center justify-center"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.293 1.293a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zm2.828 2.828a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM10 7a3 3 0 100 6 3 3 0 000-6zm-4.293-1.293a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM3 10a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm10.657 5.657a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM10 17a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4.657-1.343a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM3.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  )
}
