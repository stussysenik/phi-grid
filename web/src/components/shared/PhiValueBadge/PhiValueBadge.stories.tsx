import type { Meta, StoryObj } from '@storybook/react'
import PhiValueBadge from './PhiValueBadge'

const meta: Meta<typeof PhiValueBadge> = {
  title: 'Shared/PhiValueBadge',
  component: PhiValueBadge,
}

export default meta
type Story = StoryObj<typeof PhiValueBadge>

export const Base: Story = {
  args: { name: 'md', formula: 'x·φ⁰', value: 1.0 },
}

export const Small: Story = {
  args: { name: 'sm', formula: 'x·φ⁻¹', value: 0.618 },
}

export const Large: Story = {
  args: { name: 'lg', formula: 'x·φ¹', value: 1.618 },
}

export const ExtraLarge: Story = {
  args: { name: 'xl', formula: 'x·φ²', value: 2.618 },
}

export const AllSteps: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-xs)' }}>
      {[
        { name: '2xs', formula: 'x·φ⁻³', value: 0.236 },
        { name: 'xs',  formula: 'x·φ⁻²', value: 0.382 },
        { name: 'sm',  formula: 'x·φ⁻¹', value: 0.618 },
        { name: 'md',  formula: 'x·φ⁰',  value: 1.0 },
        { name: 'sqrt', formula: 'x·√φ', value: 1.272 },
        { name: 'lg',  formula: 'x·φ¹',  value: 1.618 },
        { name: 'xl',  formula: 'x·φ²',  value: 2.618 },
        { name: '2xl', formula: 'x·φ³',  value: 4.236 },
        { name: '3xl', formula: 'x·φ⁴',  value: 6.854 },
      ].map((step) => (
        <PhiValueBadge key={step.name} {...step} />
      ))}
    </div>
  ),
}
