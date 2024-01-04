/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
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

import dayjs from 'dayjs'
import { useFetchUserDetailsQuery } from 'features/admin/userApiSlice'
import { useFetchAppDetailsQuery } from 'features/apps/apiSlice'
import {
  useDeleteNotificationMutation,
  useSetNotificationReadMutation,
} from 'features/notification/apiSlice'
import {
  type CXNotificationContent,
  NotificationType,
  PAGE,
  PAGE_SIZE,
  SORT_OPTION,
  NOTIFICATION_TOPIC,
} from 'features/notification/types'
import { useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import UserService from 'services/UserService'
import relativeTime from 'dayjs/plugin/relativeTime'
import './Notifications.scss'
import { Tooltips, Typography } from '@catena-x/portal-shared-components'
import LabelImportantIcon from '@mui/icons-material/LabelImportant'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import DeleteNotificationConfirmOverlay from './DeleteNotificationConfirmOverlay'
import { useDispatch } from 'react-redux'
import { resetInitialNotificationState } from 'features/notification/actions'
import { PAGES } from 'types/Constants'
import DoneIcon from '@mui/icons-material/Done'
import EmailIcon from '@mui/icons-material/Email'
import DraftsIcon from '@mui/icons-material/Drafts'

dayjs.extend(relativeTime)

const NameLink = ({
  fetchHook,
  id,
  path,
  renderName,
}: {
  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  fetchHook: any
  id?: string
  path: string
  renderName: (item: {
    firstName: string
    lastName: string
    title: string
  }) => string
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
  const appName = item.contentParsed?.AppName ?? item.contentParsed?.appName
  const companyName = item.contentParsed?.RequestorCompanyName
  const offerName = item.contentParsed?.OfferName
  const userName = item.contentParsed?.username
  const coreOfferName = item.contentParsed?.coreOfferName
  const removedRoles = item.contentParsed?.removedRoles
  const addedRoles = item.contentParsed?.addedRoles
  const credentialType = item.contentParsed?.type
  const newUrl = item.contentParsed?.newUrl
  const roles = item.contentParsed?.Roles
  const userEmail = item.contentParsed?.UserEmail

  return (
    <>
      <div>
        <Trans
          ns="notification"
          i18nKey={`${item.typeId}.content`}
          values={{
            you,
            app: appName,
            offer: offerName,
            company: companyName,
            username: userName,
            coreOfferName,
            removedRoles: removedRoles ? removedRoles : '-',
            addedRoles: addedRoles ? addedRoles : '-',
            credentialType,
            newUrl,
            roles: roles?.join(', '),
            useremail: userEmail,
          }}
        >
          <NameLink
            fetchHook={useFetchUserDetailsQuery}
            id={userId}
            path={'userdetails'}
            renderName={(item: { firstName: string; lastName: string }) =>
              `${item.firstName} ${item.lastName}`
            }
          />
          <NameLink
            fetchHook={useFetchAppDetailsQuery}
            id={appId}
            path={'appdetail'}
            renderName={(item: { title: string }) => item.title}
          />
        </Trans>
      </div>
      {message && <div className="message">{message}</div>}
      {(appId ?? userId ?? navlinks) && (
        <div className="links">
          {navlinks?.map((nav) => (
            <NavLink key={nav} to={`/${nav}`}>
              {t(`link.${nav}`)}
            </NavLink>
          ))}
          {appId && (
            <NavLink key={appId} to={`/appdetail/${appId}`}>
              {t('link.app')}
            </NavLink>
          )}
          {userId && (
            <NavLink key={userId} to={`/userdetails/${userId}`}>
              {t('link.user')}
            </NavLink>
          )}
        </div>
      )}
    </>
  )
}

const NotificationConfig = ({ item }: { item: CXNotificationContent }) => {
  switch (item.typeId) {
    case NotificationType.APP_SUBSCRIPTION_ACTIVATION:
      return <NotificationContent item={item} navlinks={['usermanagement']} />
    case NotificationType.WELCOME:
      return <NotificationContent item={item} navlinks={['home']} />
    case NotificationType.WELCOME_APP_MARKETPLACE:
      return <NotificationContent item={item} navlinks={['appmarketplace']} />
    case NotificationType.WELCOME_CONNECTOR_REGISTRATION:
      return <NotificationContent item={item} navlinks={['technicalsetup']} />
    case NotificationType.WELCOME_USE_CASES:
      return <NotificationContent item={item} navlinks={['usecase']} />
    case NotificationType.WELCOME_SERVICE_PROVIDER:
      return (
        <NotificationContent item={item} navlinks={['servicemarketplace']} />
      )
    case NotificationType.APP_SUBSCRIPTION_REQUEST:
      return (
        <NotificationContent item={item} navlinks={[PAGES.APPSUBSCRIPTION]} />
      )
    case NotificationType.APP_RELEASE_REQUEST:
      return <NotificationContent item={item} navlinks={[PAGES.ADMINBOARD]} />
    case NotificationType.APP_RELEASE_APPROVAL:
      return (
        <NotificationContent item={item} navlinks={[PAGES.USER_MANAGEMENT]} />
      )
    case NotificationType.APP_RELEASE_REJECTION:
      return <NotificationContent item={item} navlinks={[PAGES.APPOVERVIEW]} />
    case NotificationType.TECHNICAL_USER_CREATION:
      return (
        <NotificationContent
          item={item}
          navlinks={[PAGES.TECHUSER_MANAGEMENT]}
        />
      )
    case NotificationType.SERVICE_REQUEST:
      return (
        <NotificationContent
          item={item}
          navlinks={[PAGES.SERVICESUBSCRIPTION]}
        />
      )
    case NotificationType.SERVICE_RELEASE_REQUEST:
      return (
        <NotificationContent item={item} navlinks={[PAGES.SERVICEADMINBOARD]} />
      )
    case NotificationType.ROLE_UPDATE_APP_OFFER:
      return <NotificationContent item={item} />
    case NotificationType.ROLE_UPDATE_CORE_OFFER:
      return <NotificationContent item={item} navlinks={[PAGES.ROLE_DETAILS]} />
    case NotificationType.CREDENTIAL_APPROVAL:
      return <NotificationContent item={item} />
    case NotificationType.CREDENTIAL_REJECTED:
      return <NotificationContent item={item} />
    case NotificationType.SUBSCRIPTION_URL_UPDATE:
      return <NotificationContent item={item} />
    case NotificationType.APP_ROLE_ADDED:
      return <NotificationContent item={item} />
    default:
      return <pre>{JSON.stringify(item, null, 2)}</pre>
  }
}

export default function NotificationItem({
  item,
}: {
  item: CXNotificationContent
}) {
  const { t } = useTranslation('notification')
  const [open, setOpen] = useState<boolean>(false)
  const [setNotificationRead] = useSetNotificationReadMutation()
  const [deleteNotification] = useDeleteNotificationMutation()
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
  const [userRead, setUserRead] = useState<boolean>(false)

  const setRead = async (id: string, value: boolean) => {
    try {
      await setNotificationRead({ id, flag: value })
    } catch (error: unknown) {
      console.log(error)
    }
  }

  useEffect(() => {
    setUserRead(item.userRead)
  }, [item.userRead])

  const toggle = () => {
    const nextState = !open
    if (nextState && !userRead) {
      setUserRead(true)
      void setRead(item.id, true)
    }
    setOpen(nextState)
  }

  const onDelete = async () => {
    setLoading(true)
    await deleteNotification(item.id).unwrap()
    dispatch(
      resetInitialNotificationState({
        page: PAGE,
        size: PAGE_SIZE,
        args: {
          notificationTopic: NOTIFICATION_TOPIC.ALL,
          sorting: SORT_OPTION,
        },
      })
    )
    setShowDeleteModal(false)
  }

  return (
    <>
      {showDeleteModal && (
        <DeleteNotificationConfirmOverlay
          title={t('deleteModal.title')}
          intro={t('deleteModal.intro')}
          handleClose={(e: { stopPropagation: () => void }) => {
            setShowDeleteModal(false)
            e.stopPropagation()
          }}
          handleCallback={() => void onDelete()}
          loading={loading}
        />
      )}
      <li
        onClick={toggle}
        onKeyDown={() => {
          // do nothing
        }}
        style={{
          backgroundColor: userRead
            ? 'rgba(255, 255, 255, 1)'
            : 'rgba(15, 113, 203, 0.05)',
          borderColor: open ? '#FDB943' : 'transparent',
        }}
      >
        <div className="item">
          <div className="firstSection">
            <LabelImportantIcon
              sx={{
                fontSize: 15,
                color:
                  item.notificationTopic === 'ACTION'
                    ? '#FDB943'
                    : 'transparent',
              }}
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
          <div
            className={
              item.notificationTopic === 'ACTION'
                ? 'shortMiddleSection'
                : 'longMiddleSection'
            }
          >
            <Typography
              variant="h1"
              style={{
                fontWeight: 600,
                marginLeft: '10px',
                fontSize: '14px',
              }}
            >
              {' '}
              {t(`${item.typeId}.title`, {
                app: item.contentParsed?.AppName ?? item.contentParsed?.appName,
                offer: item.contentParsed?.OfferName,
                credentialType: item.contentParsed?.type,
              })}
            </Typography>
            {open && (
              <div className="content">
                <NotificationConfig item={item} />
              </div>
            )}
          </div>
          {item.notificationTopic === 'ACTION' && (
            <div
              className={
                item.notificationTopic === 'ACTION' && open
                  ? 'actionButton'
                  : 'actionButtonTransparent'
              }
            >
              <Typography variant="h1" className="actionRequiredText">
                {item.notificationTopic === 'ACTION' && open
                  ? t('actionRequired')
                  : ''}
              </Typography>
            </div>
          )}
          <div className="lastSection">
            <div className="padding-r-10">
              {item.done && <DoneIcon sx={{ fontSize: 15 }} />}
            </div>
            <div
              className="padding-r-10"
              onClick={(e) => {
                setUserRead(!userRead)
                setRead(item.id, !userRead)
                e.stopPropagation()
              }}
              onKeyDown={() => {
                // do nothing
              }}
            >
              {userRead ? (
                <Tooltips
                  additionalStyles={{
                    cursor: 'pointer',
                    marginTop: '30px !important',
                  }}
                  tooltipPlacement="top-start"
                  tooltipText={t('tooltip.email.read')}
                  children={
                    <div>
                      <DraftsIcon sx={{ fontSize: 15 }} />
                    </div>
                  }
                />
              ) : (
                <Tooltips
                  additionalStyles={{
                    cursor: 'pointer',
                    marginTop: '30px !important',
                  }}
                  tooltipPlacement="top-start"
                  tooltipText={t('tooltip.email.unread')}
                  children={
                    <div>
                      <EmailIcon sx={{ fontSize: 15 }} />
                    </div>
                  }
                />
              )}
            </div>
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
              onKeyDown={() => {
                // do nothing
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
