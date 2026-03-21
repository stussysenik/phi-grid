import React from 'react'

interface PhiValueBadgeProps {
  name: string
  formula: string
  value: number
  unit?: string
  color?: string
}

const PhiValueBadge: React.FC<PhiValueBadgeProps> = ({
  name,
  formula,
  value,
  unit = 'rem',
  color = 'var(--interactive)',
}) => {
  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'baseline',
    gap: 'var(--sp-xs)',
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 'var(--fs-xs)',
    padding: 'var(--sp-2xs) var(--sp-xs)',
    borderRadius: 'var(--radius-sm)',
    border: `1px solid ${color}`,
    color,
    backgroundColor: 'var(--bg-secondary)',
    lineHeight: 1.4,
  }

  return (
    <span style={style}>
      <strong>--sp-{name}</strong>
      <span style={{ color: 'var(--text-secondary)' }}>{formula}</span>
      <span>{value.toFixed(3)}{unit}</span>
    </span>
  )
}

export default PhiValueBadge
