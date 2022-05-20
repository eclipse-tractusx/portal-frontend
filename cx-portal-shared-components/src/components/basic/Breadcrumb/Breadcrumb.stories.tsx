import { Link, Typography } from '@mui/material'
import { ComponentStory } from '@storybook/react'

import { Breadcrumb as Component } from '.'

export default {
  title: 'Breadcrumb',
  component: Component,
  argTypes: {},
}

const breadcrumbs = [
  <Link
    underline="hover"
    key="1"
    color="inherit"
    sx={{ cursor: 'pointer' }}
    onClick={() => console.log('navigate to home')}
  >
    Home
  </Link>,
  <Link
    underline="hover"
    key="2"
    color="inherit"
    sx={{ cursor: 'pointer' }}
    onClick={() => console.log('navigate to Breackcrumb 1')}
  >
    Breadcrumb 1
  </Link>,
  <Typography key="3" color="text.primary">
    Breadcrumb 2
  </Typography>,
]

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const Breadcrumb = Template.bind({})
Breadcrumb.args = {
  backButton: true,
  backButtonLabel: 'Back',
  backButtonVariant: 'outlined',
  onBackButtonClick: () => console.log('Back button clicked!'),
  breadcrumbs: breadcrumbs,
}
