import React from 'react'
import { usePhi } from 'src/context/PhiContext'
import { PHI, PHI_SQRT, fmt } from 'src/lib/phi'
import DimensionAnnotation from 'src/components/shared/DimensionAnnotation/DimensionAnnotation'
import CopyableCodeBlock from 'src/components/shared/CopyableCodeBlock/CopyableCodeBlock'

/**
 * ButtonAnatomy — THE FLAGSHIP COMPONENT
 *
 * Renders a pill-shaped button with colored overlays revealing every
 * φ-derived dimension:
 *
 *   Pink  = padding regions
 *   Orange = full bounding box / margin
 *   Green  = content area (icon + label)
 *
 * Every spacing value maps to a --sp-* token; no magic numbers.
 *
 * Key dimensions (x = baseUnit, y = φ):
 *   Left padding:     √y / y²  ≈ 0.236 rem  →  --sp-2xs
 *   Icon–text gap:    x / y    ≈ 0.618 rem  →  --sp-sm
 *   Right padding:    x        = 1     rem  →  --sp-md
 *   Vertical padding: x · √y  ≈ 1.272 rem  →  --sp-sqrt
 *   Border-radius:    x · √y  ≈ 1.272 rem  →  --radius-md
 */

interface ButtonAnatomyProps {
  /** Toggle pink / orange / green overlays on or off */
  showOverlay?: boolean
}

