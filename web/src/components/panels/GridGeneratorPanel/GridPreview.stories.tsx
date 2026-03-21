import type { Meta, StoryObj } from '@storybook/react'
import { PhiProvider } from 'src/context/PhiContext'
import GridPreview from './GridPreview'

const meta: Meta<typeof GridPreview> = {
  title: 'Panels/GridGeneratorPanel/GridPreview',
  component: GridPreview,
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
type Story = StoryObj<typeof GridPreview>

/** Classic golden-ratio two-column split: 1fr | 1.618fr */
export const TwoColumnGolden: Story = {
  args: { presetIndex: 0 },
}

/** Fibonacci-inspired three-column layout: 1fr | 1fr | 2fr */
export const ThreeColumnFibonacci: Story = {
  args: { presetIndex: 1 },
}

/** Progressive golden ratio across three columns: 1fr | 1.618fr | 2.618fr */
export const ThreeColumnGolden: Story = {
  args: { presetIndex: 2 },
}

/** Equal quarters with phi-derived gaps */
export const FourColumnEqual: Story = {
  args: { presetIndex: 3 },
}

/** Holy grail layout: sidebar | content | sidebar (1fr | 1.618fr | 1fr) */
export const HolyGrail: Story = {
  args: { presetIndex: 4 },
}
