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

import { Box, type BoxProps, Divider, List, useTheme } from '@mui/material'
import uniqueId from 'lodash/uniqueId'
import { MenuItem, type MenuItemProps } from './MenuItem'
import { UserInfo } from '../frame/UserInfo'
import AccessService from 'services/AccessService'
import { Typography } from '@catena-x/portal-shared-components'
import HelpIcon from '@mui/icons-material/Help'
import {
  ApplicationStatus,
  useFetchApplicationsQuery,
} from 'features/registration/registrationApiSlice'
import { useEffect, useState } from 'react'

export interface NotificationBadgeType {
  notificationCount: number
  isNotificationAlert: boolean
}

export interface MenuProps extends BoxProps {
  items: MenuItemProps[]
  component?: React.ElementType
  divider?: boolean
  notificationInfo?: NotificationBadgeType
}

export const MobileMenu = ({
  items,
  divider,
  component,
  onClick,
  notificationInfo,
  ...props
}: MenuProps) => {
  const { spacing } = useTheme()
  const { data } = useFetchApplicationsQuery()
  const companyData = data?.[0]
  const [userMenu, setUserMenu] = useState(AccessService.userMenu())

  useEffect(() => {
    if (
      companyData &&
      Object.values(ApplicationStatus).includes(companyData.applicationStatus)
    ) {
      setUserMenu(AccessService.userMenuReg())
    }
  }, [companyData])

  return (
    <Box {...props}>
      <List sx={{ padding: 0 }}>
        {items?.map((item) => (
          <MenuItem
            {...item}
            component={component}
            menuProps={props}
            Menu={MobileMenu}
            onClick={onClick}
            key={uniqueId('Menu')}
            showNotificationCount={item.to === 'notifications'}
            notificationInfo={notificationInfo}
          />
        ))}
      </List>
      {divider && <Divider sx={{ margin: spacing(0, 1) }} />}
      <Box>
        <UserInfo pages={userMenu} title={'Profile'} isMobile={true} />
      </Box>
      <Box
        className="titleBox"
        onClick={() => {
          window.open(
            `${document.location.origin}/documentation/`,
            'documentation',
            'noreferrer'
          )
        }}
      >
        <div>
          <HelpIcon
            sx={{
              color: '#0f71cb',
              width: '30px',
              height: '30px',
            }}
          />
          <Typography
            sx={{
              paddingLeft: '10px',
            }}
            variant="body2"
          >
            {'Help'}
          </Typography>
        </div>
      </Box>
    </Box>
  )
}

export type MenuType = typeof MobileMenu
