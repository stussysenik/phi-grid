import React, { useState, useMemo } from 'react'
import { usePhi } from 'src/context/PhiContext'
import {
  generateCSSTokens,
  generateSCSSTokens,
  generateJSTokens,
  downloadFile,
} from 'src/lib/exportTokens'
import CopyableCodeBlock from 'src/components/shared/CopyableCodeBlock/CopyableCodeBlock'

type ExportFormat = 'css' | 'scss' | 'js'

const FORMATS: { key: ExportFormat; label: string; filename: string }[] = [
  { key: 'css', label: 'CSS', filename: 'phi-tokens.css' },
  { key: 'scss', label: 'SCSS', filename: 'phi-tokens.scss' },
  { key: 'js', label: 'JS / TS', filename: 'phi-tokens.ts' },
]

const ExportPanel: React.FC = () => {
  const { baseUnit } = usePhi()
  const [format, setFormat] = useState<ExportFormat>('css')

  const mono: React.CSSProperties = {
    fontFamily: "'IBM Plex Mono', monospace",
  }

  const tokens = useMemo(() => {
    switch (format) {
      case 'css':
        return generateCSSTokens(baseUnit)
      case 'scss':
        return generateSCSSTokens(baseUnit)
      case 'js':
        return generateJSTokens(baseUnit)
    }
  }, [baseUnit, format])

  const currentFormat = FORMATS.find((f) => f.key === format)!

  const handleDownload = () => {
    downloadFile(tokens, currentFormat.filename)
  }

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
          Export Design Tokens
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: 'var(--fs-sm)',
            color: 'var(--text-secondary)',
            lineHeight: 'var(--lh-base)',
          }}
        >
          Download the complete {'\u03C6'} token system for your project.
          All values reflect the current base unit ({baseUnit.toFixed(2)}rem).
        </p>
      </header>

      {/* Format selector */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--sp-xs)',
          flexWrap: 'wrap',
        }}
      >
        {FORMATS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFormat(f.key)}
            style={{
              ...mono,
              padding: 'var(--sp-xs) var(--sp-md)',
              fontSize: 'var(--fs-xs)',
              fontWeight: 600,
              border: `1px solid ${
                format === f.key ? 'var(--interactive)' : 'var(--border-subtle)'
              }`,
              borderRadius: 'var(--radius-sm)',
              backgroundColor:
                format === f.key ? 'var(--interactive)' : 'var(--bg-secondary)',
              color:
                format === f.key ? '#fff' : 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        style={{
          ...mono,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--sp-xs)',
          padding: 'var(--sp-sm) var(--sp-lg)',
          fontSize: 'var(--fs-sm)',
          fontWeight: 600,
          backgroundColor: 'var(--interactive)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          alignSelf: 'flex-start',
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M8 2v9M4 8l4 4 4-4M2 14h12" />
        </svg>
        Download {currentFormat.filename}
      </button>

      {/* Preview */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--sp-xs)',
        }}
      >
        <h4
          style={{
            fontSize: 'var(--fs-sm)',
            color: 'var(--text-secondary)',
            margin: 0,
            letterSpacing: 'var(--ls-wide)',
            textTransform: 'uppercase',
          }}
        >
          Preview — {currentFormat.filename}
        </h4>
        <CopyableCodeBlock
          code={tokens}
          language={format === 'js' ? 'typescript' : format}
        />
      </div>
    </section>
  )
}

export default ExportPanel
