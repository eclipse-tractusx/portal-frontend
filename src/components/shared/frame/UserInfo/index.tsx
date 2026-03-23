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

import { useRef, useState, useEffect } from 'react'
import {
  LanguageSwitch,
  UserAvatar,
  UserMenu,
  UserNav,
  type NotificationBadgeType,
} from '@arena2036/portal-shared-components-construct-x'
import UserService from 'services/UserService'
import i18next, { changeLanguage } from 'i18next'
import I18nService from 'services/I18nService'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './style.scss'
import { INTERVAL_CHECK_NOTIFICATIONS } from 'types/Constants'
import { useGetNotificationMetaQuery } from 'features/notification/apiSlice'
import { setLanguage } from 'features/language/actions'
import { useDispatch } from 'react-redux'
import { Box } from '@mui/material'

export const UserInfo = ({ pages }: { pages: string[] }) => {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const avatar = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const { data } = useGetNotificationMetaQuery(null, {
    pollingInterval: INTERVAL_CHECK_NOTIFICATIONS,
  })
  const [notificationInfo, setNotificationInfo] =
    useState<NotificationBadgeType>()
  const menu = pages.map((link) => ({
    to: link,
    title: t(`pages.${link}`),
  }))

  const openCloseMenu = () => {
    setMenuOpen((prevVal) => !prevVal)
  }

  const onClickAway = (e: MouseEvent | TouchEvent) => {
    if (!avatar.current?.contains(e.target as HTMLDivElement)) {
      setMenuOpen(false)
    }
  }

  useEffect(() => {
    if (
      data?.unread === 0 ||
      (data && data.unread > 0 && data.actionRequired === 0)
    ) {
      setNotificationInfo({
        notificationCount: data.unread,
        isNotificationAlert: false,
      })
    } else if (data && data.unread > 0 && data.actionRequired > 0) {
      setNotificationInfo({
        notificationCount: data.actionRequired,
        isNotificationAlert: true,
      })
    }
  }, [data])

  return (
    <Box className="UserInfo">
      <div ref={avatar}>
        <UserAvatar
          onClick={openCloseMenu}
          notificationCount={notificationInfo?.notificationCount}
          isNotificationAlert={notificationInfo?.isNotificationAlert}
        />
      </div>
      <UserMenu
        open={menuOpen}
        sx={{
          top: '60px',
          width: '256px',
          position: 'absolute',
        }}
        userName={UserService.getName()}
        userRole={UserService.getCompany()}
        onClickAway={onClickAway}
      >
        <UserNav
          component={Link}
          onClick={openCloseMenu}
          divider
          items={menu}
          notificationInfo={notificationInfo}
        />
        <LanguageSwitch
          current={i18next.language}
          languages={I18nService.supportedLanguages.map((key) => ({ key }))}
          onChange={(key: string) => {
            dispatch(setLanguage({ language: key }))
            changeLanguage(key)
          }}
        />
      </UserMenu>
    </Box>
  )
}
