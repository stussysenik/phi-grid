import React from 'react'
import { GRID_PRESETS, PHI, fmt } from 'src/lib/phi'
import CopyableCodeBlock from 'src/components/shared/CopyableCodeBlock/CopyableCodeBlock'

interface GridCSSOutputProps {
  /** Index into GRID_PRESETS (preset mode) */
  presetIndex?: number
  /** Custom grid-template-columns (custom mode) */
  customColumns?: string
  /** Custom gap token name (custom mode) */
  customGap?: string
}

/**
 * Generates copy-ready CSS for the selected grid preset or custom values.
 *
 * Uses phi design tokens (--sp-*) instead of raw pixel values
 * so the output is immediately usable in a phi-based design system.
 */
const GridCSSOutput: React.FC<GridCSSOutputProps> = ({
  presetIndex,
  customColumns,
  customGap,
}) => {
  const isCustom = customColumns !== undefined

  let css: string
  if (isCustom) {
    const gapToken = customGap || '--sp-lg'
    css = `/* Custom φ Grid */
.container {
  display: grid;
  grid-template-columns: ${customColumns};
  gap: var(${gapToken});
  padding: var(--sp-xl);       /* φ² = ${fmt(PHI * PHI)}rem */
}`
  } else {
    const preset = GRID_PRESETS[presetIndex ?? 0]
    css = `/* ${preset.name}: ${preset.description} */
.container {
  display: grid;
  grid-template-columns: ${preset.columns};
  gap: var(--sp-lg);           /* φ¹ = ${fmt(PHI)}rem */
  padding: var(--sp-xl);       /* φ² = ${fmt(PHI * PHI)}rem */
}

/* Column proportions: ${preset.ratios.map((r) => fmt(r)).join(' : ')} */`
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--sp-xs)',
      }}
    >
      <h4
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 'var(--fs-sm)',
          color: 'var(--text-secondary)',
          margin: 0,
          letterSpacing: 'var(--ls-wide)',
          textTransform: 'uppercase',
        }}
      >
        Generated CSS
      </h4>
      <CopyableCodeBlock code={css} language="css" />
    </div>
  )
}

export default GridCSSOutput
