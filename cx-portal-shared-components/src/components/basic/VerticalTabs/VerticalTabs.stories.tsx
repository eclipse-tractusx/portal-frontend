import { ComponentStory } from '@storybook/react'
import { Box, Typography } from '@mui/material'

import { TabPanelType, VerticalTabs as Component } from '.'

export default {
  title: 'Tabs',
  component: Component,
  argTypes: {},
}

const items: TabPanelType[] = [
  {
    id: 1,
    label: 'General',
    description: (
      <Box sx={{ maxHeight: '350px', overflowX: 'auto' }}>
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>
          General
        </Typography>
        <Typography variant="label1">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </Typography>

        <Typography
          variant="h6"
          sx={{ marginBottom: '10px', marginTop: '20px' }}
        >
          Sub title
        </Typography>
        <Typography variant="label1" sx={{ marginBottom: '20px' }}>
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
          kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
          amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
          diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
          erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
          et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
          Lorem ipsum dolor sit amet.
        </Typography>
      </Box>
    ),
  },
  {
    id: 2,
    label: 'Invite Peope',
    description: <Typography variant="h5">Invite Peope</Typography>,
  },
  {
    id: 3,
    label: 'Upload Documents',
    description: <Typography variant="h5">Upload Documents</Typography>,
  },
  {
    id: 4,
    label: 'Registration Workflow',
    description: <Typography variant="h5">Registration Workflow</Typography>,
  },
  {
    id: 5,
    label: 'User Account',
    description: <Typography variant="h5">User Account</Typography>,
  },
]
const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

export const VerticalTab = Template.bind({})
VerticalTab.args = {
  items: items,
}
