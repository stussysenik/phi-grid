import React from 'react'

/**
 * LineHeightDemo
 *
 * Three side-by-side paragraphs of sample text, each rendered with a
 * different φ-derived line-height:
 *
 *   --lh-tight  = 1.236  (compact reading)
 *   --lh-base   = 1.618  (φ itself — the golden line height)
 *   --lh-loose  = 2.058  (φ^1.5 — generous whitespace)
 *
 * Horizontal rule-lines drawn behind the text make the spacing between
 * baselines visible.
 */

const SAMPLE_TEXT =
  'The golden ratio appears throughout nature — in the spiral of a nautilus shell, the branching of trees, and the arrangement of leaves around a stem.'

interface LineHeightEntry {
  token: string
  cssVar: string
  value: string
  formula: string
}

const LINE_HEIGHTS: LineHeightEntry[] = [
  { token: '--lh-tight', cssVar: 'var(--lh-tight)', value: '1.236', formula: '1 + (φ−1)²' },
  { token: '--lh-base',  cssVar: 'var(--lh-base)',  value: '1.618', formula: 'φ' },
  { token: '--lh-loose', cssVar: 'var(--lh-loose)', value: '2.058', formula: 'φ¹·⁵' },
]

const LineHeightDemo: React.FC = () => {
  const mono: React.CSSProperties = {
    fontFamily: "'IBM Plex Mono', monospace",
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'var(--sp-lg)',
      }}
    >
      {LINE_HEIGHTS.map((lh) => (
        <div
          key={lh.token}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--sp-xs)',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--sp-2xs)',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: 'var(--sp-xs)',
            }}
          >
            <span
              style={{
                ...mono,
                fontSize: 'var(--fs-xs)',
                fontWeight: 700,
                color: 'var(--interactive)',
              }}
            >
              {lh.token}
            </span>
            <span
              style={{
                ...mono,
                fontSize: 'var(--fs-xs)',
                color: 'var(--text-secondary)',
              }}
            >
              {lh.value} ({lh.formula})
            </span>
          </div>

          {/* Sample paragraph with background lines */}
          <div
            style={{
              position: 'relative',
              padding: 'var(--sp-xs)',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
            }}
          >
            {/* Horizontal rule-lines to visualise line spacing */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'linear-gradient(var(--border-subtle) 1px, transparent 1px)',
                backgroundSize: `100% calc(var(--fs-md) * ${lh.value})`,
                opacity: 0.5,
                pointerEvents: 'none',
              }}
            />

            <p
              style={{
                ...mono,
                fontSize: 'var(--fs-md)',
                lineHeight: lh.cssVar,
                color: 'var(--text-primary)',
                margin: 0,
                position: 'relative',
              }}
            >
              {SAMPLE_TEXT}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LineHeightDemo
