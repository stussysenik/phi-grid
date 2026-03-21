import type { Meta, StoryObj } from '@storybook/react'
import { PhiProvider } from 'src/context/PhiContext'
import ComponentAnatomyPanel from './ComponentAnatomyPanel'

const meta: Meta<typeof ComponentAnatomyPanel> = {
  title: 'Panels/ComponentAnatomyPanel',
  component: ComponentAnatomyPanel,
  decorators: [
    (Story) => (
      <PhiProvider>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Story />
        </div>
      </PhiProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ComponentAnatomyPanel>

export const Default: Story = {}
