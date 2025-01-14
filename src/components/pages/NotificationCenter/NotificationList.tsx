/********************************************************************************
 * Copyright (c) 2024 BMW Group AG
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

import {
  type NotificationFetchType,
  type CXNotificationContent,
} from 'features/notification/types'
import NotificationItem from './NotificationItem'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useGetNotificationsQuery } from 'features/notification/apiSlice'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { notificationFetchSelector, setMeta } from 'features/notification/slice'
import NotificationPager from './NotificationPager'

dayjs.extend(isToday)
dayjs.extend(isYesterday)
dayjs.extend(relativeTime)

const NotificationItems = ({ items }: { items: CXNotificationContent[] }) => {
  return (
    <ul className="group">
      {items.map((item: CXNotificationContent) => (
        <NotificationItem key={item.id} item={item} />
      ))}
    </ul>
  )
}

const NotificationGroup = ({
  fetchArgs,
  page,
}: {
  fetchArgs: NotificationFetchType
  page: number
}) => {
  const dispatch = useDispatch()
  const { data } = useGetNotificationsQuery({
    ...fetchArgs,
    page,
  })
  if (data) dispatch(setMeta(data.meta))
  return (
    <ul className="group">
      <NotificationItems items={data?.content ?? []} />
    </ul>
  )
}

export default function NotificationList() {
  const fetchArgs = useSelector(notificationFetchSelector)

  return (
    <>
      {fetchArgs &&
        new Array(fetchArgs.page + 1)
          .fill(0)
          .map((_, i) => (
            <NotificationGroup fetchArgs={fetchArgs} key={i} page={i} />
          ))}
      {fetchArgs && <NotificationPager />}
    </>
  )
}
