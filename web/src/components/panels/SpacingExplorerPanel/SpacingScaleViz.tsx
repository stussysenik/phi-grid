import React from 'react'
import { usePhi } from 'src/context/PhiContext'
import { SCALE_STEPS, fmt } from 'src/lib/phi'
import PhiValueBadge from 'src/components/shared/PhiValueBadge/PhiValueBadge'

/**
 * Gradient stops for the 9 scale steps.
 *
 * Progresses from cool (small values) to warm (large values),
 * creating an intuitive visual mapping between colour and magnitude.
 */
const GRADIENT_COLORS = [
  '#0f62fe', // 2xs — IBM blue
  '#4589ff', // xs
  '#6929c4', // sm  — purple
  '#9f1853', // md  — magenta
  '#a2191f', // sqrt— red
  '#da1e28', // lg
  '#ff832b', // xl  — orange
  '#f1c21b', // 2xl — yellow
  '#24a148', // 3xl — green
]

/**
 * Spacing Scale Visualization
 *
 * Renders all 9 phi-derived spacing tokens as horizontal bars.
 * Each bar's width is proportional to the token value relative
 * to the largest token (3xl), so the visual directly maps to
 * the mathematical relationship between steps.
 *
 * Reacts to baseUnit changes from PhiContext.
 */
const SpacingScaleViz: React.FC = () => {
  const { scale } = usePhi()

  // Largest value sets the 100% reference for bar widths
  const maxValue = scale['3xl']

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--sp-sm)',
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
        Spacing Scale
      </h3>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--sp-xs)',
        }}
      >
        {SCALE_STEPS.map((step, i) => {
          const value = scale[step.name]
          const widthPercent = (value / maxValue) * 100

          return (
            <div
              key={step.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--sp-md)',
              }}
            >
              {/* Token name label — fixed width for alignment */}
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 'var(--fs-xs)',
                  color: 'var(--text-primary)',
                  minWidth: '6rem',
                  textAlign: 'right',
                }}
              >
                --sp-{step.name}
              </span>

              {/* Bar container */}
              <div
                style={{
                  flex: 1,
                  position: 'relative',
                  height: 'var(--sp-lg)',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                }}
              >
                {/* Filled bar */}
                <div
                  style={{
                    width: `${widthPercent}%`,
                    height: '100%',
                    backgroundColor: GRADIENT_COLORS[i],
                    borderRadius: 'var(--radius-sm)',
                    transition: 'width 0.3s ease',
                    opacity: 0.85,
                  }}
                />
              </div>

              {/* Badge with formula and computed value */}
              <PhiValueBadge
                name={step.name}
                formula={step.formula}
                value={value}
                color={GRADIENT_COLORS[i]}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SpacingScaleViz
