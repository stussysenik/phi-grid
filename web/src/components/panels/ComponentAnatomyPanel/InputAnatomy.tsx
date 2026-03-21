import React from 'react'
import { usePhi } from 'src/context/PhiContext'
import { fmt } from 'src/lib/phi'
import DimensionAnnotation from 'src/components/shared/DimensionAnnotation/DimensionAnnotation'
import CopyableCodeBlock from 'src/components/shared/CopyableCodeBlock/CopyableCodeBlock'

/**
 * InputAnatomy
 *
 * A text input with every φ-based dimension annotated:
 *
 *   Horizontal padding: --sp-sm   (φ⁻¹ ≈ 0.618 rem)
 *   Vertical padding:   --sp-xs   (φ⁻² ≈ 0.382 rem)
 *   Border-radius:      --radius-sm (φ⁻² ≈ 0.382 rem)
 *   Label spacing:      --sp-xs   (φ⁻² ≈ 0.382 rem)
 *   Helper text gap:    --sp-2xs  (φ⁻³ ≈ 0.236 rem)
 */

interface InputAnatomyProps {
  showOverlay?: boolean
}

const InputAnatomy: React.FC<InputAnatomyProps> = ({
  showOverlay = true,
}) => {
  const { scale } = usePhi()

  const pink = 'var(--overlay-padding)'
  const orange = 'var(--overlay-margin)'
  const green = 'var(--overlay-content)'
  const pinkLine = 'var(--overlay-border-color)'
  const orangeLine = 'var(--overlay-margin-color)'
  const greenLine = 'var(--overlay-content-color)'

  const mono: React.CSSProperties = {
    fontFamily: "'IBM Plex Mono', monospace",
  }

  const container: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--sp-xl)',
    padding: 'var(--sp-2xl) var(--sp-lg)',
  }

  /* Annotation offset tokens */
  const annotationOffset = 'calc(-1 * var(--sp-lg) - var(--sp-2xs))'
  const sideOffset = 'calc(-1 * (var(--sp-xl) + var(--sp-xs)))'

  /* Full input group wrapper – orange bounding box */
  const groupWrapper: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--sp-xs)',
    width: 'calc(var(--bp-sm) / var(--phi))',
    maxWidth: '100%',
    ...(showOverlay
      ? {
          padding: 'var(--sp-xs)',
          backgroundColor: orange,
          borderRadius: 'calc(var(--radius-sm) + var(--sp-xs))',
          outline: `2px dashed ${orangeLine}`,
          outlineOffset: '2px',
        }
      : {}),
  }

  /* Label */
  const labelStyle: React.CSSProperties = {
    ...mono,
    fontSize: 'var(--fs-xs)',
    fontWeight: 600,
    color: 'var(--text-primary)',
    letterSpacing: 'var(--ls-wide)',
    textTransform: 'uppercase' as const,
  }

  /* Input field with padding overlay */
  const inputWrapper: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 'var(--radius-sm)',
    border: `1px solid var(--border-strong)`,
    backgroundColor: showOverlay ? pink : 'var(--bg-primary)',
    paddingLeft: 'var(--sp-sm)',
    paddingRight: 'var(--sp-sm)',
    paddingTop: 'var(--sp-xs)',
    paddingBottom: 'var(--sp-xs)',
  }

  /* Input text content */
  const inputContent: React.CSSProperties = {
    ...mono,
    fontSize: 'var(--fs-md)',
    color: 'var(--text-primary)',
    flex: 1,
    borderRadius: 'var(--sp-2xs)',
    padding: 'var(--sp-2xs)',
    ...(showOverlay ? { backgroundColor: green } : {}),
  }

  /* Helper text */
  const helperStyle: React.CSSProperties = {
    ...mono,
    fontSize: 'var(--fs-xs)',
    color: 'var(--text-secondary)',
    marginTop: 'calc(var(--sp-2xs) - var(--sp-xs))',
  }

  /* ── code generation ────────────────────────────────────────── */
  const inputHTML = `<div class="phi-input-group">
  <label class="phi-input-group__label">Input Label</label>
  <input class="phi-input-group__input"
         type="text"
         placeholder="Placeholder text" />
  <span class="phi-input-group__helper">Helper text</span>
</div>`

  const inputCSS = `/* φ Input — include phi-tokens.css first */
.phi-input-group {
  display: flex;
  flex-direction: column;
  gap: var(--sp-xs);             /* ${fmt(scale['xs'])}rem — φ⁻² */
  max-width: 20rem;
}

.phi-input-group__label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: var(--fs-xs);
  font-weight: 600;
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
  color: var(--text-primary);
}

.phi-input-group__input {
  font-family: 'IBM Plex Mono', monospace;
  font-size: var(--fs-md);
  padding: var(--sp-xs) var(--sp-sm);  /* v: ${fmt(scale['xs'])}rem, h: ${fmt(scale['sm'])}rem */
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-sm);     /* φ⁻² = ${fmt(scale['xs'])}rem */
  background-color: var(--bg-primary);
  color: var(--text-primary);
  outline: none;
}

.phi-input-group__helper {
  font-family: 'IBM Plex Mono', monospace;
  font-size: var(--fs-xs);
  color: var(--text-secondary);
  margin-top: calc(var(--sp-2xs) - var(--sp-xs));
}`

  return (
    <div style={container}>
      <div style={{ position: 'relative', display: 'inline-flex' }}>
        <div style={groupWrapper}>
          {/* Label */}
          <label style={labelStyle}>Input Label</label>

          {/* Spacer annotation – label-to-input gap */}
          <div style={inputWrapper}>
            <div style={inputContent}>
              Placeholder text
            </div>
          </div>

          {/* Helper text */}
          <span style={helperStyle}>Helper text using --sp-2xs gap</span>
        </div>

        {/* ── Annotations ────────────────────────────────────── */}
        {showOverlay && (
          <>
            {/* Horizontal padding */}
            <div
              style={{
                position: 'absolute',
                bottom: annotationOffset,
                left: showOverlay ? 'var(--sp-xs)' : 0,
                width: 'var(--sp-sm)',
              }}
            >
              <DimensionAnnotation
                label="φ⁻¹"
                direction="horizontal"
                color={pinkLine}
              />
            </div>

            {/* Vertical padding */}
            <div
              style={{
                position: 'absolute',
                right: sideOffset,
                top: 'calc(var(--sp-xs) + var(--fs-xs) + var(--sp-xs) * 2)',
                height: 'var(--sp-xs)',
              }}
            >
              <DimensionAnnotation
                label="φ⁻²"
                direction="vertical"
                color={pinkLine}
              />
            </div>

            {/* Border-radius */}
            <div
              style={{
                position: 'absolute',
                top: `calc(var(--sp-xs) + var(--fs-xs) + var(--sp-xs) + ${annotationOffset})`,
                left: showOverlay ? 'var(--sp-xs)' : 0,
                width: 'var(--radius-sm)',
              }}
            >
              <DimensionAnnotation
                label="φ⁻²"
                direction="horizontal"
                color={orangeLine}
              />
            </div>

            {/* Label spacing */}
            <div
              style={{
                position: 'absolute',
                left: sideOffset,
                top: 'calc(var(--sp-xs) + var(--fs-xs))',
                height: 'var(--sp-xs)',
              }}
            >
              <DimensionAnnotation
                label="φ⁻²"
                direction="vertical"
                color={greenLine}
              />
            </div>

            {/* Helper text gap */}
            <div
              style={{
                position: 'absolute',
                left: sideOffset,
                bottom: 'calc(var(--sp-xs) + var(--fs-xs))',
                height: 'var(--sp-2xs)',
              }}
            >
              <DimensionAnnotation
                label="φ⁻³"
                direction="vertical"
                color={greenLine}
              />
            </div>
          </>
        )}
      </div>

      {/* ── Values table ──────────────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto',
          gap: 'var(--sp-2xs) var(--sp-lg)',
          ...mono,
          fontSize: 'var(--fs-xs)',
          color: 'var(--text-secondary)',
        }}
      >
        <span>--sp-sm (h-padding)</span>
        <span>{fmt(scale['sm'])} rem</span>
        <span>--sp-xs (v-padding)</span>
        <span>{fmt(scale['xs'])} rem</span>
        <span>--radius-sm (corner)</span>
        <span>{fmt(scale['xs'])} rem</span>
        <span>--sp-xs (label gap)</span>
        <span>{fmt(scale['xs'])} rem</span>
        <span>--sp-2xs (helper gap)</span>
        <span>{fmt(scale['2xs'])} rem</span>
      </div>

      {/* ── Code Generation ──────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--sp-sm)',
          width: '100%',
        }}
      >
        <h4
          style={{
            ...mono,
            fontSize: 'var(--fs-sm)',
            color: 'var(--text-secondary)',
            margin: 0,
            letterSpacing: 'var(--ls-wide)',
            textTransform: 'uppercase',
          }}
        >
          Get the Code
        </h4>
        <CopyableCodeBlock code={inputHTML} language="html" />
        <CopyableCodeBlock code={inputCSS} language="css" />
      </div>
    </div>
  )
}

export default InputAnatomy
