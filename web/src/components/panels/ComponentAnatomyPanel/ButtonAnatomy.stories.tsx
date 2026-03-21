import type { Meta, StoryObj } from '@storybook/react'
import { PhiProvider } from 'src/context/PhiContext'
import ButtonAnatomy from './ButtonAnatomy'

const meta: Meta<typeof ButtonAnatomy> = {
  title: 'Panels/ComponentAnatomy/ButtonAnatomy',
  component: ButtonAnatomy,
  decorators: [
    (Story) => (
      <PhiProvider>
        <Story />
      </PhiProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ButtonAnatomy>

export const WithOverlay: Story = {
  args: { showOverlay: true },
}

export const WithoutOverlay: Story = {
  args: { showOverlay: false },
}
