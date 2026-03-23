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

import { Typography } from '@mui/material'
import type { MenuItemProps } from './MenuItem'
import { useGetNotificationMetaQuery } from 'features/notification/apiSlice'
import { INTERVAL_CHECK_NOTIFICATIONS } from 'types/Constants'
import { useEffect, useState } from 'react'
import { theme } from '@arena2036/portal-shared-components-construct-x'
import { Link as LinkRouter } from 'react-router-dom'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { appearMenuSelector, setAppear } from 'features/control/appear'
import { t } from 'i18next'
import { WraperLink } from './WraperLink'

interface NotificationBadgeType {
  notificationCount: number
  isNotificationAlert: boolean
}

type LinkItem = Partial<Record<'href' | 'to', string>>

interface NotificationLinkProps extends LinkItem {
  onSelect?: (children: MenuItemProps) => void
}

export const NotificationLink = ({
  onSelect,
  ...props
}: NotificationLinkProps): JSX.Element => {
  const dispatch = useDispatch()
  const visible = useSelector(appearMenuSelector)
  const { data } = useGetNotificationMetaQuery(null, {
    pollingInterval: INTERVAL_CHECK_NOTIFICATIONS,
  })

  const [notificationInfo, setNotificationInfo] =
    useState<NotificationBadgeType>()

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
    ? theme.palette.danger.dangerBadge
    : theme.palette.brand.brand02

  return (
    <WraperLink
      onClick={() => {
        dispatch(setAppear({ MENU: !visible }))
      }}
    >
      <>
        <div
          className="badgeBox"
          style={{
            marginRight: '12px',
            marginLeft: '3px',
            backgroundColor: notificationColor,
          }}
        >
          <Typography
            sx={{
              paddingRight: '12px',
            }}
            variant="body2"
          >
            {notificationInfo?.notificationCount}
          </Typography>
        </div>
        <LinkRouter
          className="link-router-text"
          to={props.to ?? '/'}
          {...props}
        >
          {t('pages.mynotifications')}
        </LinkRouter>
      </>
    </WraperLink>
  )
}
