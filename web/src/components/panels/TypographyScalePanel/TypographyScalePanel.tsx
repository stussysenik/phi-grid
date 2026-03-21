import React from 'react'
import TypeScaleLadder from './TypeScaleLadder'
import LineHeightDemo from './LineHeightDemo'
import LetterSpacingDemo from './LetterSpacingDemo'

/**
 * TypographyScalePanel (Panel 4)
 *
 * Combines the three typography sub-components in a vertical layout:
 *
 *   1. TypeScaleLadder   — font-size staircase from xs to 4xl
 *   2. LineHeightDemo    — tight / base / loose line-height comparison
 *   3. LetterSpacingDemo — tight / base / wide letter-spacing comparison
 *
 * All values derive from the golden ratio and use the --fs-*, --lh-*,
 * and --ls-* CSS custom properties defined in phi-tokens.scss.
 */

const TypographyScalePanel: React.FC = () => {
  const mono: React.CSSProperties = {
    fontFamily: "'IBM Plex Mono', monospace",
  }

  const sectionHeading: React.CSSProperties = {
    ...mono,
    fontSize: 'var(--fs-sm)',
    fontWeight: 700,
    color: 'var(--text-secondary)',
    letterSpacing: 'var(--ls-wide)',
    textTransform: 'uppercase' as const,
    margin: 0,
    paddingBottom: 'var(--sp-xs)',
    borderBottom: '2px solid var(--interactive)',
  }

  const panelContainer: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--sp-xl)',
    padding: 'var(--sp-lg)',
  }

  const heading: React.CSSProperties = {
    ...mono,
    fontSize: 'var(--fs-lg)',
    fontWeight: 700,
    color: 'var(--text-primary)',
    margin: 0,
    letterSpacing: 'var(--ls-tight)',
  }

  const description: React.CSSProperties = {
    ...mono,
    fontSize: 'var(--fs-xs)',
    color: 'var(--text-secondary)',
    margin: 0,
    lineHeight: 'var(--lh-base)',
  }

  return (
    <section style={panelContainer}>
      {/* Panel header */}
      <div>
        <h2 style={heading}>Typography Scale</h2>
        <p style={description}>
          Every font size, line height, and letter spacing derives from {'\u03C6'}.
          IBM Plex Mono at each scale step.
        </p>
      </div>

      {/* 1. Font-size ladder */}
      <div>
        <h3 style={sectionHeading}>Font Size Scale</h3>
        <div style={{ marginTop: 'var(--sp-sm)' }}>
          <TypeScaleLadder />
        </div>
      </div>

      {/* 2. Line-height comparison */}
      <div>
        <h3 style={sectionHeading}>Line Height</h3>
        <div style={{ marginTop: 'var(--sp-sm)' }}>
          <LineHeightDemo />
        </div>
      </div>

      {/* 3. Letter-spacing comparison */}
      <div>
        <h3 style={sectionHeading}>Letter Spacing</h3>
        <div style={{ marginTop: 'var(--sp-sm)' }}>
          <LetterSpacingDemo />
        </div>
      </div>
    </section>
  )
}

export default TypographyScalePanel
