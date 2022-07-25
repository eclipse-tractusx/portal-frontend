import { ComponentStory } from '@storybook/react'

import { Stepper as Component } from '.'

export default {
  title: 'Steppers',
  component: Component,
  argTypes: {},
}

const stepperElements = [
  {
    step: 1,
    headline: 'App Market Card',
  },
  {
    step: 2,
    headline: 'Contract & Consent',
  },
  {
    step: 3,
    headline: 'Technical Integration',
  },
  {
    step: 4,
    headline: 'Beta Test',
  },
  {
    step: 5,
    headline: 'Validate & Publish',
  },
  {
    step: 6,
    headline: 'Verify your company data',
  },
]        

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const Stepper = Template.bind({})
Stepper.args = {
  list: stepperElements,
  showSteps: 6,
  activeStep: 2,
}
