"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function UserMenu() {
  const [open, setOpen] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    setToken(localStorage.getItem("vibeviz_auth_token"))
  }, [])

  function logout() {
    localStorage.removeItem("vibeviz_auth_token")
    router.push("/auth/sign-in")
  }

  if (!token) {
    return (
      <Link href="/auth/sign-in" className="px-3 py-1 rounded-md bg-card/40 border border-border text-foreground hover:bg-card/70">
        Sign in
      </Link>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex items-center gap-2 p-2 rounded-lg border border-border bg-card/40 hover:bg-card/70"
        aria-label="User menu"
      >
        <span className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">U</span>
        <span className="hidden md:inline text-sm text-foreground">Profile</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-card/50 border border-border rounded-lg p-2 shadow-lg z-50">
          <Link href="/profile" className="block px-3 py-2 rounded hover:bg-card/70">My Profile</Link>
          <button onClick={logout} className="w-full text-left px-3 py-2 rounded hover:bg-card/70">Logout</button>
        </div>
      )}
    </div>
  )
}
