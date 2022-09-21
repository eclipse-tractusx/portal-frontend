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

import { Box, useTheme } from '@mui/material'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useState } from 'react'
import uniqueId from 'lodash/uniqueId'
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos'

export type TabPanelType = {
  id: number
  label: string
  description: React.ReactElement
}

interface VerticalTabsProps {
  items: TabPanelType[]
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export const VerticalTabs = ({ items }: VerticalTabsProps) => {
  const [value, setValue] = useState(0)
  const theme = useTheme()
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
      }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs"
        sx={{
          '.Mui-selected': {
            color: `${theme.palette.text.primary} !important`,
            fontWeight: 'bold',
            '.MuiSvgIcon-root': {
              color: theme.palette.border.border04,
            },
          },
        }}
      >
        {items.map((item: TabPanelType) => (
          <Tab
            {...a11yProps(item.id)}
            label={item.label}
            key={uniqueId('vertical-tabs-tab-item')}
            icon={<ArrowForwardIos sx={{ color: '#EAF1FE' }} />}
            iconPosition="start"
          />
        ))}
      </Tabs>
      {items.map((item: TabPanelType) => (
        <TabPanel
          value={value}
          index={item.id - 1}
          key={uniqueId('vertical-tabs-tab-panel')}
        >
          {item.description}
        </TabPanel>
      ))}
    </Box>
  )
}
