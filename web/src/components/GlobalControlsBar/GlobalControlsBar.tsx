import React from 'react'
import { Slider } from '@carbon/react'
import { usePhi } from 'src/context/PhiContext'
import { PHI, fmt } from 'src/lib/phi'

// The controls bar sits between the header and the tab panels.
// It owns the base-unit slider — the single input that drives
// every computed value in the app. Changing x here recomputes
// all spacing tokens, font sizes, grid gaps, etc. in real time.
const GlobalControlsBar: React.FC = () => {
  const { baseUnit, setBaseUnit, scale } = usePhi()

  return (
    <div
      style={{
        // Column layout with φ-derived spacing keeps the controls bar
        // itself consistent with the design system it's demonstrating.
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--sp-xs)',
        padding: 'var(--sp-sm) var(--sp-lg)',
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-subtle)',
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 'var(--fs-xs)',
      }}
    >
      <Slider
        labelText="Base unit (x)"
        min={0.5}
        max={2.0}
        step={0.01}
        value={baseUnit}
        hideTextInput
        onChange={({ value }: { value: number }) => setBaseUnit(value)}
      />

      <div style={{ display: 'flex', gap: 'var(--sp-lg)', flexWrap: 'wrap' }}>
        <span>
          <strong>x</strong> = {baseUnit.toFixed(2)}rem
        </span>
        <span>
          <strong>φ</strong> = {PHI.toFixed(3)}
        </span>
        <span style={{ color: 'var(--text-secondary)' }}>
          x·φ⁻¹ = {fmt(scale.sm)} | x·φ¹ = {fmt(scale.lg)} | x·φ² = {fmt(scale.xl)}
        </span>
      </div>
    </div>
  )
}

export default GlobalControlsBar
