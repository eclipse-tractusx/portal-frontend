import { ComponentStory } from '@storybook/react'

import { ErrorPage as Component } from '.'

export default {
  title: 'ErrorPage',
  component: Component,
  argTypes: {},
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const ErrorPage = Template.bind({})
ErrorPage.args = {
  hasNavigation: false,
  header: '500 Internal Server Error',
  title: 'Oops, Something went wrong.',
  description:
    'The server encountered an internal error or misconfiguration and was unable to complete your request.',
  additionalDescription: 'Please contact your admin.',
  reloadButtonTitle: 'Reload Page',
  homeButtonTitle: 'Homepage',
  onReloadClick: () => console.log('reload'),
  onHomeClick: () => console.log('home page'),
}
