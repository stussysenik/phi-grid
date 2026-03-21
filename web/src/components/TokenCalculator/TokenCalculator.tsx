import React, { useState, useMemo } from 'react'
import { usePhi } from 'src/context/PhiContext'
import { findNearestToken, fmt } from 'src/lib/phi'

const TokenCalculator: React.FC = () => {
  const { baseUnit } = usePhi()
  const [input, setInput] = useState('')

  const mono: React.CSSProperties = {
    fontFamily: "'IBM Plex Mono', monospace",
  }

  // Parse the input value to rem
  const parsedRem = useMemo(() => {
    const trimmed = input.trim().toLowerCase()
    if (!trimmed) return null

    // Match number + optional unit
    const match = trimmed.match(/^([\d.]+)\s*(px|rem|em)?$/)
    if (!match) return null

    const num = parseFloat(match[1])
    if (isNaN(num) || num <= 0) return null

    const unit = match[2] || 'px'
    switch (unit) {
      case 'px':
        return num / 16
      case 'rem':
      case 'em':
        return num
      default:
        return null
    }
  }, [input])

  const result = useMemo(() => {
    if (parsedRem === null) return null
    return findNearestToken(parsedRem, baseUnit)
  }, [parsedRem, baseUnit])

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--sp-xl)',
        padding: 'var(--sp-xl)',
        backgroundColor: 'var(--bg-primary)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        ...mono,
      }}
    >
      {/* Header */}
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
          Token Calculator
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: 'var(--fs-sm)',
            color: 'var(--text-secondary)',
            lineHeight: 'var(--lh-base)',
          }}
        >
          Enter a CSS value to find the nearest {'\u03C6'} token.
          Supports px, rem, and em units.
        </p>
      </header>

      {/* Input */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--sp-xs)',
        }}
      >
        <label
          style={{
            fontSize: 'var(--fs-xs)',
            fontWeight: 600,
            color: 'var(--text-primary)',
            letterSpacing: 'var(--ls-wide)',
            textTransform: 'uppercase',
          }}
        >
          Value
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. 24px, 1.5rem"
          style={{
            ...mono,
            padding: 'var(--sp-xs) var(--sp-sm)',
            fontSize: 'var(--fs-md)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            outline: 'none',
            maxWidth: 'calc(var(--bp-sm) / var(--phi))',
          }}
        />
      </div>

      {/* Results */}
      {result && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--sp-lg)',
          }}
        >
          {/* Best match */}
          <div
            style={{
              padding: 'var(--sp-lg)',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--interactive)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--sp-sm)',
            }}
          >
            <div
              style={{
                fontSize: 'var(--fs-xs)',
                fontWeight: 600,
                color: 'var(--interactive)',
                letterSpacing: 'var(--ls-wide)',
                textTransform: 'uppercase',
              }}
            >
              Best Match
            </div>
            <div
              style={{
                fontSize: 'var(--fs-lg)',
                fontWeight: 700,
                color: 'var(--text-primary)',
              }}
            >
              --sp-{result.exact.name}
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: 'var(--sp-2xs) var(--sp-lg)',
                fontSize: 'var(--fs-xs)',
                color: 'var(--text-secondary)',
              }}
            >
              <span>Formula</span>
              <span style={{ color: 'var(--text-primary)' }}>
                {result.exact.formula}
              </span>
              <span>Token value</span>
              <span style={{ color: 'var(--text-primary)' }}>
                {fmt(result.exact.value)} rem (
                {fmt(result.exact.value * 16)}px)
              </span>
              <span>Your value</span>
              <span style={{ color: 'var(--text-primary)' }}>
                {fmt(parsedRem!)} rem ({fmt(parsedRem! * 16)}px)
              </span>
              <span>Difference</span>
              <span
                style={{
                  color:
                    Math.abs(result.percentDiff) < 5
                      ? 'var(--overlay-content-color)'
                      : Math.abs(result.percentDiff) < 15
                      ? 'var(--overlay-margin-color)'
                      : 'var(--overlay-border-color)',
                  fontWeight: 600,
                }}
              >
                {result.percentDiff >= 0 ? '+' : ''}
                {fmt(result.percentDiff)}%
              </span>
            </div>
          </div>

          {/* Surrounding tokens */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--sp-sm)',
            }}
          >
            {result.lower && (
              <div
                style={{
                  padding: 'var(--sp-sm)',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div
                  style={{
                    fontSize: 'var(--fs-xs)',
                    color: 'var(--text-secondary)',
                    marginBottom: 'var(--sp-2xs)',
                  }}
                >
                  Smaller token
                </div>
                <div
                  style={{
                    fontSize: 'var(--fs-sm)',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                  }}
                >
                  --sp-{result.lower.name}
                </div>
                <div
                  style={{
                    fontSize: 'var(--fs-xs)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {fmt(result.lower.value)} rem ·{' '}
                  {result.lower.formula}
                </div>
              </div>
            )}
            {result.upper && (
              <div
                style={{
                  padding: 'var(--sp-sm)',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div
                  style={{
                    fontSize: 'var(--fs-xs)',
                    color: 'var(--text-secondary)',
                    marginBottom: 'var(--sp-2xs)',
                  }}
                >
                  Larger token
                </div>
                <div
                  style={{
                    fontSize: 'var(--fs-sm)',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                  }}
                >
                  --sp-{result.upper.name}
                </div>
                <div
                  style={{
                    fontSize: 'var(--fs-xs)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {fmt(result.upper.value)} rem ·{' '}
                  {result.upper.formula}
                </div>
              </div>
            )}
          </div>

          {/* Visual comparison */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--sp-xs)',
            }}
          >
            <div
              style={{
                fontSize: 'var(--fs-xs)',
                color: 'var(--text-secondary)',
                letterSpacing: 'var(--ls-wide)',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Visual Comparison
            </div>
            {/* Your value bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--sp-sm)',
              }}
            >
              <span
                style={{
                  fontSize: 'var(--fs-xs)',
                  color: 'var(--text-secondary)',
                  minWidth: 'var(--sp-3xl)',
                  textAlign: 'right',
                }}
              >
                yours
              </span>
              <div
                style={{
                  height: 'var(--sp-sm)',
                  width: `${Math.min(parsedRem! * 40, 100)}%`,
                  backgroundColor: 'var(--overlay-margin)',
                  border: '1px solid var(--overlay-margin-color)',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
            {/* Token value bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--sp-sm)',
              }}
            >
              <span
                style={{
                  fontSize: 'var(--fs-xs)',
                  color: 'var(--text-secondary)',
                  minWidth: 'var(--sp-3xl)',
                  textAlign: 'right',
                }}
              >
                --sp-{result.exact.name}
              </span>
              <div
                style={{
                  height: 'var(--sp-sm)',
                  width: `${Math.min(result.exact.value * 40, 100)}%`,
                  backgroundColor: 'var(--overlay-content)',
                  border: '1px solid var(--overlay-content-color)',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!result && input.trim() && (
        <div
          style={{
            padding: 'var(--sp-lg)',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--fs-xs)',
            color: 'var(--text-secondary)',
            textAlign: 'center',
          }}
        >
          Enter a valid value like "24px" or "1.5rem"
        </div>
      )}
    </section>
  )
}

export default TokenCalculator
