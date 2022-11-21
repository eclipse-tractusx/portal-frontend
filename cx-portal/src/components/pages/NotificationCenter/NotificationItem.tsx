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
import {
  useDeleteNotificationMutation,
  useSetNotificationReadMutation,
} from 'features/notification/apiSlice'
import {
  CXNotificationContent,
  NotificationType,
} from 'features/notification/types'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import UserService from 'services/UserService'
import relativeTime from 'dayjs/plugin/relativeTime'
import './Notifications.scss'
import { Typography } from 'cx-portal-shared-components'
import LabelImportantIcon from '@mui/icons-material/LabelImportant'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import DeleteNotificationConfirmOverlay from './DeleteNotificationConfirmOverlay'

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

const NotificationContent = ({
  item,
  navlinks,
}: {
  item: CXNotificationContent
  navlinks?: string[]
}) => {
  const { t } = useTranslation('notification')
  const message = item.contentParsed?.message
  const userId = item.contentParsed?.userId
  const appId = item.contentParsed?.appId
  const you = UserService.getName()

  return (
    <>
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

const NotificationConfig = ({ item }: { item: CXNotificationContent }) => {
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

export default function NotificationItem({
  item,
}: {
  item: CXNotificationContent
}) {
  const { t } = useTranslation()
  const [open, setOpen] = useState<boolean>(false)
  const [setNotificationRead] = useSetNotificationReadMutation()
  const [deleteNotification] = useDeleteNotificationMutation()
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
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

  const onDelete = async () => {
    setLoading(true)
    await deleteNotification(item.id).unwrap()
    setShowDeleteModal(false)
  }

  return (
    <>
      {showDeleteModal && (
        <DeleteNotificationConfirmOverlay
          title={t('notification.deleteModal.title')}
          intro={t('notification.deleteModal.intro')}
          handleClose={(e: { stopPropagation: () => void }) => {
            setShowDeleteModal(false)
            e.stopPropagation()
          }}
          handleCallback={() => onDelete()}
          loading={loading}
        />
      )}
      <li
        style={{
          backgroundColor: item.isRead
            ? 'rgba(255, 255, 255, 1)'
            : 'rgba(15, 113, 203, 0.05)',
          borderColor: open ? '#FDB943' : 'transparent',
        }}
      >
        <div onClick={toggle} className="item">
          <div className="firstSection">
            <LabelImportantIcon
              sx={{ fontSize: 15, color: open ? '#FDB943' : 'transparent' }}
            />
            <Typography
              variant="h1"
              style={{
                fontWeight: 600,
                marginLeft: '10px',
                fontSize: '11px',
              }}
            >
              {dayjs(item.created).format('DD.MM.YY HH:mm')}
            </Typography>
          </div>
          <div className="middleSection">
            <Typography
              variant="h1"
              style={{
                fontWeight: 600,
                marginLeft: '10px',
                fontSize: '14px',
              }}
            >
              {' '}
              {t(`${item.typeId}`)}
            </Typography>
            {open && (
              <div className="content">
                <NotificationConfig item={item} />
              </div>
            )}
          </div>

          <div
            className="actionButton"
            style={{
              backgroundColor: open ? '#FDB943' : 'transparent',
            }}
          >
            <Typography
              variant="h1"
              style={{
                fontWeight: 600,
                marginLeft: '10px',
                fontSize: '11px',
              }}
            >
              {open ? t('notification.actionRequired') : ''}
            </Typography>
          </div>
          <div className="lastSection">
            <div className="padding-r-5">
              {!open && <KeyboardArrowDownIcon sx={{ fontSize: 15 }} />}
              {open && <KeyboardArrowUpIcon sx={{ fontSize: 15 }} />}
            </div>
            <div
              className="padding-l-5"
              onClick={(e) => {
                setShowDeleteModal(true)
                e.stopPropagation()
              }}
            >
              <CloseIcon sx={{ fontSize: 15 }} />
            </div>
          </div>
        </div>
      </li>
    </>
  )
}
