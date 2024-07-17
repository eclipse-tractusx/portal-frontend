/********************************************************************************
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

import {
  type BoxProps,
  Divider,
  Link,
  ListItem,
  useTheme,
  Box,
  ListItemAvatar,
  Avatar,
} from '@mui/material'
import { type MenuType } from '.'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { useDispatch, useSelector } from 'react-redux'
import { appearMenuSelector, setAppear } from 'features/control/appear'
import { Typography } from '@catena-x/portal-shared-components'
import { type NotificationBadgeType } from '../../generic/Menu/index'

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
  onSelect?: (title: string, children: MenuItemProps[]) => void
  icon?: React.ReactNode
  notificationInfo?: NotificationBadgeType
  isSeparate?: boolean
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
  onSelect,
  icon,
  notificationInfo,
  isSeparate = false,
  ...props
}: MenuItemProps): JSX.Element => {
  const { spacing } = useTheme()
  const dispatch = useDispatch()
  const visible = useSelector(appearMenuSelector)

  return (
    <ListItem
      sx={{
        display: 'flex',
        position: 'relative',
        padding: spacing(0, 0),
        ':hover': {
          borderRadius: 10,
          backgroundColor: 'selected.hover !important',
          color: 'primary.main',
          '.MuiSvgIcon-root': {
            color: 'primary.dark',
          },
        },

        ...(onClick != null && { cursor: 'pointer' }),
      }}
      onClick={(e) => {
        if (isSeparate && onClick !== undefined) {
          onClick(e)
          dispatch(setAppear({ MENU: !visible }))
        } else if (children != null && onSelect != null) {
          onSelect(title, children)
        } else {
          dispatch(setAppear({ MENU: !visible }))
        }
      }}
    >
      {icon ? (
        <ListItemAvatar sx={{ height: 30, width: 30, minWidth: 30, ml: 1 }}>
          <Avatar
            sx={{
              height: 30,
              width: 30,
              color: 'white',
              backgroundColor: 'secondary.main',
              ':hover': {
                color: 'white !important',
                backgroundColor: 'secondary.main !important',
              },
            }}
          >
            {icon}
          </Avatar>
        </ListItemAvatar>
      ) : null}

      <Link
        component={children == null ? component : Box}
        sx={{
          color: `${disable ? 'text.disabled' : 'text.primary'}`,
          pointerEvents: `${disable ? 'none' : 'auto'}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: spacing(hint ? 1.3 : 1.5, 1),

          typography: 'body2',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          fontWeight: 500,
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
        {children != null && <NavigateNextIcon sx={{ color: 'icon.icon02' }} />}
        {notificationInfo != null && notificationInfo.notificationCount > 0 && (
          <Typography
            sx={{
              fontWeight: '500',
              fontSize: '0.75rem',
              minWidth: '20px',
              padding: '2px 6px',
              height: '20px',
              borderRadius: '10px',
              background: notificationInfo.notificationColor,
              color: 'white',
            }}
          >
            {notificationInfo?.notificationCount}
          </Typography>
        )}
      </Link>
      {divider && <Divider />}
    </ListItem>
  )
}
