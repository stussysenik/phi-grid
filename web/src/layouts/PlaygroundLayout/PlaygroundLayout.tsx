import React from 'react'
import { GlobalTheme } from '@carbon/react'
import { PhiProvider, usePhi } from 'src/context/PhiContext'
import AppHeader from 'src/components/AppHeader/AppHeader'
import GlobalControlsBar from 'src/components/GlobalControlsBar/GlobalControlsBar'

const InnerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = usePhi()
  return (
    <GlobalTheme theme={theme}>
      <div data-carbon-theme={theme}>
        <AppHeader />
        <div style={{ marginTop: 'calc(var(--sp-2xl) + var(--sp-xs))' }}>
          <GlobalControlsBar />
          <main
            style={{
              padding: 'var(--sp-lg)',
              maxWidth: 'var(--bp-lg)',
              margin: '0 auto',
              overflow: 'hidden',
            }}
          >
            {children}
          </main>
        </div>
      </div>
    </GlobalTheme>
  )
}

type PlaygroundLayoutProps = {
  children?: React.ReactNode
}

const PlaygroundLayout = ({ children }: PlaygroundLayoutProps) => {
  return (
    <PhiProvider>
      <InnerLayout>{children}</InnerLayout>
    </PhiProvider>
  )
}

export default PlaygroundLayout
