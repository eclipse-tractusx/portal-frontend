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
