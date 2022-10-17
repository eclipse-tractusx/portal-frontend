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

import { Box, Link, useTheme } from '@mui/material'
import { useState } from 'react'
import classNames from 'classnames'
import { Menu } from '../../basic/Menu'
import { MenuItemProps } from '../../basic/Menu/MenuItem'

interface NavItemProps extends MenuItemProps {
  isActive?: boolean
  unstyled?: boolean
}

export const NavItem = ({
  title,
  children,
  component = Link,
  isActive = false,
  unstyled = false,
  ...props
}: NavItemProps) => {
  const { spacing, shadows } = useTheme()
  const [open, setOpen] = useState(false)

  const onMouseEnter = () => setOpen(true)

  const onMouseLeave = () => setOpen(false)

  return (
    <Box
      sx={{ position: 'relative' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link
        className={classNames({ active: isActive })}
        component={component}
        sx={{
          display: 'block',
          typography: 'body3',
          margin: spacing(0, 1),
          ':hover, &.active': {
            color: 'primary.dark',
          },
          ...(!unstyled && {
            typography: 'label3',
            color: 'text.tertiary',
            padding: spacing(1, 0),
            margin: spacing(0, 2),
            '&.active': {
              color: 'primary.main',
              borderBottom: '2px solid',
              marginBottom: '-2px',
            },
          }),
        }}
        {...props}
      >
        {title}
      </Link>
      {children && open && (
        <Menu
          items={children}
          component={component}
          sx={{
            position: 'absolute',
            top: spacing(4.5),
            left: spacing(-1),
            minWidth: 220,
            padding: spacing(2, 0),
            borderRadius: 4,
            backgroundColor: 'background.background01',
            boxShadow: shadows['20'],
            '.MuiBox-root': {
              left: 256,
              top: spacing(-2),
            },
          }}
        />
      )}
    </Box>
  )
}
