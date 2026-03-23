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
} from '@mui/material'
import { type MenuType } from '.'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { useDispatch, useSelector } from 'react-redux'
import { appearMenuSelector, setAppear } from 'features/control/appear'

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
  ...props
}: MenuItemProps): JSX.Element => {
  const { spacing } = useTheme()
  const dispatch = useDispatch()
  const visible = useSelector(appearMenuSelector)

  return (
    <ListItem
      sx={{
        display: 'block',
        position: 'relative',
        padding: spacing(0, 1),
        ...(onClick != null && { cursor: 'pointer' }),
      }}
      onClick={() => {
        if (children != null && onSelect != null) {
          onSelect(title, children)
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
          fontSize: '14px',
          fontFamily: 'Montserrat-Light',
          ':hover': {
            backgroundColor: 'rgba(15, 113, 203, 0.05)',
            color: 'primary.dark',
            '.MuiSvgIcon-root': {
              color: 'primary.dark',
            },
          },
        }}
        {...props}
      >
        {title}
        {children != null && (
          <KeyboardArrowRightIcon sx={{ color: 'icon.icon02' }} />
        )}
      </Link>
      {divider && <Divider />}
    </ListItem>
  )
}
