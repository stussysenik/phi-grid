import React from 'react'
import { ContentSwitcher, Switch } from '@carbon/react'
import { GRID_PRESETS } from 'src/lib/phi'

interface GridPresetSelectorProps {
  /** Index of the currently selected preset */
  selectedIndex: number
  /** Callback when the user selects a different preset */
  onChange: (index: number) => void
}

/**
 * A ContentSwitcher that lists each GRID_PRESETS entry.
 *
 * Each switch displays the preset name. The description appears
 * below the switcher for the currently selected preset, keeping
 * the control compact while surfacing context.
 */
const GridPresetSelector: React.FC<GridPresetSelectorProps> = ({
  selectedIndex,
  onChange,
}) => {
  const preset = GRID_PRESETS[selectedIndex]

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--sp-sm)',
      }}
    >
      <ContentSwitcher
        selectedIndex={selectedIndex}
        onChange={(e: { index: number }) => onChange(e.index)}
      >
        {GRID_PRESETS.map((p, i) => (
          <Switch key={p.name} name={p.name} text={p.name} />
        ))}
      </ContentSwitcher>

      {/* Description of the selected preset */}
      <p
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 'var(--fs-sm)',
          color: 'var(--text-secondary)',
          margin: 0,
          paddingLeft: 'var(--sp-xs)',
        }}
      >
        {preset.description} &mdash;{' '}
        <code
          style={{
            fontSize: 'var(--fs-xs)',
            color: 'var(--interactive)',
          }}
        >
          {preset.columns}
        </code>
      </p>
    </div>
  )
}

export default GridPresetSelector
