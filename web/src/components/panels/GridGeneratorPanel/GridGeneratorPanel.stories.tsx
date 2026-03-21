import type { Meta, StoryObj } from '@storybook/react'
import { PhiProvider } from 'src/context/PhiContext'
import GridGeneratorPanel from './GridGeneratorPanel'

const meta: Meta<typeof GridGeneratorPanel> = {
  title: 'Panels/GridGeneratorPanel',
  component: GridGeneratorPanel,
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
type Story = StoryObj<typeof GridGeneratorPanel>

export const Default: Story = {}
