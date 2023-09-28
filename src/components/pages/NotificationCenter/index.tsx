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

import { useEffect, useRef, useState } from 'react'
import {
  useGetNotificationsQuery,
  useGetNotificationMetaQuery,
} from 'features/notification/apiSlice'
import {
  CXNotificationContent,
  CXNotificationPagination,
  PAGE,
  PAGE_SIZE,
  SORT_OPTION,
  NOTIFICATION_TOPIC,
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
  SortOption,
  CircleProgress,
} from '@catena-x/portal-shared-components'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { initialNotificationState } from 'features/notification/slice'
import SortImage from 'components/shared/frame/SortImage'
import { SeactionHeader } from 'components/shared/frame/SectionHeader'
import { FramedSelector } from 'components/shared/frame/FramedSelector'

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
  const sectionElement: any = useRef()
  const { data: pages } = useGetNotificationMetaQuery(null)
  const [searchExpr, setSearchExpr] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [filterOption, setFilterOption] = useState<string>(
    NOTIFICATION_TOPIC.ALL
  )
  const [loaded, setLoaded] = useState<boolean>(false)
  const [sortOption, setSortOption] = useState<string>(SORT_OPTION)
  const [page, setPage] = useState<number>(PAGE)
  const initialNotification = useSelector(initialNotificationState)
  const [notificationState, setNotificationState] =
    useState(initialNotification)
  const { data, isFetching, refetch } =
    useGetNotificationsQuery(notificationState)

  useEffect(() => {
    setNotificationItems([])
    if (page === 0) {
      refetch()
    } else {
      setPage(initialNotification.page)
    }
    // eslint-disable-next-line
  }, [initialNotification, refetch])

  const [notificationItems, setNotificationItems] = useState<
    CXNotificationContent[]
  >([])
  const [paginationData, setPaginationData] =
    useState<CXNotificationPagination>()
  const setView = (val: string) => {
    setLoaded(true)
    setPage(0)
    setFilterOption(val)
  }

  useEffect(() => {
    if (data) {
      setPaginationData(data?.meta)
      setNotificationItems(
        data?.meta.page === 0 ? data.content : (i) => i.concat(data?.content)
      )
    }
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
      page,
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
      buttonText: t('sortOptions.all.title'),
      buttonValue: NOTIFICATION_TOPIC.ALL,
      buttonDescription: t('sortOptions.all.description'),
      onButtonClick: setView,
      count: getTotalCount(pages?.unread),
      countTitle: t('sortOptions.all.countTitle'),
    },
    {
      buttonText: t('sortOptions.app.title'),
      buttonValue: NOTIFICATION_TOPIC.OFFER,
      buttonDescription: t('sortOptions.app.description'),
      onButtonClick: setView,
      count: pages?.offerUnread ?? 0,
      countTitle: t('sortOptions.app.countTitle'),
    },
    {
      buttonText: t('sortOptions.info.title'),
      buttonValue: NOTIFICATION_TOPIC.INFO,
      buttonDescription: t('sortOptions.info.description'),
      onButtonClick: setView,
      count: pages?.infoUnread ?? 0,
      countTitle: t('sortOptions.info.countTitle'),
    },
    {
      buttonText: t('sortOptions.withaction.title'),
      buttonValue: NOTIFICATION_TOPIC.ACTION,
      buttonDescription: t('sortOptions.withaction.description'),
      onButtonClick: setView,
      count: pages?.actionRequired ?? 0,
      countTitle: t('sortOptions.withaction.countTitle'),
    },
  ]

  const groups = groupBy(
    notificationItems.map((item) => ({
      ...item,
      contentParsed: item.content && JSON.parse(item.content),
      userRead: item.isRead,
    })),
    (item: CXNotificationContent) => dayjs(item.created).format('YYYY-MM-DD')
  )

  const height =
    sectionElement && sectionElement.current
      ? `${sectionElement?.current?.clientHeight}px`
      : '400px'

  return (
    <main className="notifications">
      <SeactionHeader
        title={t('header.title')}
        subTitle={t('header.subtitle')}
        linkText={t('header.linkText')}
        link={t('header.link')}
      />
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
            <SortImage
              onClick={() => setShowModal(true)}
              selected={showModal}
            />
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
          <FramedSelector activeView={filterOption} views={filterButtons} />
        </div>
        {isFetching && (
          <Box
            ref={sectionElement}
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: height,
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
          <Box
            ref={sectionElement}
            sx={{
              minHeight: height,
            }}
          >
            <ul>
              {groups &&
                Object.entries(groups).map((entry: any) => (
                  <li key={entry[0]}>
                    <NotificationGroup label={entry[0]} items={entry[1]} />
                  </li>
                ))}
            </ul>
          </Box>
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
