import { ComponentStory } from '@storybook/react'

import { ProcessList as Component } from '.'

export default {
  title: 'ProcessList',
  component: Component,
  argTypes: {},
}

const processListElements = [
  {
    step: 1,
    headline: 'App Market Card',
    description: 'descsription Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
  },
  {
    step: 2,
    headline: 'App Page',
    description: 'App Page descsription sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
  },
  {
    step: 3,
    headline: 'Contrac & Consent',
    description: 'Contrac & Consent descsription Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
  },
  {
    step: 4,
    headline: 'Technical Integration',
    description: 'Technical Integration descsription consetetur sadipscing elitr Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
  },
  {
    step: 5,
    headline: 'Beta Test',
    description: 'Beta Test descsription Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
  },
  {
    step: 6,
    headline: 'Validate & Publish',
    description: 'Validate & Publish descsription sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
  },
]

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const ProcessList = Template.bind({})
ProcessList.args = {
  list: processListElements,
  stepsColor: '#FFA600',
  stepsFontColor: '#fff',
  elementNumbers: 6,
}
