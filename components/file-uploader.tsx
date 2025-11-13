"use client"

import type React from "react"
import { useState, useRef } from "react"
import { parseFile, type ParsedData } from "@/lib/file-parser"

interface FileUploaderProps {
  onFileUpload: (data: ParsedData, fileName: string) => void
  isLoading?: boolean
}

export function FileUploader({ onFileUpload, isLoading }: FileUploaderProps) {
  const [uploadError, setUploadError] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadError("")

    try {
      console.log("[v0] Parsing file:", file.name, file.type)
      const data = await parseFile(file)
      console.log("[v0] File parsed successfully:", data)
      onFileUpload(data, file.name)
      if (fileInputRef.current) fileInputRef.current.value = ""
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to parse file"
      console.log("[v0] Parse error:", errorMsg)
      setUploadError(errorMsg)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="rounded-lg p-6 text-center hover:border-primary/70 transition-all cursor-pointer border-2 border-dashed border-border bg-card/50 backdrop-blur-xl">
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.json,.xlsx,.xls,.txt"
        onChange={handleFileChange}
        disabled={isLoading || isUploading}
        className="hidden"
        aria-label="Upload data file"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isLoading || isUploading}
        className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="text-3xl mb-2">📁</div>
        <div className="font-semibold text-foreground mb-1">{isUploading ? "Uploading..." : "Upload your data"}</div>
        <div className="text-sm text-muted">CSV, JSON, Excel, TXT • Drag or click</div>
      </button>
      {uploadError && (
        <div className="mt-3 p-3 bg-destructive/20 border border-destructive/50 rounded text-sm text-destructive">
          ⚠️ {uploadError}
        </div>
      )}
    </div>
  )
}
