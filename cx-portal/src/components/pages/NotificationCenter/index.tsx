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

import StageHeader from 'components/shared/frame/StageHeader'
import { useGetNotificationsQuery } from 'features/notification/apiSlice'
import { CXNotification } from 'features/notification/types'
import { useTranslation } from 'react-i18next'
import NotificationItem from './NotificationItem'
import { groupBy } from 'lodash'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'
import relativeTime from 'dayjs/plugin/relativeTime'
import './Notifications.scss'

dayjs.extend(isToday)
dayjs.extend(isYesterday)
dayjs.extend(relativeTime)

const NotificationGroupTitle = ({ label }: { label: string }) => {
  const { t } = useTranslation()
  const date = dayjs(label)
  if (date.isToday()) return <>{t('global.date.today')}</>
  if (date.isYesterday()) return <>{t('global.date.yesterday')}</>
  return <>{date.fromNow()}</>
}

const NotificationGroup = ({
  label,
  items,
}: {
  label: string
  items: CXNotification[]
}) => {
  return (
    <>
      <div className="divider">
        <NotificationGroupTitle label={label} />
      </div>
      <ul className="group">
        {items.map((item: CXNotification) => (
          <NotificationItem key={item.id} item={item} />
        ))}
      </ul>
    </>
  )
}

export default function NotificationCenter() {
  const { t } = useTranslation()
  const { data } = useGetNotificationsQuery(null)
  const groups = groupBy(
    data?.map((item) => ({
      ...item,
      contentParsed: item.content && JSON.parse(item.content),
    })),
    (item: CXNotification) => dayjs(item.created).format('YYYY-MM-DD')
  )
  return (
    <main className="notifications">
      <StageHeader title={t('pages.notifications')} />
      <section>
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
