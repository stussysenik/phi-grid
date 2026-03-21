import type { Meta, StoryObj } from '@storybook/react'
import { PhiProvider } from 'src/context/PhiContext'
import TypographyScalePanel from './TypographyScalePanel'

const meta: Meta<typeof TypographyScalePanel> = {
  title: 'Panels/TypographyScalePanel',
  component: TypographyScalePanel,
  decorators: [
    (Story) => (
      <PhiProvider>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Story />
        </div>
      </PhiProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TypographyScalePanel>

export const Default: Story = {}
