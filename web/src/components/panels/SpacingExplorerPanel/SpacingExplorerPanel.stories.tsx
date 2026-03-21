import type { Meta, StoryObj } from '@storybook/react'
import { PhiProvider } from 'src/context/PhiContext'
import SpacingExplorerPanel from './SpacingExplorerPanel'

const meta: Meta<typeof SpacingExplorerPanel> = {
  title: 'Panels/SpacingExplorerPanel',
  component: SpacingExplorerPanel,
  decorators: [
    (Story) => (
      <PhiProvider>
        <div
          style={{
            padding: 'var(--sp-xl)',
            backgroundColor: 'var(--bg-secondary)',
            minHeight: '100vh',
          }}
        >
          <Story />
        </div>
      </PhiProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SpacingExplorerPanel>

export const Default: Story = {}
