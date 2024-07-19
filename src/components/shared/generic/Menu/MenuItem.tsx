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

import { ArrowForward } from '@mui/icons-material'
import { type BoxProps, Divider, Link, ListItem } from '@mui/material'
import { useState } from 'react'
import { type MenuType, type NotificationBadgeType } from '.'
// TODO: Here i have to import theme from Catena-x.
// This should come from our override file. (finalTheme)
import { Typography, theme } from '@catena-x/portal-shared-components'
import classNames from 'classnames'

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
  disable?: boolean
  notificationInfo?: NotificationBadgeType
  showNotificationCount?: boolean
  isHeader?: boolean
  isActive?: boolean
}

export const MenuItem = ({
  title,
  hint,
  disable,
  children,
  divider,
  component = Link,
  menuProps,
  onClick,
  Menu,
  notificationInfo,
  showNotificationCount,
  isHeader = false,
  isActive,
  ...props
}: MenuItemProps) => {
  const [open, setOpen] = useState(false)
  const notificationColor = notificationInfo?.isNotificationAlert
    ? theme.palette.danger.dangerBadge
    : theme.palette.brand.brand02
  const onMouseEnter = () => {
    setOpen(true)
  }

  const onMouseLeave = () => {
    setOpen(false)
  }

  return (
    <ListItem
      sx={{
        display: 'block',
        position: 'relative',
        padding: theme.spacing(0, 1),
        ...(onClick != null && { cursor: 'pointer' }),
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={(e) => {
        ;(onClick == null || disable) ?? onClick(e)
      }}
      className={isHeader ? 'menuHeaderItem' : 'menuItem'}
    >
      <Link
        component={component}
        className={classNames({ active: isActive })}
        sx={{
          color: `${disable ? 'text.disabled' : 'text.primary'}`,
          pointerEvents: `${disable ? 'none' : 'auto'}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: theme.spacing(hint ? 1.3 : 1.5, 2),
          borderRadius: theme.spacing(1),
          typography: 'body2',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          fontWeight: 500,
          ':hover': !isHeader
            ? {
                backgroundColor: 'selected.hover',
                '.MuiSvgIcon-root': {
                  color: 'primary.main',
                },
              }
            : {},
          '&.active': {
            color: 'primary.main',
          },

          ...(isHeader
            ? {
                typography: 'h6',
                textTransform: 'uppercase',
              }
            : {}),
        }}
        {...props}
      >
        {title}

        {children != null && (
          <ArrowForward fontSize="small" sx={{ color: 'icon.icon02' }} />
        )}
        {showNotificationCount &&
          notificationInfo != null &&
          notificationInfo.notificationCount > 0 && (
            <Typography
              sx={{
                fontWeight: '500',
                fontSize: '0.75rem',
                minWidth: '20px',
                padding: '2px 6px',
                height: '20px',
                borderRadius: '10px',
                background: notificationColor,
                color: 'white',
              }}
            >
              {notificationInfo?.notificationCount}
            </Typography>
          )}
      </Link>
      {Menu != null && children != null && open && (
        <Menu items={children} {...menuProps} />
      )}
      {divider && <Divider />}
    </ListItem>
  )
}
