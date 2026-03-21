import type { Meta, StoryObj } from '@storybook/react'
import CopyableCodeBlock from './CopyableCodeBlock'

const meta: Meta<typeof CopyableCodeBlock> = {
  title: 'Shared/CopyableCodeBlock',
  component: CopyableCodeBlock,
}

export default meta
type Story = StoryObj<typeof CopyableCodeBlock>

export const CSSExample: Story = {
  args: {
    code: `.container {\n  display: grid;\n  grid-template-columns: 1fr 1.618fr;\n  gap: var(--sp-lg);\n  padding: var(--sp-xl);\n}`,
  },
}

export const SCSSExample: Story = {
  args: {
    code: `$phi: 1.618;\n$base: 1rem;\n\n.element {\n  padding: $base * $phi;\n  margin: $base * ($phi * $phi);\n}`,
    language: 'scss',
  },
}
