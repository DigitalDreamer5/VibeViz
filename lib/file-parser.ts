export interface ParsedData {
  headers: string[]
  rows: Record<string, string | number>[]
}

export async function parseFile(file: File): Promise<ParsedData> {
  const fileName = file.name.toLowerCase()

  if (fileName.endsWith(".csv")) {
    return parseCSV(await file.text())
  } else if (fileName.endsWith(".json")) {
    return parseJSON(await file.text())
  } else if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
    return parseExcel(await file.arrayBuffer())
  } else if (fileName.endsWith(".txt")) {
    // Try CSV parsing for plain text
    return parseCSV(await file.text())
  } else {
    throw new Error("Unsupported file format. Please use CSV, JSON, Excel, or TXT.")
  }
}

function parseCSV(content: string): ParsedData {
  const lines = content.trim().split("\n")
  if (lines.length < 2) throw new Error("CSV file must have at least 2 rows")

  const headers = lines[0].split(",").map((h) => h.trim())
  const rows = lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim())
    const row: Record<string, string | number> = {}
    headers.forEach((header, idx) => {
      const value = values[idx]
      row[header] = isNaN(Number(value)) ? value : Number(value)
    })
    return row
  })

  return { headers, rows }
}

function parseJSON(content: string): ParsedData {
  const data = JSON.parse(content)

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("JSON must be an array of objects")
  }

  const headers = Object.keys(data[0])
  const rows = data.map((obj) => {
    const row: Record<string, string | number> = {}
    headers.forEach((header) => {
      const value = obj[header]
      row[header] = value
    })
    return row
  })

  return { headers, rows }
}

async function parseExcel(buffer: ArrayBuffer): Promise<ParsedData> {
  // Use 'xlsx' package to parse XLS/XLSX in the browser
  try {
    const XLSX: any = await import("xlsx")
    const workbook = XLSX.read(buffer, { type: "array" })
    const sheetName = workbook.SheetNames[0]
    if (!sheetName) throw new Error("Excel file contains no sheets")
    const sheet = workbook.Sheets[sheetName]
    const json = XLSX.utils.sheet_to_json(sheet, { defval: "" })

    if (!Array.isArray(json) || json.length === 0) {
      throw new Error("Excel sheet is empty or malformed")
    }

    const headers = Object.keys(json[0])
    const rows = json.map((obj: any) => {
      const row: Record<string, string | number> = {}
      headers.forEach((h) => {
        const value = obj[h]
        row[h] = typeof value === "number" ? value : value === null || value === undefined ? "" : String(value)
      })
      return row
    })

    return { headers, rows }
  } catch (err) {
    // If dynamic import fails or parsing fails, surface a clear message
    console.error("Excel parse error:", err)
    throw new Error("Unable to parse Excel file. Please convert to CSV or JSON.")
  }
}

export function inferChartType(headers: string[], rows: ParsedData["rows"]): string {
  if (headers.length === 1) return "Histogram"
  if (headers.length === 2) {
    // Check if one column is numeric and one is categorical
    const numericCount = headers.filter((h) => {
      return rows.every((row) => typeof row[h] === "number" || !isNaN(Number(row[h])))
    }).length

    if (numericCount === 2) return "Scatter Plot"
    return "Bar Chart"
  }

  // Multi-column data
  const numericColumns = headers.filter((h) =>
    rows.every((row) => {
      const val = row[h]
      return typeof val === "number" || (typeof val === "string" && !isNaN(Number(val)))
    }),
  )

  if (numericColumns.length >= 2) return "Line Chart"
  return "Bar Chart"
}

export function getNumericColumns(headers: string[], rows: ParsedData["rows"]): string[] {
  return headers.filter((h) =>
    rows.every((row) => {
      const val = row[h]
      return typeof val === "number" || (typeof val === "string" && !isNaN(Number(val)) && val !== "")
    }),
  )
}
