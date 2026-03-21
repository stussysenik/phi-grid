import React from 'react'
import { usePhi } from 'src/context/PhiContext'
import { fmt } from 'src/lib/phi'
import DimensionAnnotation from 'src/components/shared/DimensionAnnotation/DimensionAnnotation'
import CopyableCodeBlock from 'src/components/shared/CopyableCodeBlock/CopyableCodeBlock'

/**
 * CardAnatomy
 *
 * A card component annotated with every φ-derived spacing dimension:
 *
 *   Card padding:     --sp-lg    (φ¹ ≈ 1.618 rem)
 *   Border-radius:    --radius-md (√φ ≈ 1.272 rem)
 *   Internal spacing: --sp-sm    (φ⁻¹ ≈ 0.618 rem)
 *
 * Overlays follow the same pink / orange / green system as ButtonAnatomy.
 */

interface CardAnatomyProps {
  showOverlay?: boolean
}

const CardAnatomy: React.FC<CardAnatomyProps> = ({ showOverlay = true }) => {
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

  /* Outer margin / bounding box */
  const outerBox: React.CSSProperties = {
    position: 'relative',
    padding: 'var(--sp-sm)',
    borderRadius: 'calc(var(--radius-md) + var(--sp-sm))',
    ...(showOverlay
      ? {
          backgroundColor: orange,
          outline: `2px dashed ${orangeLine}`,
          outlineOffset: '2px',
        }
      : {}),
  }

  /* Card surface with padding overlay */
  const cardSurface: React.CSSProperties = {
    position: 'relative',
    padding: 'var(--sp-lg)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: showOverlay ? pink : 'var(--bg-secondary)',
    border: `1px solid var(--border-subtle)`,
  }

  /* Content area */
  const contentBlock: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--sp-sm)',
    borderRadius: 'var(--radius-sm)',
    padding: 'var(--sp-xs)',
    ...(showOverlay ? { backgroundColor: green } : {}),
  }

  const title: React.CSSProperties = {
    ...mono,
    fontSize: 'var(--fs-lg)',
    fontWeight: 700,
    color: 'var(--text-primary)',
    margin: 0,
    letterSpacing: 'var(--ls-tight)',
  }

  const subtitle: React.CSSProperties = {
    ...mono,
    fontSize: 'var(--fs-sm)',
    color: 'var(--text-secondary)',
    margin: 0,
  }

  const bodyText: React.CSSProperties = {
    ...mono,
    fontSize: 'var(--fs-xs)',
    color: 'var(--text-secondary)',
    margin: 0,
    lineHeight: 'var(--lh-base)',
  }

  /* ── code generation ────────────────────────────────────────── */
  const cardHTML = `<div class="phi-card">
  <h3 class="phi-card__title">Card Title</h3>
  <p class="phi-card__subtitle">Subtitle text</p>
  <p class="phi-card__body">Body content goes here.</p>
</div>`

  const cardCSS = `/* φ Card — include phi-tokens.css first */
.phi-card {
  padding: var(--sp-lg);            /* ${fmt(scale['lg'])}rem — φ¹ */
  border-radius: var(--radius-md);  /* √φ = ${fmt(scale['sqrt'])}rem */
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
}

.phi-card__title {
  margin: 0 0 var(--sp-sm) 0;      /* ${fmt(scale['sm'])}rem — φ⁻¹ */
  font-size: var(--fs-lg);
  font-weight: 700;
  letter-spacing: var(--ls-tight);
}

.phi-card__subtitle {
  margin: 0 0 var(--sp-sm) 0;
  font-size: var(--fs-sm);
  color: var(--text-secondary);
}

.phi-card__body {
  margin: 0;
  font-size: var(--fs-xs);
  line-height: var(--lh-base);      /* φ = ${fmt(scale['lg'] / scale['md'])} */
  color: var(--text-secondary);
}`

  return (
    <div style={container}>
      <div style={{ position: 'relative', display: 'inline-flex' }}>
        <div style={outerBox}>
          <div style={cardSurface}>
            <div style={contentBlock}>
              <h3 style={title}>Card Title</h3>
              <p style={subtitle}>Subtitle text using --sp-sm gap</p>
              <p style={bodyText}>
                Body content sits inside the green content area.
                <br />
                Internal spacing uses φ⁻¹ = 0.618 rem.
              </p>
            </div>
          </div>
        </div>

        {/* ── Annotations ──────────────────────────────────────── */}
        {showOverlay && (
          <>
            {/* Card padding (top) */}
            <div
              style={{
                position: 'absolute',
                top: 'var(--sp-sm)',
                right: sideOffset,
                height: 'var(--sp-lg)',
              }}
            >
              <DimensionAnnotation
                label="φ¹"
                direction="vertical"
                color={pinkLine}
              />
            </div>

            {/* Internal gap */}
            <div
              style={{
                position: 'absolute',
                bottom: annotationOffset,
                left: 'calc(var(--sp-sm) + var(--sp-lg))',
                width: 'var(--sp-sm)',
              }}
            >
              <DimensionAnnotation
                label="φ⁻¹"
                direction="horizontal"
                color={greenLine}
              />
            </div>

            {/* Border-radius */}
            <div
              style={{
                position: 'absolute',
                top: `calc(var(--sp-sm) + ${annotationOffset})`,
                left: 'var(--sp-sm)',
                width: 'var(--radius-md)',
              }}
            >
              <DimensionAnnotation
                label="√φ"
                direction="horizontal"
                color={orangeLine}
              />
            </div>

            {/* Outer margin */}
            <div
              style={{
                position: 'absolute',
                left: sideOffset,
                top: 0,
                height: 'var(--sp-sm)',
              }}
            >
              <DimensionAnnotation
                label="φ⁻¹"
                direction="vertical"
                color={orangeLine}
              />
            </div>
          </>
        )}
      </div>

      {/* ── Values table ───────────────────────────────────────── */}
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
        <span>--sp-lg (card padding)</span>
        <span>{fmt(scale['lg'])} rem</span>
        <span>--radius-md (border-radius)</span>
        <span>{fmt(scale['sqrt'])} rem</span>
        <span>--sp-sm (internal gap)</span>
        <span>{fmt(scale['sm'])} rem</span>
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
        <CopyableCodeBlock code={cardHTML} language="html" />
        <CopyableCodeBlock code={cardCSS} language="css" />
      </div>
    </div>
  )
}

export default CardAnatomy
