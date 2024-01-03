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

import { type CXNotificationContent } from 'features/notification/types'
import NotificationItem from './NotificationItem'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useGetNotificationsQuery } from 'features/notification/apiSlice'
import './Notifications.scss'
import { useSelector } from 'react-redux'
import { notificationFetchSelector } from 'features/notification/slice'
import NoItems from '../NoItems'

dayjs.extend(isToday)
dayjs.extend(isYesterday)
dayjs.extend(relativeTime)

const NotificationGroup = ({ items }: { items: CXNotificationContent[] }) => {
  return (
    <>
      <ul className="group">
        {items.length > 0 ? (
          items.map((item: CXNotificationContent) => (
            <NotificationItem key={item.id} item={item} />
          ))
        ) : (
          <NoItems />
        )}
      </ul>
    </>
  )
}

export default function NotificationList() {
  const fetchArgs = useSelector(notificationFetchSelector)
  const { data } = useGetNotificationsQuery(fetchArgs)

  return <NotificationGroup items={data?.content ?? []} />
}
