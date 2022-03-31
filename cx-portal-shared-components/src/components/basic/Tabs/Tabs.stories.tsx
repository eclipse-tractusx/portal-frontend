import { ComponentStory } from '@storybook/react'

import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import React from 'react'
import { Box } from '@mui/material'
import { ReactComponent } from '*.svg'
import { Tab } from './Tab'
import { TabPanel } from './TabPanel'
import { Tabs } from './Tabs'

export default {
  title: 'Tabs',
  parameters: {
    docs: {
      description: {
        component:
          'Tabs are used the same way as described in the [MUI Tabs](https://mui.com/components/tabs/) documentation with [MUI Tabs](https://mui.com/api/tabs/), [MUI Tab](https://mui.com/api/tab/) and TabPanel components. Implementation for handleChange-method needs to be done yourself (see code).',
      },
    },
  },
}

const Template: ComponentStory<typeof ReactComponent> = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'border.border02' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs usage"
        >
          <Tab
            sx={{ minWidth: '50%' }}
            label="Single User"
            icon={<PersonOutlinedIcon />}
            iconPosition="start"
          />
          <Tab
            sx={{ minWidth: '50%' }}
            label="Multiple User"
            icon={<GroupOutlinedIcon />}
            iconPosition="start"
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Content Single User
      </TabPanel>
      <TabPanel value={value} index={1}>
        Content Multiple User
      </TabPanel>
    </Box>
  )
}

export const Base = Template.bind({})
