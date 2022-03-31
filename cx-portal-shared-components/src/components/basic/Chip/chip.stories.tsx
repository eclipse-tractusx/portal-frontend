import { ComponentStory } from '@storybook/react'
import { Chip as Component } from '.'

import {
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs'

export default {
  title: 'Chip',
  component: Component,
  argTypes: {},
  parameters: {
    docs: {
      page: () => (
        <>
          <h1>Catena-X Chip Component</h1>
          <p>
            Chip component used the same way as described in the
            <a
              href="https://mui.com/components/chips/"
              target="_blank"
              rel="noreferrer"
            >
              MUI Chip
            </a>{' '}
            documentation with
            <a
              href="https://mui.com/api/chips/"
              target="_blank"
              rel="noreferrer"
            >
              MUI Chip API
            </a>
            <p style={{ color: 'red' }}>
              Please take a look to "Examples" stories doc page for example
              usages
            </p>
          </p>
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const Chip = Template.bind({})
Chip.args = {
  color: 'secondary',
  variant: 'filled',
  label: 'decline',
  type: 'decline',
  onClick: () => console.log('Decline clicked'),
  withIcon: true,
}
