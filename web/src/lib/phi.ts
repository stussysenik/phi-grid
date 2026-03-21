// The golden ratio — the unique number where φ = 1 + 1/φ.
// Truncating here doesn't matter: JS floats max out at ~15 significant digits,
// and we only display to 3 decimal places (see `fmt` below).
export const PHI = 1.6180339887498948482

// φ^0.5 = √φ ≈ 1.272 — the "half-step" between md and lg.
// This fills the gap that pure integer exponents leave,
// giving designers a comfortable in-between size.
export const PHI_SQRT = Math.sqrt(PHI) // ≈ 1.272

/** Compute φ raised to the given power */
export function phiPow(exp: number): number {
  return Math.pow(PHI, exp)
}

// Spacing scale: 9 tokens from φ⁻³ (tiny) to φ⁴ (huge).
// Integer exponents give major stops; the 0.5 exponent (√φ)
// adds a "half-step" — useful when the jump from md→lg feels too big.
export const SCALE_STEPS = [
  { name: '2xs', exp: -3, formula: 'x·φ⁻³' },
  { name: 'xs',  exp: -2, formula: 'x·φ⁻²' },
  { name: 'sm',  exp: -1, formula: 'x·φ⁻¹' },
  { name: 'md',  exp: 0,  formula: 'x·φ⁰' },
  { name: 'sqrt', exp: 0.5, formula: 'x·√φ' },
  { name: 'lg',  exp: 1,  formula: 'x·φ¹' },
  { name: 'xl',  exp: 2,  formula: 'x·φ²' },
  { name: '2xl', exp: 3,  formula: 'x·φ³' },
  { name: '3xl', exp: 4,  formula: 'x·φ⁴' },
] as const

export type ScaleStep = (typeof SCALE_STEPS)[number]

// Multiply the base unit by each φ exponent to produce the full token map.
// Returns { '2xs': 0.236, 'xs': 0.382, ... } for baseRem=1.
export function computeScale(baseRem: number): Record<string, number> {
  const result: Record<string, number> = {}
  for (const step of SCALE_STEPS) {
    result[step.name] = baseRem * phiPow(step.exp)
  }
  return result
}

/** Format a number to 3 decimal places */
export function fmt(n: number): string {
  return n.toFixed(3)
}

// Font sizes use fractional exponents (−0.5, 0.5, 1.5) more liberally
// than spacing — typography needs finer granularity because a 1.618×
// jump between body and subheading feels too large.
export const FS_STEPS = [
  { name: 'xs',  exp: -1,  formula: 'x·φ⁻¹' },
  { name: 'sm',  exp: -0.5, formula: 'x·φ⁻⁰·⁵' },
  { name: 'md',  exp: 0,   formula: 'x·φ⁰' },
  { name: 'lg',  exp: 0.5, formula: 'x·√φ' },
  { name: 'xl',  exp: 1,   formula: 'x·φ¹' },
  { name: '2xl', exp: 1.5, formula: 'x·φ¹·⁵' },
  { name: '3xl', exp: 2,   formula: 'x·φ²' },
  { name: '4xl', exp: 3,   formula: 'x·φ³' },
] as const

// Given an arbitrary rem value, find which φ token it's closest to.
// Used by the Token Calculator panel so designers can snap
// "I have 14px" to the nearest harmonious token.
export function findNearestToken(
  valueRem: number,
  baseUnit: number
): {
  exact: { name: string; formula: string; value: number }
  lower: { name: string; formula: string; value: number } | null
  upper: { name: string; formula: string; value: number } | null
  percentDiff: number
} {
  const scale = computeScale(baseUnit)
  const entries = SCALE_STEPS.map((step) => ({
    name: step.name,
    formula: step.formula,
    value: scale[step.name],
  })).sort((a, b) => a.value - b.value)

  let bestIdx = 0
  let bestDist = Math.abs(entries[0].value - valueRem)
  for (let i = 1; i < entries.length; i++) {
    const dist = Math.abs(entries[i].value - valueRem)
    if (dist < bestDist) {
      bestDist = dist
      bestIdx = i
    }
  }

  const exact = entries[bestIdx]
  const percentDiff =
    exact.value === 0 ? 0 : ((valueRem - exact.value) / exact.value) * 100

  return {
    exact,
    lower: bestIdx > 0 ? entries[bestIdx - 1] : null,
    upper: bestIdx < entries.length - 1 ? entries[bestIdx + 1] : null,
    percentDiff,
  }
}

// Grid presets: each uses φ-derived column ratios.
// "1fr 1.618fr" is the classic golden split (~38% / 62%).
// "Holy Grail" wraps a φ-wide center between two equal sidebars.
export const GRID_PRESETS = [
  {
    name: '2-Column Golden',
    columns: '1fr 1.618fr',
    description: 'Classic golden ratio split',
    ratios: [1, PHI],
  },
  {
    name: '3-Column Fibonacci',
    columns: '1fr 1fr 2fr',
    description: 'Fibonacci-inspired thirds',
    ratios: [1, 1, 2],
  },
  {
    name: '3-Column Golden',
    columns: '1fr 1.618fr 2.618fr',
    description: 'Progressive golden ratio',
    ratios: [1, PHI, PHI * PHI],
  },
  {
    name: '4-Column Equal',
    columns: 'repeat(4, 1fr)',
    description: 'Equal quarters with φ gaps',
    ratios: [1, 1, 1, 1],
  },
  {
    name: 'Holy Grail',
    columns: '1fr 1.618fr 1fr',
    description: 'Sidebar–content–sidebar',
    ratios: [1, PHI, 1],
  },
] as const
