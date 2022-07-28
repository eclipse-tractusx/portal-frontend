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
import { show } from 'features/control/overlay/actions'
import { CXNotification, NotificationType } from 'features/notification/types'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import UserService from 'services/UserService'
import { OVERLAYS } from 'types/Constants'
import './Notifications.scss'

const NotificationContent = ({
  item,
  navlinks,
}: {
  item: CXNotification
  navlinks?: string[]
}) => {
  const tn = useTranslation('notification', {
    keyPrefix: item.notificationTypeId,
  }).t
  const { t } = useTranslation('notification')
  const dispatch = useDispatch()
  const message = item.contentParsed?.message
  const app = item.contentParsed?.appId
  const user = item.creatorId
  return (
    <>
      <div>{tn('content', { you: UserService.getName(), user, app })}</div>
      {message && <div className="message">{message}</div>}
      {(app || user || navlinks) && (
        <div className="links">
          {navlinks?.map((nav) => (
            <NavLink key={nav} to={`/${nav}`}>
              {t(`link.${nav}`)}
            </NavLink>
          ))}
          {app && (
            <span onClick={() => dispatch(show(OVERLAYS.APP, app))}>
              {t('link.app')}
            </span>
          )}
          {user && (
            <span onClick={() => dispatch(show(OVERLAYS.USER, user))}>
              {t('link.user')}
            </span>
          )}
        </div>
      )}
    </>
  )
}

const NotificationConfig = ({ item }: { item: CXNotification }) => {
  switch (item.notificationTypeId) {
    case NotificationType.PersonalMessage:
    case NotificationType.AppRequestSubmitted:
    case NotificationType.AppRequestReceived:
    case NotificationType.AppRequestApproved:
    case NotificationType.AppRequestRejected:
    case NotificationType.AppSubscriptionSubmitted:
    case NotificationType.AppSubscriptionReceived:
    case NotificationType.AppSubscriptionApproved:
    case NotificationType.AppSubscriptionRejected:
      return <NotificationContent item={item} />
    case NotificationType.WelcomeInvite:
    case NotificationType.WelcomeUser:
      return <NotificationContent item={item} navlinks={['home']} />
    case NotificationType.WelcomeAppMarketplace:
      return <NotificationContent item={item} navlinks={['appmarketplace']} />
    case NotificationType.NoConnector:
      return <NotificationContent item={item} navlinks={['technicalsetup']} />
    case NotificationType.NoUseCase:
      return <NotificationContent item={item} navlinks={['usecases']} />
    default:
      return <pre>{JSON.stringify(item, null, 2)}</pre>
  }
}

export default function NotificationItem({ item }: { item: CXNotification }) {
  const { t } = useTranslation('notification')
  const [open, setOpen] = useState<boolean>(false)
  const toggle = () => setOpen(!open)
  return (
    <li>
      <div onClick={toggle} className="item">
        <div className="created">{dayjs(item.created).format('hh:mm')}</div>
        <div className={`title ${item.read ? 'read' : 'unread'}`}>
          {t(`${item.notificationTypeId}.title`)}
        </div>
      </div>
      {open && (
        <div className="content">
          <NotificationConfig item={item} />
        </div>
      )}
    </li>
  )
}
