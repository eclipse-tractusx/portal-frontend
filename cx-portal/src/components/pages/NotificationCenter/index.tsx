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

import { useEffect, useState } from 'react'
import StageHeader from 'components/shared/frame/StageHeader'
import {
  useGetNotificationsQuery,
  useGetNotificationMetaQuery,
} from 'features/notification/apiSlice'
import {
  CXNotificationContent,
  CXNotificationPagination,
} from 'features/notification/types'
import { useTranslation } from 'react-i18next'
import { LoadMoreButton } from '../../shared/basic/LoadMoreButton'
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
  CircleProgress,
} from 'cx-portal-shared-components'
import SortIcon from '@mui/icons-material/Sort'
import { Box } from '@mui/material'

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
  const { t } = useTranslation('notification')
  const { data: pages } = useGetNotificationMetaQuery(null)
  const [searchExpr, setSearchExpr] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [filterOption, setFilterOption] = useState<string>(t('ALL'))
  const [loaded, setLoaded] = useState<boolean>(false)
  const [sortOption, setSortOption] = useState<string>('DateDesc')
  const [page, setPage] = useState<number>(0)
  const PAGE_SIZE = 10
  const [notificationState, setNotificationState] = useState({
    page: page,
    size: PAGE_SIZE,
    args: {
      notificationTopic: filterOption,
      sorting: sortOption,
    },
  })
  const { data, isFetching } = useGetNotificationsQuery(notificationState)

  const [notificationItems, setNotificationItems] = useState<
    CXNotificationContent[]
  >([])
  const [paginationData, setPaginationData] =
    useState<CXNotificationPagination>()
  const setView = (e: React.MouseEvent<HTMLInputElement>) => {
    setLoaded(true)
    setPage(0)
    setFilterOption(e.currentTarget.value)
  }

  useEffect(() => {
    if (data) {
      setPaginationData(data?.meta)
      setNotificationItems(
        data?.meta.page !== page
          ? (i) => i.concat(data?.content)
          : data?.content
      )
    }
    //Disabled link check - Because can not run this block on change of Page value. It has to run only when data changes
    // eslint-disable-next-line
  }, [data])

  const nextPage = () => setPage(page + 1)

  const sortOptions = [
    {
      label: t('sortOptions.new'),
      value: 'DateDesc',
    },
    {
      label: t('sortOptions.oldest'),
      value: 'DateAsc',
    },
    {
      label: t('sortOptions.unread'),
      value: 'ReadStatusAsc',
    },
  ]

  useEffect(() => {
    if (loaded) {
      setNotificationItems([])
      setLoaded(false)
    }
    setNotificationState({
      page: page,
      size: PAGE_SIZE,
      args: {
        notificationTopic: filterOption,
        sorting: sortOption,
      },
    })
  }, [filterOption, sortOption, page, loaded])

  const getTotalCount = (unread = 0) => (unread ? unread : 0)

  const filterButtons = [
    {
      buttonText: `${t('sortOptions.all')} (${getTotalCount(pages?.unread)})`,
      buttonValue: 'ALL',
      onButtonClick: setView,
    },
    {
      buttonText: `${t('sortOptions.app')} (${pages?.offerUnread || 0})`,
      buttonValue: 'OFFER',
      onButtonClick: setView,
    },
    {
      buttonText: `${t('sortOptions.info')} (${pages?.infoUnread || 0})`,
      buttonValue: 'INFO',
      onButtonClick: setView,
    },
    {
      buttonText: `${t('sortOptions.withaction')} (${
        pages?.actionRequired || 0
      })`,
      buttonValue: 'ACTION',
      onButtonClick: setView,
    },
  ]

  const groups = groupBy(
    notificationItems.map((item) => ({
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
          onMouseLeave={() => setShowModal(false)}
        >
          <SearchInput
            placeholder={t('search')}
            value={searchExpr}
            autoFocus={false}
            autoComplete="off"
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
                  setShowModal(false)
                  setLoaded(true)
                  setPage(0)
                }}
                sortOptions={sortOptions}
              />
            </div>
          </div>
        </div>
        <div className="filterSection">
          <ViewSelector activeView={filterOption} views={filterButtons} />
        </div>
        {isFetching && (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '200px',
            }}
          >
            <CircleProgress
              size={40}
              step={1}
              interval={0.1}
              colorVariant={'primary'}
              variant={'indeterminate'}
              thickness={8}
            />
          </Box>
        )}
        {!isFetching && (
          <ul>
            {groups &&
              Object.entries(groups).map((entry: any) => (
                <li key={entry[0]}>
                  <NotificationGroup label={entry[0]} items={entry[1]} />
                </li>
              ))}
          </ul>
        )}
        {!isFetching &&
          paginationData &&
          paginationData.contentSize >= PAGE_SIZE && (
            <LoadMoreButton onClick={nextPage} />
          )}
      </section>
    </main>
  )
}
