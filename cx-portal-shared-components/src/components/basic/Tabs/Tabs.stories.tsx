/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

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
  const [activeTab, setActiveTab] = React.useState(0)

  const handleChange = (event: any, newValue: number) => {
    setActiveTab(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'border.border02' }}>
        <Tabs
          value={activeTab}
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
      <TabPanel value={activeTab} index={0}>
        Content Single User
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        Content Multiple User
      </TabPanel>
    </Box>
  )
}

export const Base = Template.bind({})
