/********************************************************************************
 * Copyright (c) 2021,2022 Mercedes-Benz Group AG and BMW Group AG
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

import { Box } from '@mui/material'
import { ComponentStory } from '@storybook/react'
import { Tooltips as Component } from '.'
import { Button } from '../Button'

export default {
  title: 'Tooltips',
  component: Component,
}

const Template: ComponentStory<typeof Component> = (args: any) => (
  <Box
    sx={{
      margin: '100px',
    }}
  >
    <Component {...args} />
  </Box>
)

export const Tooltips = Template.bind({})
Tooltips.args = {
  tooltipPlacement: 'bottom-start',
  tooltipText: 'Action is pending',
  children: (
    <span>
      <Button color="primary">Text</Button>
    </span>
  ),
}
