import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { computeScale, SCALE_STEPS, PHI } from 'src/lib/phi'

// Carbon theme names map directly to their design token sets.
// 'white' = light theme, 'g100' = Gray 100 (dark).
type Theme = 'white' | 'g100'

interface PhiContextValue {
  baseUnit: number
  setBaseUnit: (v: number) => void
  theme: Theme
  setTheme: (t: Theme) => void
  toggleTheme: () => void
  scale: Record<string, number>
}

const PhiContext = createContext<PhiContextValue | null>(null)

const STORAGE_KEY = 'phi-grid-config'

// State hydration priority: URL params > localStorage > defaults.
// This lets users share a specific config via URL (?base=1.5&theme=g100)
// while still remembering their last session via localStorage.
function getInitialValues(): { baseUnit: number; theme: Theme } {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    const baseParam = params.get('base')
    const themeParam = params.get('theme')

    if (baseParam || themeParam) {
      const base = baseParam ? parseFloat(baseParam) : undefined
      const theme = themeParam === 'g100' ? 'g100' : themeParam === 'white' ? 'white' : undefined
      return {
        baseUnit: base && base >= 0.5 && base <= 2.0 ? base : 1,
        theme: theme || 'white',
      }
    }

    // Fallback to localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        return {
          baseUnit:
            typeof parsed.baseUnit === 'number' &&
            parsed.baseUnit >= 0.5 &&
            parsed.baseUnit <= 2.0
              ? parsed.baseUnit
              : 1,
          theme: parsed.theme === 'g100' ? 'g100' : 'white',
        }
      }
    } catch {
      // ignore parse errors
    }
  }

  return { baseUnit: 1, theme: 'white' }
}

export function PhiProvider({ children }: { children: React.ReactNode }) {
  const initial = useMemo(() => getInitialValues(), [])
  const [baseUnit, setBaseUnit] = useState(initial.baseUnit)
  const [theme, setTheme] = useState<Theme>(initial.theme)

  const scale = useMemo(() => computeScale(baseUnit), [baseUnit])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'white' ? 'g100' : 'white'))
  }, [])

  // Push the base unit into a CSS custom property so all φ tokens
  // in phi-tokens.scss can reference it via calc(var(--phi-base) * ...).
  useEffect(() => {
    document.documentElement.style.setProperty('--phi-base', `${baseUnit}rem`)
  }, [baseUnit])

  // Carbon reads data-carbon-theme on <html> to swap its entire palette.
  // Setting it here means every Carbon component re-themes automatically.
  useEffect(() => {
    document.documentElement.setAttribute('data-carbon-theme', theme)
  }, [theme])

  // Persist to localStorage so the user's config survives page refreshes.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ baseUnit, theme }))
    } catch {
      // ignore storage errors
    }
  }, [baseUnit, theme])

  // Mirror state into URL params so configs are shareable.
  // replaceState (not pushState) avoids polluting browser history.
  useEffect(() => {
    const url = new URL(window.location.href)
    if (baseUnit !== 1) {
      url.searchParams.set('base', baseUnit.toFixed(2))
    } else {
      url.searchParams.delete('base')
    }
    if (theme !== 'white') {
      url.searchParams.set('theme', theme)
    } else {
      url.searchParams.delete('theme')
    }
    window.history.replaceState({}, '', url.toString())
  }, [baseUnit, theme])

  const value = useMemo(
    () => ({ baseUnit, setBaseUnit, theme, setTheme, toggleTheme, scale }),
    [baseUnit, theme, scale, toggleTheme]
  )

  return <PhiContext.Provider value={value}>{children}</PhiContext.Provider>
}

export function usePhi(): PhiContextValue {
  const ctx = useContext(PhiContext)
  if (!ctx) throw new Error('usePhi must be used inside PhiProvider')
  return ctx
}
