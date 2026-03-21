import type { Meta, StoryObj } from '@storybook/react'
import { PhiProvider } from 'src/context/PhiContext'
import SpacingScaleViz from './SpacingScaleViz'

const meta: Meta<typeof SpacingScaleViz> = {
  title: 'Panels/SpacingExplorerPanel/SpacingScaleViz',
  component: SpacingScaleViz,
  decorators: [
    (Story) => (
      <PhiProvider>
        <div
          style={{
            padding: 'var(--sp-xl)',
            backgroundColor: 'var(--bg-primary)',
            maxWidth: '960px',
          }}
        >
          <Story />
        </div>
      </PhiProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SpacingScaleViz>

export const Default: Story = {}
