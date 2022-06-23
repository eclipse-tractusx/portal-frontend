import { ComponentStory } from '@storybook/react'
import { Box } from '@mui/material'
import CXLogoText from '../../../assets/logo/cx-logo-text.svg'

import { MainNavigation as Component } from '.'
import { Button } from '../Button'
import { IconButton } from '../IconButton'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'

export default {
  title: 'Navigation',
  component: Component,
  argTypes: {},
}

const items = [
  { href: '/home', title: 'Home' },
  { href: '/appmarktplace', title: 'App Marktplace' },
  { href: '/datamanagement', title: 'Data Management' },
  { href: '/partnernetwork', title: 'Partner Network' },
]

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args}>
    <Box
      component="img"
      sx={{
        display: 'inline-block',
        width: '170px',
        height: '40px',
      }}
      src={CXLogoText}
    />
    <Box>
      <Button
        size="small"
        color="secondary"
        variant="contained"
        sx={{ backgroundColor: 'white', marginRight: '16px' }}
      >
        Help
      </Button>
      <IconButton size="medium" color="primary">
        <PersonOutlineIcon />
      </IconButton>
    </Box>
  </Component>
)

export const MainNavigation = Template.bind({})
MainNavigation.args = {
  items: items,
}
