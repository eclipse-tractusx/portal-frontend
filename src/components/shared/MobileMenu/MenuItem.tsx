/********************************************************************************
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
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

import {
  type BoxProps,
  Divider,
  Link,
  ListItem,
  useTheme,
  Box,
} from '@mui/material'
import { useState } from 'react'
import { type MenuType, type NotificationBadgeType } from '.'
import { Typography } from '@catena-x/portal-shared-components'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { appearMenuSelector, setAppear } from 'features/control/appear'
import { useDispatch, useSelector } from 'react-redux'

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
  ...props
}: MenuItemProps) => {
  const { spacing } = useTheme()
  const visible = useSelector(appearMenuSelector)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const notificationColor = notificationInfo?.isNotificationAlert
    ? '#FB6540'
    : '#B3CB2D'

  return (
    <ListItem
      sx={{
        display: 'block',
        position: 'relative',
        padding: spacing(0, 1),
        ...(onClick != null && { cursor: 'pointer' }),
      }}
      onClick={() => {
        if (children != null) {
          setOpen(!open)
        } else {
          dispatch(setAppear({ MENU: !visible }))
        }
      }}
    >
      <Link
        component={children == null ? component : Box}
        sx={{
          color: `${disable ? 'text.disabled' : 'text.primary'}`,
          pointerEvents: `${disable ? 'none' : 'auto'}`,
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
        {children != null && !open && (
          <KeyboardArrowRightIcon sx={{ color: 'icon.icon02' }} />
        )}
        {children != null && open && (
          <KeyboardArrowDownIcon sx={{ color: 'icon.icon02' }} />
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
        <>
          {children?.map((item) => (
            <Link
              component={component}
              key={item.title}
              sx={{
                color: `${disable ? 'text.disabled' : 'text.primary'}`,
                pointerEvents: `${disable ? 'none' : 'auto'}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: spacing(hint ? 1.3 : 1.5, 2),
                borderRadius: 3,
                typography: 'label3',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                marginLeft: '20px',
                ':hover': {
                  backgroundColor: 'selected.hover',
                  color: 'primary.dark',
                  '.MuiSvgIcon-root': {
                    color: 'primary.dark',
                  },
                },
              }}
              onClick={() => {
                if (children != null) {
                  setOpen(!open)
                  dispatch(setAppear({ MENU: !visible }))
                }
              }}
              to={item.to}
            >
              {item.title}
            </Link>
          ))}
        </>
      )}
      {divider && <Divider />}
    </ListItem>
  )
}