const ButtonAnatomy: React.FC<ButtonAnatomyProps> = ({
  showOverlay = true,
}) => {
  const { baseUnit, scale } = usePhi()

  // Pre-compute display values
  const sp2xs = scale['2xs'] // √y/y² ≈ 0.236
  const spSm = scale['sm']   // x/y   ≈ 0.618
  const spMd = scale['md']   // x     = 1
  const spSqrt = scale['sqrt'] // x·√y ≈ 1.272

  /* ── colour constants (sourced from theme tokens) ───────────── */
  const pink = 'var(--overlay-padding)'
  const orange = 'var(--overlay-margin)'
  const green = 'var(--overlay-content)'
  const pinkLine = 'var(--overlay-border-color)'
  const orangeLine = 'var(--overlay-margin-color)'
  const greenLine = 'var(--overlay-content-color)'

  /* ── inline-style helpers ───────────────────────────────────── */
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

  /* Outer bounding box – orange overlay */
  const boundingBox: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: 'var(--radius-md)',
    ...(showOverlay ? { backgroundColor: orange } : {}),
    ...(showOverlay
      ? { outline: `2px dashed ${orangeLine}`, outlineOffset: '2px' }
      : {}),
  }

  /* Padding wrapper – pink overlay. Applies actual button padding. */
  const paddingWrapper: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: 'var(--radius-md)',
    paddingTop: 'var(--sp-sqrt)',
    paddingBottom: 'var(--sp-sqrt)',
    paddingLeft: 'var(--sp-2xs)',
    paddingRight: 'var(--sp-md)',
    ...(showOverlay ? { backgroundColor: pink } : {}),
  }

  /* Content area – green overlay */
  const contentArea: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--sp-sm)',
    borderRadius: 'calc(var(--radius-md) * 0.5)',
    padding: 'var(--sp-2xs)',
    ...(showOverlay ? { backgroundColor: green } : {}),
  }

  /* The visible "button" skin drawn behind everything */
  const buttonSkin: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--interactive)',
    zIndex: 0,
  }

  /* Icon placeholder */
  const iconBox: React.CSSProperties = {
    width: 'var(--sp-lg)',
    height: 'var(--sp-lg)',
    borderRadius: 'var(--radius-sm)',
    border: '1.5px solid currentColor',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 'var(--fs-sm)',
    ...mono,
    flexShrink: 0,
  }

  const labelText: React.CSSProperties = {
    ...mono,
    fontSize: 'var(--fs-md)',
    fontWeight: 600,
    color: '#fff',
    whiteSpace: 'nowrap',
    letterSpacing: 'var(--ls-wide)',
  }

  /* ── legend ──────────────────────────────────────────────────── */
  const legendRow: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--sp-lg)',
    justifyContent: 'center',
    ...mono,
    fontSize: 'var(--fs-xs)',
    color: 'var(--text-secondary)',
  }

  const swatch = (bg: string, border: string): React.CSSProperties => ({
    display: 'inline-block',
    width: 'var(--sp-sm)',
    height: 'var(--sp-sm)',
    backgroundColor: bg,
    border: `1.5px solid ${border}`,
    borderRadius: 'var(--sp-2xs)',
    marginRight: 'var(--sp-2xs)',
    verticalAlign: 'middle',
  })

  /* ── annotation offset tokens (no magic px) ─────────────────── */
  const annotationOffset = 'calc(-1 * var(--sp-lg) - var(--sp-2xs))'
  const sideOffset = 'calc(-1 * var(--sp-xl))'

  /* ── code generation ────────────────────────────────────────── */
  const buttonHTML = `<button class="phi-button">
  <svg class="phi-button__icon" viewBox="0 0 16 16">
    <circle cx="8" cy="8" r="6" />
    <path d="M8 5v6M5 8h6" />
  </svg>
  <span class="phi-button__label">Action</span>
</button>`

  const buttonCSS = `/* φ Button — include phi-tokens.css first */
.phi-button {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-sm);           /* ${fmt(spSm)}rem — φ⁻¹ */
  padding: var(--sp-sqrt) var(--sp-md) var(--sp-sqrt) var(--sp-2xs);
  /* top/bottom: ${fmt(spSqrt)}rem, right: ${fmt(spMd)}rem, left: ${fmt(sp2xs)}rem */
  border: none;
  border-radius: var(--radius-md);  /* √φ = ${fmt(spSqrt)}rem */
  background-color: var(--interactive);
  color: #fff;
  font-family: 'IBM Plex Mono', monospace;
  font-size: var(--fs-md);
  font-weight: 600;
  letter-spacing: var(--ls-wide);
  cursor: pointer;
}

.phi-button__icon {
  width: var(--sp-lg);         /* ${fmt(scale['lg'])}rem — φ¹ */
  height: var(--sp-lg);
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  flex-shrink: 0;
}

.phi-button__label {
  white-space: nowrap;
}`

  return (
    <div style={container}>
      {/* ── The button assembly ──────────────────────────────── */}
      <div style={{ position: 'relative', display: 'inline-flex' }}>
        {/* 1. Bounding box (orange) */}
        <div style={boundingBox}>
          {/* Button skin behind all overlays */}
          <div style={buttonSkin} />

          {/* 2. Padding area (pink) – z-index above skin */}
          <div style={{ ...paddingWrapper, position: 'relative', zIndex: 1 }}>
            {/* 3. Content area (green) */}
            <div style={contentArea}>
              {/* Icon */}
              <div style={iconBox}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="8" cy="8" r="6" />
                  <path d="M8 5v6M5 8h6" />
                </svg>
              </div>

              {/* Label */}
              <span style={labelText}>Action</span>
            </div>
          </div>
        </div>

        {/* ── Dimension annotations (absolute-positioned) ────── */}
        {showOverlay && (
          <>
            {/* Left padding: √y/y² */}
            <div
              style={{
                position: 'absolute',
                bottom: annotationOffset,
                left: 0,
                width: 'var(--sp-2xs)',
              }}
            >
              <DimensionAnnotation
                label="√y/y²"
                direction="horizontal"
                color={pinkLine}
              />
            </div>

            {/* Icon-text gap: x/y */}
            <div
              style={{
                position: 'absolute',
                bottom: annotationOffset,
                /* offset = left-padding + icon-width + content inner padding */
                left: `calc(var(--sp-2xs) + var(--sp-2xs) + var(--sp-lg))`,
                width: 'var(--sp-sm)',
              }}
            >
              <DimensionAnnotation
                label="x/y"
                direction="horizontal"
                color={greenLine}
              />
            </div>

            {/* Right padding: x */}
            <div
              style={{
                position: 'absolute',
                bottom: annotationOffset,
                right: 0,
                width: 'var(--sp-md)',
              }}
            >
              <DimensionAnnotation
                label="x"
                direction="horizontal"
                color={pinkLine}
              />
            </div>

            {/* Vertical height: x(√y) on the right side */}
            <div
              style={{
                position: 'absolute',
                right: sideOffset,
                top: 0,
                height: 'var(--sp-sqrt)',
              }}
            >
              <DimensionAnnotation
                label="x(√y)"
                direction="vertical"
                color={orangeLine}
              />
            </div>

            {/* Border-radius: x·√y at top-left corner */}
            <div
              style={{
                position: 'absolute',
                top: annotationOffset,
                left: 0,
                width: 'var(--radius-md)',
              }}
            >
              <DimensionAnnotation
                label="x·√y"
                direction="horizontal"
                color={orangeLine}
              />
            </div>
          </>
        )}
      </div>

      {/* ── Variable legend ──────────────────────────────────── */}
      {showOverlay && (
        <div style={legendRow}>
          <span>
            <span style={swatch(pink, pinkLine)} />
            Padding
          </span>
          <span>
            <span style={swatch(orange, orangeLine)} />
            Bounding box
          </span>
          <span>
            <span style={swatch(green, greenLine)} />
            Content
          </span>
        </div>
      )}

      {/* ── Computed values table ────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto auto',
          gap: 'var(--sp-2xs) var(--sp-lg)',
          ...mono,
          fontSize: 'var(--fs-xs)',
          color: 'var(--text-secondary)',
        }}
      >
        <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
          x = {baseUnit}em
        </span>
        <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
          y = {'\u03C6'} = {fmt(PHI)}
        </span>
        <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
          {'\u221A'}y = {fmt(PHI_SQRT)}
        </span>

        <span>--sp-2xs ({'\u221A'}y/y{'\u00B2'})</span>
        <span>{fmt(sp2xs)} rem</span>
        <span style={{ color: pinkLine }}>{'\u25A0'} left pad</span>

        <span>--sp-sm (x/y)</span>
        <span>{fmt(spSm)} rem</span>
        <span style={{ color: greenLine }}>{'\u25A0'} gap</span>

        <span>--sp-md (x)</span>
        <span>{fmt(spMd)} rem</span>
        <span style={{ color: pinkLine }}>{'\u25A0'} right pad</span>

        <span>--sp-sqrt (x{'\u00B7\u221A'}y)</span>
        <span>{fmt(spSqrt)} rem</span>
        <span style={{ color: orangeLine }}>{'\u25A0'} v-pad</span>

        <span>--radius-md (x{'\u00B7\u221A'}y)</span>
        <span>{fmt(spSqrt)} rem</span>
        <span style={{ color: orangeLine }}>{'\u25A0'} corner</span>
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
        <CopyableCodeBlock code={buttonHTML} language="html" />
        <CopyableCodeBlock code={buttonCSS} language="css" />
      </div>
    </div>
  )
}

export default ButtonAnatomy
