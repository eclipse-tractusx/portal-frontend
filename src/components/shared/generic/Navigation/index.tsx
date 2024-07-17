/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
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
import { type MenuProps } from '../Menu'
import { NavItem } from './NavItem'

export interface NavigationProps extends MenuProps {
  active?: string
  unstyled?: boolean
  selectedItem?: (item: string) => void
}

export const Navigation = ({
  items,
  component,
  active = '',
  unstyled = false,
  selectedItem,
}: NavigationProps): JSX.Element => {
  return (
    <Box component="nav" sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {items?.map((link) => {
        const isActive =
          // @ts-expect-error  We have name property
          active === link.name || link.href === active || link.to === active

        return (
          <NavItem
            {...link}
            isActive={isActive}
            component={component}
            unstyled={unstyled}
            key={uniqueId('Navigation')}
            onClick={(e) => {
              e.preventDefault()
              if (selectedItem != null) selectedItem(link.href ?? '')
            }}
          />
        )
      })}
    </Box>
  )
}
