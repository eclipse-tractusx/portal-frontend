/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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

import { useState } from 'react'
import StageHeader from 'components/shared/frame/StageHeader'
import {
  useGetNotificationsQuery,
  useGetNotificationMetaQuery,
} from 'features/notification/apiSlice'
import { CXNotificationContent } from 'features/notification/types'
import { useTranslation } from 'react-i18next'
import NotificationItem from './NotificationItem'
import { groupBy } from 'lodash'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'
import relativeTime from 'dayjs/plugin/relativeTime'
import './Notifications.scss'
import {
  SearchInput,
  ViewSelector,
  SortOption,
} from 'cx-portal-shared-components'
import SortIcon from '@mui/icons-material/Sort'

dayjs.extend(isToday)
dayjs.extend(isYesterday)
dayjs.extend(relativeTime)

const NotificationGroup = ({
  label,
  items,
}: {
  label: string
  items: CXNotificationContent[]
}) => {
  return (
    <>
      <ul className="group">
        {items.map((item: CXNotificationContent) => (
          <NotificationItem key={item.id} item={item} />
        ))}
      </ul>
    </>
  )
}

export default function NotificationCenter() {
  const { t } = useTranslation()
  const { data } = useGetNotificationsQuery(null)
  const { data: pages } = useGetNotificationMetaQuery(null)
  const [searchExpr, setSearchExpr] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selected, setSelected] = useState<string>(
    t('notification.sortOptions.all')
  )
  const [sortOption, setSortOption] = useState<string>('new')
  const setView = (e: React.MouseEvent<HTMLInputElement>) => {
    setSelected(e.currentTarget.value)
  }

  const sortOptions = [
    {
      label: t('notification.sortOptions.new'),
      value: 'new',
    },
    {
      label: t('notification.sortOptions.priority'),
      value: 'priority',
    },
    {
      label: t('notification.sortOptions.unread'),
      value: 'unread',
    },
  ]

  const getTotalCount = (
    read: number | undefined,
    unread: number | undefined
  ) => {
    return read && unread ? read + unread : 0
  }

  const filterButtons = [
    {
      buttonText: `${t('notification.sortOptions.all')} ${getTotalCount(
        pages?.read,
        pages?.unread
      )}`,
      buttonValue: t('notification.sortOptions.all'),
      onButtonClick: setView,
    },
    {
      buttonText: `${t('notification.sortOptions.app')} ${pages?.offerUnread}`,
      buttonValue: t('notification.sortOptions.app'),
      onButtonClick: setView,
    },
    {
      buttonText: `${t('notification.sortOptions.info')} ${pages?.infoUnread}`,
      buttonValue: t('notification.sortOptions.info'),
      onButtonClick: setView,
    },
    {
      buttonText: `${t('notification.sortOptions.withaction')} ${
        pages?.actionRequired
      }`,
      buttonValue: t('notification.sortOptions.withaction'),
      onButtonClick: setView,
    },
  ]

  const groups = groupBy(
    data?.content?.map((item) => ({
      ...item,
      contentParsed: item.content && JSON.parse(item.content),
    })),
    (item: CXNotificationContent) => dayjs(item.created).format('YYYY-MM-DD')
  )

  return (
    <main className="notifications">
      <StageHeader title={t('pages.notifications')} />
      <section>
        <div
          className="searchContainer"
          onMouseLeave={() => setShowModal(!showModal)}
        >
          <SearchInput
            placeholder={t('notification.search')}
            value={searchExpr}
            autoFocus={false}
            onChange={(e) => setSearchExpr(e.target.value)}
          />
          <div>
            <div className="iconSection">
              <SortIcon
                onClick={() => setShowModal(true)}
                sx={{
                  fontSize: 20,
                  color: '#939393',
                  ':hover': { color: '#0D55AF' },
                }}
              />
            </div>
            <div className="sortSection">
              <SortOption
                show={showModal}
                selectedOption={sortOption}
                setSortOption={(value: string) => {
                  setSortOption(value)
                  setShowModal(!showModal)
                }}
                sortOptions={sortOptions}
              />
            </div>
          </div>
        </div>
        <div className="filterSection">
          <ViewSelector activeView={selected} views={filterButtons} />
        </div>
        <ul>
          {groups &&
            Object.entries(groups).map((entry: any) => (
              <li key={entry[0]}>
                <NotificationGroup label={entry[0]} items={entry[1]} />
              </li>
            ))}
        </ul>
      </section>
    </main>
  )
}
