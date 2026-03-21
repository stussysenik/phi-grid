import React from 'react'
import SpacingScaleViz from './SpacingScaleViz'
import ComparisonChart from './ComparisonChart'

/**
 * Spacing Explorer Panel
 *
 * An educational panel that visualises the phi-based spacing scale
 * and compares it against linear and power-of-2 alternatives.
 *
 * Both sub-components react to baseUnit changes from PhiContext,
 * so adjusting the base slider dynamically rescales every bar.
 *
 * Layout:
 *   1. SpacingScaleViz   — 9 horizontal bars for each --sp-* token
 *   2. ComparisonChart   — 3 systems side by side
 */
const SpacingExplorerPanel: React.FC = () => {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--sp-2xl)',
        padding: 'var(--sp-xl)',
        backgroundColor: 'var(--bg-primary)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        fontFamily: "'IBM Plex Mono', monospace",
      }}
    >
      {/* Panel heading */}
      <header
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--sp-xs)',
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 'var(--fs-xl)',
            fontWeight: 600,
            color: 'var(--text-primary)',
            letterSpacing: 'var(--ls-tight)',
          }}
        >
          Spacing Explorer
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: 'var(--fs-sm)',
            color: 'var(--text-secondary)',
            lineHeight: 'var(--lh-base)',
          }}
        >
          Visualise every spacing token in the phi scale. Compare the golden
          ratio progression against linear multiples and power-of-2 systems
          to see why phi creates a more naturally balanced rhythm.
        </p>
      </header>

      {/* 1. Full spacing scale */}
      <SpacingScaleViz />

      {/* Divider */}
      <hr
        style={{
          margin: 0,
          border: 'none',
          borderTop: '1px solid var(--border-subtle)',
        }}
      />

      {/* 2. Comparison chart */}
      <ComparisonChart />
    </section>
  )
}

export default SpacingExplorerPanel
