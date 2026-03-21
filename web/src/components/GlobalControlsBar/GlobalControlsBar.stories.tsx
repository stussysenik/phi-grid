import type { Meta, StoryObj } from '@storybook/react'
import GlobalControlsBar from './GlobalControlsBar'

const meta: Meta<typeof GlobalControlsBar> = {
  title: 'Shell/GlobalControlsBar',
  component: GlobalControlsBar,
}

export default meta
type Story = StoryObj<typeof GlobalControlsBar>

export const Default: Story = {}
