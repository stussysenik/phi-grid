import React from 'react'
import { usePhi } from 'src/context/PhiContext'
import { PHI, fmt, phiPow } from 'src/lib/phi'

/**
 * TypeScaleLadder
 *
 * Renders a staircase / ladder of font sizes from --fs-xs to --fs-4xl.
 * Each step displays:
 *   1. Sample text rendered at that size (IBM Plex Mono)
 *   2. Token name (e.g. --fs-lg)
 *   3. φ formula (e.g. x·√φ)
 *   4. Computed px value
 *
 * The visual "stair" effect is created by progressively indenting each
 * row so the left edge forms a diagonal, making the exponential growth
 * of the golden ratio tangible.
 */

/**
 * Font-size scale steps with their φ exponents and formulas.
 * The exponents mirror phi-tokens.scss exactly.
 */
const FS_STEPS = [
  { token: 'xs',  exp: -1,   formula: 'x·φ⁻¹',    label: '--fs-xs' },
  { token: 'sm',  exp: -0.5, formula: 'x·φ⁻⁰·⁵',  label: '--fs-sm' },
  { token: 'md',  exp: 0,    formula: 'x·φ⁰',      label: '--fs-md' },
  { token: 'lg',  exp: 0.5,  formula: 'x·√φ',      label: '--fs-lg' },
  { token: 'xl',  exp: 1,    formula: 'x·φ¹',      label: '--fs-xl' },
  { token: '2xl', exp: 1.5,  formula: 'x·φ¹·⁵',   label: '--fs-2xl' },
  { token: '3xl', exp: 2,    formula: 'x·φ²',      label: '--fs-3xl' },
  { token: '4xl', exp: 3,    formula: 'x·φ³',      label: '--fs-4xl' },
] as const

const TypeScaleLadder: React.FC = () => {
  const { baseUnit } = usePhi()

  const mono: React.CSSProperties = {
    fontFamily: "'IBM Plex Mono', monospace",
  }

  const container: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--sp-xs)',
  }

  return (
    <div style={container}>
      {FS_STEPS.map((step, index) => {
        const rem = baseUnit * phiPow(step.exp)
        const px = rem * 16

        return (
          <div
            key={step.token}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 'var(--sp-sm)',
              paddingLeft: `calc(var(--sp-sm) * ${index})`,
              borderLeft: '2px solid var(--interactive)',
              paddingBottom: 'var(--sp-2xs)',
              paddingTop: 'var(--sp-2xs)',
            }}
          >
            {/* Sample text at the actual font size */}
            <span
              style={{
                ...mono,
                fontSize: `var(--fs-${step.token})`,
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
                minWidth: '3ch',
              }}
            >
              Aa
            </span>

            {/* Meta information */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--sp-2xs)',
              }}
            >
              <span
                style={{
                  ...mono,
                  fontSize: 'var(--fs-xs)',
                  fontWeight: 600,
                  color: 'var(--interactive)',
                }}
              >
                {step.label}
              </span>
              <span
                style={{
                  ...mono,
                  fontSize: 'var(--fs-xs)',
                  color: 'var(--text-secondary)',
                }}
              >
                {step.formula} = {fmt(rem)} rem ({Math.round(px)}px)
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TypeScaleLadder
