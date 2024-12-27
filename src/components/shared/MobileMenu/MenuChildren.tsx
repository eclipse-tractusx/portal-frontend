/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
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

import { Box, Divider, Link, useTheme } from '@mui/material'
import { Typography } from '@catena-x/portal-shared-components'
import { MenuItem, type MenuItemProps } from './MenuItem'
import './MobileMenu.scss'

type LinkItem = Partial<Record<'href' | 'to', string>>

export interface MenuSubItemsProps extends LinkItem {
  onClick: () => void
  onHide: () => void
  children: MenuItemProps[]
  component: React.ElementType
  title: string
  headerRowComponent?: React.ReactNode
}

export const MenuSubItems = ({
  onClick,
  children,
  component = Link,
  headerRowComponent,
}: MenuSubItemsProps): JSX.Element => {
  const { spacing } = useTheme()
  return (
    <Box
      sx={{
        px: 1,
        py: 0,
        paddingTop: 1,
        ':hover': {
          borderRadius: spacing(1, 1),
        },
      }}
    >
      {headerRowComponent ? <Box>{headerRowComponent}</Box> : null}
      {children?.map((item, index) => {
        if (item.children) {
          return (
            <>
              <Box
                sx={{
                  paddingLeft: 1,
                  paddingBottom: '10px',
                  paddingTop: '15px',
                }}
              >
                <Typography variant="h6" sx={{ textTransform: 'uppercase' }}>
                  {item.title}
                </Typography>
              </Box>
              {item.children.map((childItem) => {
                return (
                  <MenuItem
                    key={childItem.title}
                    component={component}
                    onSelect={onClick}
                    onClick={onClick}
                    {...childItem}
                  />
                )
              })}

              {index + 1 !== children.length && (
                <Divider sx={{ margin: spacing(1, 1) }} />
              )}
            </>
          )
        }
        return (
          <MenuItem
            key={item.title}
            component={component}
            onSelect={onClick}
            onClick={onClick}
            {...item}
          />
        )
      })}
    </Box>
  )
}
