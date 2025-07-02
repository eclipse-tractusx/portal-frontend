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

import { MenuItem, type MenuItemProps } from './MenuItem'
import { useGetNotificationMetaQuery } from 'features/notification/apiSlice'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import { INTERVAL_CHECK_NOTIFICATIONS } from 'types/Constants'
import { useEffect, useState } from 'react'
import '../../frame/MobileMenu/style.scss'
import { t } from 'i18next'
import { useNavigate } from 'react-router-dom'
import { theme } from '@cofinity-x/shared-components'
import { type paletteDefinitions } from 'theme.override'

interface NotificationBadgeType {
  notificationCount: number
  isNotificationAlert: boolean
}

type LinkItem = Partial<Record<'href' | 'to', string>>

interface NotificationLinkProps extends LinkItem {
  onSelect?: (title: string, children: MenuItemProps[]) => void
  onClick?: React.MouseEventHandler
}

export const NotificationLink = ({
  onSelect,
  ...props
}: NotificationLinkProps): JSX.Element => {
  const navigate = useNavigate()

  const { data } = useGetNotificationMetaQuery(null, {
    pollingInterval: INTERVAL_CHECK_NOTIFICATIONS,
  })

  const [notificationInfo, setNotificationInfo] =
    useState<NotificationBadgeType>({
      isNotificationAlert: false,
      notificationCount: 0,
    })

  useEffect(() => {
    if (
      data?.unread === 0 ||
      (data != null && data.unread > 0 && data.actionRequired === 0)
    ) {
      setNotificationInfo({
        notificationCount: data.unread,
        isNotificationAlert: false,
      })
    } else if (data != null && data.unread > 0 && data.actionRequired > 0) {
      setNotificationInfo({
        notificationCount: data.actionRequired,
        isNotificationAlert: true,
      })
    }
  }, [data])

  const notificationColor = notificationInfo?.isNotificationAlert
    ? (theme.palette as unknown as typeof paletteDefinitions).danger.dangerBadge
    : (theme.palette as unknown as typeof paletteDefinitions).brand.brand02

  return (
    <MenuItem
      {...props}
      title={t('pages.mynotifications')}
      notificationInfo={{ ...notificationInfo, notificationColor }}
      isSeparate={true}
      onClick={() => {
        if (props.to) navigate(props.to)
      }}
      icon={<NotificationsNoneIcon sx={{ height: 18, width: 18 }} />}
    />
  )
}
