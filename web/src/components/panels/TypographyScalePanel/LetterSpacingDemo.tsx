import React from 'react'

/**
 * LetterSpacingDemo
 *
 * Large heading text rendered with three φ-derived letter-spacing values:
 *
 *   --ls-tight  = −0.02em  (dense headings)
 *   --ls-base   =  0em     (neutral)
 *   --ls-wide   =  0.06em  (≈ φ⁻³ — airy small-caps / labels)
 *
 * The text is set large (--fs-3xl) so the spacing differences are
 * immediately visible.
 */

interface LSEntry {
  token: string
  cssVar: string
  value: string
  note: string
}

const LS_VALUES: LSEntry[] = [
  { token: '--ls-tight', cssVar: 'var(--ls-tight)', value: '-0.02em', note: 'dense headings' },
  { token: '--ls-base',  cssVar: 'var(--ls-base)',  value: '0em',     note: 'neutral / body' },
  { token: '--ls-wide',  cssVar: 'var(--ls-wide)',  value: '0.06em',  note: '\u2248 \u03C6\u207B\u00B3 \u2014 labels & small-caps' },
]

const LetterSpacingDemo: React.FC = () => {
  const mono: React.CSSProperties = {
    fontFamily: "'IBM Plex Mono', monospace",
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--sp-lg)',
      }}
    >
      {LS_VALUES.map((ls) => (
        <div
          key={ls.token}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--sp-2xs)',
            paddingBottom: 'var(--sp-sm)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          {/* Meta label */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 'var(--sp-sm)',
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
              {ls.token}
            </span>
            <span
              style={{
                ...mono,
                fontSize: 'var(--fs-xs)',
                color: 'var(--text-secondary)',
              }}
            >
              {ls.value}
            </span>
            <span
              style={{
                ...mono,
                fontSize: 'var(--fs-xs)',
                color: 'var(--text-placeholder)',
              }}
            >
              {ls.note}
            </span>
          </div>

          {/* Large sample text */}
          <span
            style={{
              ...mono,
              fontSize: 'var(--fs-3xl)',
              fontWeight: 700,
              letterSpacing: ls.cssVar,
              color: 'var(--text-primary)',
              lineHeight: 'var(--lh-tight)',
            }}
          >
            Golden Ratio
          </span>
        </div>
      ))}
    </div>
  )
}

export default LetterSpacingDemo
