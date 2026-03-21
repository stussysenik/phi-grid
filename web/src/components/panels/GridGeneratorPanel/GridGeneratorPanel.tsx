import React, { useState } from 'react'
import GridPresetSelector from './GridPresetSelector'
import GridPreview from './GridPreview'
import GridCSSOutput from './GridCSSOutput'

/**
 * Grid Generator Panel
 *
 * An interactive playground that demonstrates how the golden ratio
 * can inform CSS grid layouts. Users pick from phi-derived presets
 * OR type custom grid-template-columns, see a live preview, and
 * copy the generated CSS.
 *
 * Layout (top to bottom):
 *   1. Mode toggle — Presets | Custom
 *   2. Preset selector or custom input
 *   3. Grid preview — live coloured cells
 *   4. CSS output — copyable code block
 */
type GridMode = 'presets' | 'custom'

const GridGeneratorPanel: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mode, setMode] = useState<GridMode>('presets')
  const [customColumns, setCustomColumns] = useState('1fr 1.618fr')
  const [customGap, setCustomGap] = useState('--sp-lg')

  const mono: React.CSSProperties = {
    fontFamily: "'IBM Plex Mono', monospace",
  }

  const GAP_OPTIONS = [
    { token: '--sp-xs', label: 'xs (φ⁻²)' },
    { token: '--sp-sm', label: 'sm (φ⁻¹)' },
    { token: '--sp-md', label: 'md (φ⁰)' },
    { token: '--sp-lg', label: 'lg (φ¹)' },
    { token: '--sp-xl', label: 'xl (φ²)' },
  ]

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
          Grid Generator
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: 'var(--fs-sm)',
            color: 'var(--text-secondary)',
            lineHeight: 'var(--lh-base)',
          }}
        >
          Explore CSS grid layouts derived from the golden ratio. Select a
          preset or define custom column ratios.
        </p>
      </header>

      {/* Mode toggle */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--sp-xs)',
        }}
      >
        {(['presets', 'custom'] as GridMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              ...mono,
              padding: 'var(--sp-xs) var(--sp-md)',
              fontSize: 'var(--fs-xs)',
              fontWeight: 600,
              border: `1px solid ${
                mode === m ? 'var(--interactive)' : 'var(--border-subtle)'
              }`,
              borderRadius: 'var(--radius-sm)',
              backgroundColor:
                mode === m ? 'var(--interactive)' : 'var(--bg-secondary)',
              color: mode === m ? '#fff' : 'var(--text-primary)',
              cursor: 'pointer',
              textTransform: 'capitalize',
              transition: 'all 0.15s ease',
            }}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Preset selector */}
      {mode === 'presets' && (
        <>
          <GridPresetSelector
            selectedIndex={selectedIndex}
            onChange={setSelectedIndex}
          />
          <GridPreview presetIndex={selectedIndex} />
          <GridCSSOutput presetIndex={selectedIndex} />
        </>
      )}

      {/* Custom grid builder */}
      {mode === 'custom' && (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--sp-sm)',
            }}
          >
            {/* Custom columns input */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--sp-2xs)',
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
                grid-template-columns
              </label>
              <input
                type="text"
                value={customColumns}
                onChange={(e) => setCustomColumns(e.target.value)}
                placeholder="e.g. 1fr 1.618fr 2.618fr"
                style={{
                  ...mono,
                  padding: 'var(--sp-xs) var(--sp-sm)',
                  fontSize: 'var(--fs-md)',
                  border: '1px solid var(--border-strong)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                }}
              />
              <span
                style={{
                  fontSize: 'var(--fs-xs)',
                  color: 'var(--text-secondary)',
                }}
              >
                Try: 1fr 1.618fr · repeat(3, 1fr) · 200px 1fr 200px
              </span>
            </div>

            {/* Gap selector */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--sp-2xs)',
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
                gap
              </label>
              <div style={{ display: 'flex', gap: 'var(--sp-2xs)', flexWrap: 'wrap' }}>
                {GAP_OPTIONS.map((opt) => (
                  <button
                    key={opt.token}
                    onClick={() => setCustomGap(opt.token)}
                    style={{
                      ...mono,
                      padding: 'var(--sp-2xs) var(--sp-xs)',
                      fontSize: 'var(--fs-xs)',
                      border: `1px solid ${
                        customGap === opt.token
                          ? 'var(--interactive)'
                          : 'var(--border-subtle)'
                      }`,
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor:
                        customGap === opt.token
                          ? 'var(--interactive)'
                          : 'var(--bg-secondary)',
                      color:
                        customGap === opt.token
                          ? '#fff'
                          : 'var(--text-primary)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Custom preview */}
          <GridPreview
            customColumns={customColumns}
            customGap={`var(${customGap})`}
          />
          <GridCSSOutput
            customColumns={customColumns}
            customGap={customGap}
          />
        </>
      )}
    </section>
  )
}

export default GridGeneratorPanel
