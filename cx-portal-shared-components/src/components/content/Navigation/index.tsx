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

import { Box } from '@mui/material'
import uniqueId from 'lodash/uniqueId'
import { MenuProps } from '../../basic/Menu'
import { NavItem } from './NavItem'

export interface NavigationProps extends MenuProps {
  active?: string
  unstyled?: boolean
}

export const Navigation = ({
  items,
  component,
  active = '',
  unstyled = false,
}: NavigationProps) => {
  return (
    <Box component="nav" sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {items?.map((link) => {
        const isActive = link.href === active || link.to === active

        return (
          <NavItem
            {...link}
            isActive={isActive}
            component={component}
            unstyled={unstyled}
            key={uniqueId('Navigation')}
          />
        )
      })}
    </Box>
  )
}
