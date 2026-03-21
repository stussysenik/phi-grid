import React from 'react'
import { usePhi } from 'src/context/PhiContext'
import { SCALE_STEPS, fmt, phiPow } from 'src/lib/phi'

/**
 * Three spacing systems compared side by side.
 *
 * The golden-ratio system uses our actual SCALE_STEPS. The other
 * two are common alternatives — linear multiples and power-of-2 —
 * so designers can see how phi creates a more organic progression
 * than either mechanical alternative.
 */

interface SpacingSystem {
  name: string
  color: string
  /** Multipliers relative to the base unit */
  multipliers: { label: string; value: number }[]
}

const buildSystems = (): SpacingSystem[] => [
  {
    name: 'Golden Ratio (phi)',
    color: 'var(--interactive)',
    multipliers: SCALE_STEPS.map((s) => ({
      label: s.name,
      value: phiPow(s.exp),
    })),
  },
  {
    name: 'Linear',
    color: 'var(--overlay-margin-color)',
    multipliers: [
      { label: '0.25x', value: 0.25 },
      { label: '0.5x', value: 0.5 },
      { label: '1x', value: 1 },
      { label: '1.5x', value: 1.5 },
      { label: '2x', value: 2 },
      { label: '2.5x', value: 2.5 },
      { label: '3x', value: 3 },
      { label: '4x', value: 4 },
      { label: '6x', value: 6 },
    ],
  },
  {
    name: 'Power of 2',
    color: 'var(--overlay-content-color)',
    multipliers: [
      { label: '0.25x', value: 0.25 },
      { label: '0.5x', value: 0.5 },
      { label: '1x', value: 1 },
      { label: '2x', value: 2 },
      { label: '4x', value: 4 },
      { label: '8x', value: 8 },
    ],
  },
]

/**
 * Comparison Chart
 *
 * Shows three spacing systems stacked vertically, each with
 * horizontal bars representing their scale steps. The maximum
 * value across ALL systems normalises the bars so proportions
 * are directly comparable.
 */
const ComparisonChart: React.FC = () => {
  const { baseUnit } = usePhi()
  const systems = buildSystems()

  // Global max across every system for normalised bar widths
  const globalMax = Math.max(
    ...systems.flatMap((s) => s.multipliers.map((m) => m.value * baseUnit))
  )

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--sp-xl)',
      }}
    >
      <h3
        style={{
          margin: 0,
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 'var(--fs-sm)',
          color: 'var(--text-secondary)',
          letterSpacing: 'var(--ls-wide)',
          textTransform: 'uppercase',
        }}
      >
        Spacing System Comparison
      </h3>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 'var(--sp-lg)',
        }}
      >
        {systems.map((system) => (
          <div
            key={system.name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--sp-sm)',
            }}
          >
            {/* System header */}
            <h4
              style={{
                margin: 0,
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 'var(--fs-xs)',
                fontWeight: 600,
                color: system.color,
                letterSpacing: 'var(--ls-wide)',
              }}
            >
              {system.name}
            </h4>

            {/* Bars */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--sp-2xs)',
              }}
            >
              {system.multipliers.map((m) => {
                const computedValue = m.value * baseUnit
                const widthPercent = (computedValue / globalMax) * 100

                return (
                  <div
                    key={m.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--sp-xs)',
                    }}
                  >
                    {/* Step label */}
                    <span
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: 'var(--fs-xs)',
                        color: 'var(--text-secondary)',
                        minWidth: '3.5rem',
                        textAlign: 'right',
                      }}
                    >
                      {m.label}
                    </span>

                    {/* Bar track */}
                    <div
                      style={{
                        flex: 1,
                        height: 'var(--sp-sm)',
                        backgroundColor: 'var(--bg-tertiary)',
                        borderRadius: 'var(--radius-sm)',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${widthPercent}%`,
                          height: '100%',
                          backgroundColor: system.color,
                          borderRadius: 'var(--radius-sm)',
                          transition: 'width 0.3s ease',
                          opacity: 0.75,
                        }}
                      />
                    </div>

                    {/* Computed value */}
                    <span
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: 'var(--fs-xs)',
                        color: 'var(--text-placeholder)',
                        minWidth: '4rem',
                      }}
                    >
                      {fmt(computedValue)}rem
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ComparisonChart
