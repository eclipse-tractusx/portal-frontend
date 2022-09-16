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

import { Box, Divider, Typography } from '@mui/material'
import { ComponentStory } from '@storybook/react'
import { CustomAccordion as Component } from '.'
import { Table } from '../StaticTable/StaticTable.stories'
import { CustomAccordionProps } from './Item'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'

export default {
  title: 'CustomAccordion',
  component: Component,
  argTypes: {
    children: {},
  },
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Component {...args} />
)

const item_1_open: CustomAccordionProps = {
  expanded: true,
  id: 'panel-1',
  title: 'First Item',
  icon: <HomeOutlinedIcon />,
  children: <Typography>Content of the first item</Typography>,
}

const item_1_open_colored: CustomAccordionProps = {
  expanded: false,
  id: 'panel-1',
  title: 'First Item',
  icon: <HomeOutlinedIcon />,
  color: 'background.background09',
  children: (
    <Box>
      <Typography variant="h4">Content of the first item</Typography>
      <Divider sx={{ m: 2 }} />
      <Typography mb={2}>
        You can add any complex content into the accordion item. For example a
        table:
      </Typography>
      <Table
        data={{
          head: ['Header 1', 'Header 2', 'Header 3'],
          body: [
            ['data 1', 'data 2', 'data 3'],
            ['data 1', 'data 2', 'data 3'],
            ['data 1', 'data 2', 'data 3'],
          ],
        }}
      />
    </Box>
  ),
}
const item_2_closed: CustomAccordionProps = {
  expanded: false,
  id: 'panel-2',
  icon: <SettingsOutlinedIcon />,
  title: 'Second Item',
  children: <Typography>Content of the second item</Typography>,
}
const item_3_closed: CustomAccordionProps = {
  expanded: false,
  id: 'panel-3',
  title: 'Third Item',
  children: <Typography>Content of the third item</Typography>,
}

export const BasicAccordion = Template.bind({})
BasicAccordion.args = {
  items: [item_1_open, item_2_closed, item_3_closed],
}

export const ColoredAccordion = Template.bind({})
ColoredAccordion.args = {
  items: [item_1_open_colored, item_2_closed, item_3_closed],
}
