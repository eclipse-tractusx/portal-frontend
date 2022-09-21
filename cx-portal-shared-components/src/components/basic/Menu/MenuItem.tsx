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

import { ArrowForward } from '@mui/icons-material'
import { Box, BoxProps, Divider, Link, ListItem, useTheme } from '@mui/material'
import { useState } from 'react'
import { MenuType } from '.'
import { Typography } from '../Typography'

type LinkItem = Partial<Record<'href' | 'to', string>>

export interface MenuItemProps extends LinkItem {
  title: string
  hint?: string
  children?: MenuItemProps[]
  component?: React.ElementType
  divider?: boolean
  menuProps?: BoxProps
  onClick?: React.MouseEventHandler
  Menu?: MenuType
}

export const MenuItem = ({
  title,
  hint,
  children,
  divider,
  component = Link,
  menuProps,
  onClick,
  Menu,
  ...props
}: MenuItemProps) => {
  const { spacing } = useTheme()
  const [open, setOpen] = useState(false)

  const onMouseEnter = () => setOpen(true)

  const onMouseLeave = () => setOpen(false)

  return (
    <ListItem
      sx={{
        display: 'block',
        position: 'relative',
        padding: spacing(0, 1),
        ...(onClick && { cursor: 'pointer' }),
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <Link
        component={component}
        sx={{
          color: 'text.primary',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: spacing(hint ? 1.3 : 1.5, 2),
          borderRadius: 3,
          typography: 'label3',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          ':hover': {
            backgroundColor: 'selected.hover',
            color: 'primary.dark',
            '.MuiSvgIcon-root': {
              color: 'primary.dark',
            },
          },
        }}
        {...props}
      >
        {title}
        {hint && (
          <Box
            sx={{
              backgroundColor: '#de60de',
              borderRadius: '5px',
              maxWidth: '40px',
              minWidth: '40px',
              textAlign: 'center',
              whiteSpace: 'normal',
              marginLeft: '12px',
            }}
          >
            <Typography
              variant="helper"
              display="block"
              sx={{
                fontSize: '10px',
                lineHeight: '14px',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              {hint}
            </Typography>
          </Box>
        )}
        {children && (
          <ArrowForward fontSize="small" sx={{ color: 'icon.icon02' }} />
        )}
      </Link>
      {Menu && children && open && <Menu items={children} {...menuProps} />}
      {divider && <Divider />}
    </ListItem>
  )
}
