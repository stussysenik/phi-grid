import React from 'react'
import { GlobalTheme } from '@carbon/react'
import { PhiProvider, usePhi } from 'src/context/PhiContext'

import 'src/styles/global.scss'

/**
 * Inner wrapper that reads theme from PhiContext and applies
 * Carbon GlobalTheme + data-carbon-theme attribute.
 */
const PhiDecorator: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = usePhi()
  return (
    <GlobalTheme theme={theme}>
      <div
        data-carbon-theme={theme}
        style={{
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)',
          padding: 'var(--sp-lg)',
          minHeight: '100vh',
        }}
      >
        {children}
      </div>
    </GlobalTheme>
  )
}

export const decorators = [
  (Story) => (
    <PhiProvider>
      <PhiDecorator>
        <Story />
      </PhiDecorator>
    </PhiProvider>
  ),
]

export const globalTypes = {
  theme: {
    description: 'Carbon theme',
    defaultValue: 'white',
    toolbar: {
      title: 'Theme',
      items: [
        { value: 'white', title: 'Light', icon: 'sun' },
        { value: 'g100', title: 'Dark', icon: 'moon' },
      ],
      dynamicTitle: true,
    },
  },
}
