import React, { useState } from 'react'
import { ContentSwitcher, Switch, Toggle } from '@carbon/react'
import ButtonAnatomy from './ButtonAnatomy'
import CardAnatomy from './CardAnatomy'
import InputAnatomy from './InputAnatomy'

/**
 * ComponentAnatomyPanel (Panel 3)
 *
 * Uses Carbon's ContentSwitcher to toggle between Button / Card / Input
 * anatomy views. A Toggle controls whether the coloured overlays
 * (pink padding, orange bounding-box, green content) are visible.
 *
 * Architecture note: each anatomy sub-component reads phi scale values
 * from PhiContext so dimensions update live when the global base unit
 * changes.
 */

type AnatomyView = 'button' | 'card' | 'input'

const VIEWS: { key: AnatomyView; label: string }[] = [
  { key: 'button', label: 'Button' },
  { key: 'card', label: 'Card' },
  { key: 'input', label: 'Input' },
]

const ComponentAnatomyPanel: React.FC = () => {
  const [activeView, setActiveView] = useState<AnatomyView>('button')
  const [showOverlay, setShowOverlay] = useState(true)

  const mono: React.CSSProperties = {
    fontFamily: "'IBM Plex Mono', monospace",
  }

  const panelContainer: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--sp-lg)',
    padding: 'var(--sp-lg)',
  }

  const headerRow: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 'var(--sp-sm)',
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
      {/* Header */}
      <div style={headerRow}>
        <div>
          <h2 style={heading}>Component Anatomy</h2>
          <p style={description}>
            Every dimension derives from {'\u03C6'}. Toggle overlays to reveal
            padding, bounding-box, and content regions.
          </p>
        </div>

        <Toggle
          id="anatomy-overlay-toggle"
          labelText="Overlays"
          labelA="Off"
          labelB="On"
          toggled={showOverlay}
          onToggle={(checked: boolean) => setShowOverlay(checked)}
          size="sm"
        />
      </div>

      {/* View switcher */}
      <ContentSwitcher
        onChange={(e: { name: string | number }) => {
          const idx = typeof e.name === 'number' ? e.name : parseInt(e.name, 10)
          setActiveView(VIEWS[idx].key)
        }}
        size="sm"
      >
        {VIEWS.map((v, i) => (
          <Switch key={v.key} name={String(i)} text={v.label} />
        ))}
      </ContentSwitcher>

      {/* Anatomy view */}
      <div
        style={{
          border: '1px dashed var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-secondary)',
          minHeight: 'calc(var(--bp-sm) / var(--phi))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'auto',
        }}
      >
        {activeView === 'button' && (
          <ButtonAnatomy showOverlay={showOverlay} />
        )}
        {activeView === 'card' && <CardAnatomy showOverlay={showOverlay} />}
        {activeView === 'input' && <InputAnatomy showOverlay={showOverlay} />}
      </div>
    </section>
  )
}

export default ComponentAnatomyPanel
