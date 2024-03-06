/********************************************************************************
 * Copyright (c) 2021, 2024 Contributors to the Eclipse Foundation
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

import { Box, Link, useTheme } from '@mui/material'
import { Typography } from '@catena-x/portal-shared-components'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import type { MenuItemProps } from './MenuItem'
import React from 'react'

type LinkItem = Partial<Record<'href' | 'to', string>>

export interface MenuSubItemsProps extends LinkItem {
  onClick: () => void
  onHide: () => void
  children: MenuItemProps[]
  component: React.ElementType
  title: string
}

export const MenuSubItems = ({
  onClick,
  onHide,
  children,
  component = Link,
  title,
}: MenuSubItemsProps): JSX.Element => {
  const { spacing } = useTheme()
  return (
    <Box
      sx={{
        marginBottom: '55px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginLeft: '20px',
          cursor: 'pointer',
          marginBottom: '20px',
          alignItems: 'center',
        }}
        onClick={onHide}
      >
        <KeyboardArrowLeftIcon sx={{ color: 'icon.icon02' }} />
        <Typography
          sx={{
            paddingLeft: '5px',
            fontSize: '12px',
            fontFamily:
              '"LibreFranklin-Medium",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
          }}
          variant="body2"
        >
          back
        </Typography>
      </Box>
      <Box
        sx={{
          paddingLeft: '25px',
          paddingBottom: '10px',
          paddingTop: '15px',
        }}
      >
        <Typography
          variant="label2"
          sx={{
            fontWeight: '600',
            fontSize: '14px',
          }}
        >
          {title}
        </Typography>
      </Box>
      {children?.map((item) => (
        <Link
          component={component}
          key={item.title}
          sx={{
            color: 'text.primary',
            pointerEvents: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: spacing(1.5, 2),
            borderRadius: 3,
            typography: 'label3',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            marginLeft: '10px',
            fontSize: '14px',
            fontFamily:
              '"LibreFranklin-Medium",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
            ':hover': {
              backgroundColor: 'rgba(15, 113, 203, 0.05)',
              color: 'primary.dark',
              '.MuiSvgIcon-root': {
                color: 'primary.dark',
              },
            },
          }}
          onClick={onClick}
          {...item}
        >
          {item.title}
        </Link>
      ))}
    </Box>
  )
}
