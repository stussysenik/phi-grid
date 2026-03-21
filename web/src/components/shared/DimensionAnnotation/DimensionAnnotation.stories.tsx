import type { Meta, StoryObj } from '@storybook/react'
import DimensionAnnotation from './DimensionAnnotation'

const meta: Meta<typeof DimensionAnnotation> = {
  title: 'Shared/DimensionAnnotation',
  component: DimensionAnnotation,
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: 200, height: 200, padding: 40 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof DimensionAnnotation>

export const Horizontal: Story = {
  args: { label: 'x·φ¹', direction: 'horizontal', color: '#ff69b4' },
}

export const Vertical: Story = {
  args: { label: '√y/y²', direction: 'vertical', color: '#ff8c00' },
}

export const CustomColor: Story = {
  args: { label: 'x', direction: 'horizontal', color: '#00b400' },
}
