"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface ThemeContextType {
  theme: "light" | "dark"
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Check localStorage and system preference
    const stored = localStorage.getItem("theme") as "light" | "dark" | null
    if (stored) {
      setTheme(stored)
      applyTheme(stored)
    } else {
      // Use system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      const defaultTheme = prefersDark ? "dark" : "light"
      setTheme(defaultTheme)
      applyTheme(defaultTheme)
    }
  }, [])

  const applyTheme = (newTheme: "light" | "dark") => {
    const html = document.documentElement
    if (newTheme === "dark") {
      html.classList.add("dark")
      html.classList.remove("light")
    } else {
      html.classList.add("light")
      html.classList.remove("dark")
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    applyTheme(newTheme)
  }

  if (!isMounted) return <>{children}</>

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    return { theme: "dark" as const, toggleTheme: () => {} }
  }
  return context
}
