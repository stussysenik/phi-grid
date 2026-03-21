import React from 'react'

interface DimensionAnnotationProps {
  label: string
  direction?: 'horizontal' | 'vertical'
  color?: string
  size?: string | number
}

const DimensionAnnotation: React.FC<DimensionAnnotationProps> = ({
  label,
  direction = 'horizontal',
  color = 'var(--overlay-border-color)',
  size,
}) => {
  const isH = direction === 'horizontal'

  const lineStyle: React.CSSProperties = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...(isH
      ? {
          width: size || '100%',
          height: '1px',
          borderTop: `1px solid ${color}`,
          flexDirection: 'row',
        }
      : {
          height: size || '100%',
          width: '1px',
          borderLeft: `1px solid ${color}`,
          flexDirection: 'column',
        }),
  }

  const capStyle: React.CSSProperties = {
    position: 'absolute',
    backgroundColor: color,
    ...(isH
      ? { width: '1px', height: 'var(--sp-xs)', top: 'calc(var(--sp-xs) / -2)' }
      : { height: '1px', width: 'var(--sp-xs)', left: 'calc(var(--sp-xs) / -2)' }),
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 'var(--fs-xs)',
    color,
    backgroundColor: 'var(--bg-primary)',
    padding: '0 var(--sp-2xs)',
    whiteSpace: 'nowrap',
    lineHeight: 1,
  }

  return (
    <div style={lineStyle}>
      <div style={{ ...capStyle, ...(isH ? { left: 0 } : { top: 0 }) }} />
      <span style={labelStyle}>{label}</span>
      <div style={{ ...capStyle, ...(isH ? { right: 0 } : { bottom: 0 }) }} />
    </div>
  )
}

export default DimensionAnnotation
