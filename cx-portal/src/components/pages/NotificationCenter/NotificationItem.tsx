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

import dayjs from 'dayjs'
import { useFetchUserDetailsQuery } from 'features/admin/userApiSlice'
import { useFetchAppDetailsQuery } from 'features/apps/apiSlice'
import { useSetNotificationReadMutation } from 'features/notification/apiSlice'
import { CXNotification, NotificationType } from 'features/notification/types'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import UserService from 'services/UserService'
import relativeTime from 'dayjs/plugin/relativeTime'
import './Notifications.scss'

dayjs.extend(relativeTime)

const NameLink = ({
  fetchHook,
  id,
  path,
  renderName,
}: {
  fetchHook: any
  id?: string
  path: string
  renderName: (item: any) => string
}) => {
  const { data } = fetchHook(id)
  return <NavLink to={`/${path}/${id}`}>{data ? renderName(data) : id}</NavLink>
}

const getDueState = (dueDate?: dayjs.Dayjs) => {
  if (!dueDate) return ''
  const today = dayjs()
  if (dueDate.isBefore(today)) return 'over'
  if (dueDate.isBefore(today.add(8, 'days'))) return 'soon'
  return 'okay'
}

const NotificationContent = ({
  item,
  navlinks,
}: {
  item: CXNotification
  navlinks?: string[]
}) => {
  const { t } = useTranslation('notification')
  const message = item.contentParsed?.message
  const userId = item.contentParsed?.userId
  const appId = item.contentParsed?.appId
  const you = UserService.getName()
  const dueDate = dayjs(item.dueDate)
  const dueState = getDueState(dueDate)

  return (
    <>
      {dueDate && (
        <div className={`due ${dueState}`} style={{ marginBottom: '8px' }}>
          {t('due')} {dueDate.format('YYYY-MM-DD')} ({dueDate.fromNow()})
        </div>
      )}
      <div>
        <Trans
          ns="notification"
          i18nKey={`${item.typeId}.content`}
          values={{ you }}
        >
          <NameLink
            fetchHook={useFetchUserDetailsQuery}
            id={userId}
            path={'userdetails'}
            renderName={(item: any) => `${item.firstName} ${item.lastName}`}
          />
          <NameLink
            fetchHook={useFetchAppDetailsQuery}
            id={appId}
            path={'appdetail'}
            renderName={(item: any) => item.title}
          />
        </Trans>
      </div>
      {message && <div className="message">{message}</div>}
      {(appId || userId || navlinks) && (
        <div className="links">
          {navlinks?.map((nav) => (
            <NavLink key={nav} to={`/${nav}`}>
              {t(`link.${nav}`)}
            </NavLink>
          ))}
          {appId && (
            <NavLink key={appId} to={`/appdetail/${appId}`}>
              {t(`link.app`)}
            </NavLink>
          )}
          {userId && (
            <NavLink key={userId} to={`/userdetails/${userId}`}>
              {t(`link.user`)}
            </NavLink>
          )}
        </div>
      )}
    </>
  )
}

const NotificationConfig = ({ item }: { item: CXNotification }) => {
  switch (item.typeId) {
    case NotificationType.APP_SUBSCRIPTION_REQUEST:
    case NotificationType.APP_SUBSCRIPTION_ACTIVATION:
      return <NotificationContent item={item} />
    case NotificationType.WELCOME:
      return <NotificationContent item={item} navlinks={['home']} />
    case NotificationType.WELCOME_APP_MARKETPLACE:
      return <NotificationContent item={item} navlinks={['appmarketplace']} />
    case NotificationType.WELCOME_CONNECTOR_REGISTRATION:
      return <NotificationContent item={item} navlinks={['technicalsetup']} />
    case NotificationType.WELCOME_USE_CASES:
      return <NotificationContent item={item} navlinks={['usecases']} />
    case NotificationType.WELCOME_SERVICE_PROVIDER:
      return <NotificationContent item={item} navlinks={['serviceprovider']} />
    default:
      return <pre>{JSON.stringify(item, null, 2)}</pre>
  }
}

export default function NotificationItem({ item }: { item: CXNotification }) {
  const { t } = useTranslation('notification')
  const [open, setOpen] = useState<boolean>(false)
  const [setNotificationRead] = useSetNotificationReadMutation()
  const dueDate = dayjs(item.dueDate)
  const dueState = getDueState(dueDate)

  const setRead = async (id: string) => {
    try {
      await setNotificationRead(id)
    } catch (error: unknown) {
      console.log(error)
    }
  }

  const toggle = async () => {
    const nextState = !open
    if (nextState && !item.isRead) {
      setRead(item.id)
    }
    setOpen(nextState)
  }

  return (
    <li>
      <div onClick={toggle} className="item">
        <div className="created">{dayjs(item.created).format('HH:mm')}</div>
        <div className={`title ${item.isRead ? 'read' : 'unread'}`}>
          {t(`${item.typeId}.title`)}
        </div>
        {item.dueDate && <div className={`due ${dueState}`}>!</div>}
      </div>
      {open && (
        <div className="content">
          <NotificationConfig item={item} />
        </div>
      )}
    </li>
  )
}
