import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import PageHeader from '.'

export default {
  title: 'frame/PageHeader',
  component: PageHeader,
} as ComponentMeta<typeof PageHeader>

const Template: ComponentStory<typeof PageHeader> = (args) => (
  <PageHeader {...args} />
)

export const Standard = Template.bind({})
Standard.args = {
  translationKey: 'content.partnernetwork.headertitle',
  backgroundImage: './stage-header-background.png',
}
