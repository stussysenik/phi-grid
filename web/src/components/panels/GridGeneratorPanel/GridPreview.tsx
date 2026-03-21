import React from 'react'
import { GRID_PRESETS, PHI, fmt } from 'src/lib/phi'

interface GridPreviewProps {
  /** Index into GRID_PRESETS (used in preset mode) */
  presetIndex?: number
  /** Custom grid-template-columns value (used in custom mode) */
  customColumns?: string
  /** Custom gap value (used in custom mode) */
  customGap?: string
}

/**
 * Colour palette for grid cells — cycles through these
 * soft, theme-aware tones derived from overlay variables.
 */
const CELL_COLORS = [
  'var(--overlay-content)',
  'var(--overlay-padding)',
  'var(--overlay-margin)',
  'rgba(79, 70, 229, 0.2)',
]

const CELL_BORDER_COLORS = [
  'var(--overlay-content-color)',
  'var(--overlay-border-color)',
  'var(--overlay-margin-color)',
  '#4f46e5',
]

/**
 * Parse a grid-template-columns string to estimate the number
 * of columns for rendering preview cells.
 */
function estimateColumnCount(columns: string): number {
  const repeatMatch = columns.match(/repeat\(\s*(\d+)\s*,/)
  if (repeatMatch) return parseInt(repeatMatch[1], 10)
  // Count space-separated tokens
  return columns.trim().split(/\s+/).length
}

/**
 * Live preview of the selected grid preset or custom columns.
 */
const GridPreview: React.FC<GridPreviewProps> = ({
  presetIndex,
  customColumns,
  customGap,
}) => {
  const isCustom = customColumns !== undefined
  const columns = isCustom
    ? customColumns
    : GRID_PRESETS[presetIndex ?? 0].columns
  const gap = isCustom ? (customGap || 'var(--sp-lg)') : 'var(--sp-lg)'
  const colCount = isCustom
    ? estimateColumnCount(customColumns)
    : (GRID_PRESETS[presetIndex ?? 0].ratios as readonly number[]).length

  // For presets, use actual ratios; for custom, generate equal placeholders
  const preset = !isCustom ? GRID_PRESETS[presetIndex ?? 0] : null
  const ratios = preset
    ? (preset.ratios as readonly number[])
    : Array.from({ length: colCount }, () => 1)
  const totalRatio = ratios.reduce((sum, r) => sum + r, 0)

  // Suggest nearest φ ratio for custom columns
  const suggestion = isCustom ? getSuggestion(customColumns) : null

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--sp-md)',
      }}
    >
      {/* φ suggestion for custom grids */}
      {suggestion && (
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 'var(--fs-xs)',
            color: 'var(--interactive)',
            padding: 'var(--sp-xs) var(--sp-sm)',
            backgroundColor: 'var(--highlight)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--interactive)',
          }}
        >
          {suggestion}
        </div>
      )}

      {/* Grid container */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: columns,
          gap,
          padding: 'var(--sp-xl)',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          minHeight: 'calc(var(--sp-3xl) * 2)',
        }}
      >
        {ratios.map((ratio, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--sp-xs)',
              padding: 'var(--sp-lg)',
              backgroundColor: CELL_COLORS[i % CELL_COLORS.length],
              border: `2px dashed ${CELL_BORDER_COLORS[i % CELL_BORDER_COLORS.length]}`,
              borderRadius: 'var(--radius-sm)',
              minHeight: 'var(--sp-3xl)',
            }}
          >
            {/* Column number */}
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 'var(--fs-lg)',
                fontWeight: 600,
                color: CELL_BORDER_COLORS[i % CELL_BORDER_COLORS.length],
              }}
            >
              {i + 1}
            </span>

            {/* Relative width label */}
            {preset && (
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 'var(--fs-xs)',
                  color: 'var(--text-secondary)',
                }}
              >
                {ratio === 1 ? '1fr' : `${fmt(ratio)}fr`}
              </span>
            )}

            {/* Percentage of total */}
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 'var(--fs-xs)',
                color: 'var(--text-placeholder)',
              }}
            >
              {preset ? `${fmt(ratio / totalRatio * 100)}%` : `col ${i + 1}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Analyze custom column values and suggest φ-based alternatives.
 */
function getSuggestion(columns: string): string | null {
  // Try to parse numeric fr values
  const frValues = columns
    .trim()
    .split(/\s+/)
    .map((token) => {
      const match = token.match(/^([\d.]+)fr$/)
      return match ? parseFloat(match[1]) : null
    })
    .filter((v): v is number => v !== null)

  if (frValues.length < 2) return null

  // Check if the ratio between adjacent columns is close to φ
  for (let i = 0; i < frValues.length - 1; i++) {
    const ratio = frValues[i + 1] / frValues[i]
    if (Math.abs(ratio - PHI) < 0.15) {
      return `Columns ${i + 1}–${i + 2} are close to the golden ratio (${fmt(ratio)} ≈ φ = ${fmt(PHI)})`
    }
    if (Math.abs(ratio - 1 / PHI) < 0.1) {
      return `Columns ${i + 1}–${i + 2} are close to the inverse golden ratio (${fmt(ratio)} ≈ 1/φ = ${fmt(1 / PHI)})`
    }
  }

  // Check if total ratio matches common phi patterns
  const total = frValues.reduce((s, v) => s + v, 0)
  if (frValues.length === 2) {
    const r = frValues[1] / frValues[0]
    if (Math.abs(r - PHI) > 0.15) {
      return `Your ratio is ${fmt(r)}:1 — golden ratio would be 1fr ${fmt(PHI)}fr`
    }
  }

  return null
}

export default GridPreview
