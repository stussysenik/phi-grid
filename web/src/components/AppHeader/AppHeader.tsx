import React from 'react'
import {
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from '@carbon/react'
import { Sun, Asleep } from '@carbon/react/icons'
import { usePhi } from 'src/context/PhiContext'

const AppHeader: React.FC = () => {
  const { theme, toggleTheme } = usePhi()

  return (
    <Header aria-label="φ Grid Playground">
      <HeaderName
        href="/"
        prefix=""
        style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600 }}
      >
        <span style={{ fontSize: 'var(--fs-xl)', marginRight: 'var(--sp-xs)' }}>φ</span>
        Grid
      </HeaderName>
      <HeaderGlobalBar>
        <HeaderGlobalAction
          aria-label={theme === 'white' ? 'Switch to dark mode' : 'Switch to light mode'}
          onClick={toggleTheme}
        >
          {theme === 'white' ? <Asleep size={20} /> : <Sun size={20} />}
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  )
}

export default AppHeader
