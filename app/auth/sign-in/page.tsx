"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!email || !password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      localStorage.setItem("vibeviz_user", JSON.stringify({ email, name: email.split("@")[0] }))
      localStorage.setItem("vibeviz_auth_token", "demo_token_" + Date.now())
      router.push("/tool")
    } catch (err) {
      setError("Sign in failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    localStorage.setItem("vibeviz_user", JSON.stringify({ email: "user@gmail.com", name: "Google User" }))
    localStorage.setItem("vibeviz_auth_token", "demo_token_" + Date.now())
    router.push("/tool")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ background: "var(--primary)" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ background: "var(--secondary)" }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Title */}
        <div className="mb-12 text-center animate-fadeIn">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold mx-auto mb-4"
            style={{
              background: "linear-gradient(to right, var(--primary), var(--accent), var(--secondary))",
            }}
          >
            V
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to VibeViz</h1>
          <p className="text-foreground/50 text-sm">AI-powered chart recommendations for better data storytelling</p>
        </div>

        {/* Sign-in Card */}
        <div className="rounded-2xl p-8 backdrop-blur-xl border border-border bg-card/50 shadow-xl animate-scaleIn">
          <form onSubmit={handleSignIn} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-foreground">Password</label>
                <Link href="/auth/forgot-password" className="text-xs text-primary hover:text-accent transition-colors">
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                disabled={isLoading}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-destructive/20 border border-destructive/50 text-destructive text-sm">
                {error}
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg text-primary-foreground font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(to right, var(--primary), var(--accent), var(--secondary))",
                boxShadow: "0 0 20px rgba(255, 0, 110, 0.4)",
              }}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <span>✨</span>
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs font-medium text-foreground/50 uppercase tracking-wider">or continue with</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Social Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-3 rounded-lg border-2 border-border bg-card/40 text-foreground font-semibold hover:bg-card/70 hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>🔷</span>
            Google
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-foreground/50 mt-6">
            Don't have an account?{" "}
            <Link href="/auth/sign-up" className="text-primary font-medium hover:text-accent transition-colors">
              Sign up
            </Link>
          </p>
        </div>

        {/* Footer */}
  <p className="text-center text-xs text-foreground/50 mt-8">
          By signing in, you agree to our{" "}
          <Link href="#" className="text-primary hover:text-accent transition-colors">
            Terms of Service
          </Link>
        </p>
      </div>
    </div>
  )
}
