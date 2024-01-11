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
 * distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { FramedSelector } from 'components/shared/frame/FramedSelector'
import { useGetNotificationMetaQuery } from 'features/notification/apiSlice'
import {
  notificationFetchSelector,
  setTopic,
} from 'features/notification/slice'
import { NOTIFICATION_TOPIC } from 'features/notification/types'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

export default function NotificationFilter() {
  const { t } = useTranslation('notification')
  const { data } = useGetNotificationMetaQuery(null)
  const fetchArgs = useSelector(notificationFetchSelector)
  const dispatch = useDispatch()

  const createFrame = (topic: NOTIFICATION_TOPIC, count: number) => ({
    buttonText: t(`sortOptions.${topic}.title`),
    buttonValue: topic,
    buttonDescription: t(`sortOptions.${topic}.description`),
    countTitle: t(`sortOptions.${topic}.countTitle`),
    onButtonClick: () => {
      dispatch(setTopic(topic))
    },
    count,
  })

  return (
    <div className="filterSection">
      <FramedSelector
        activeView={fetchArgs.args.notificationTopic}
        views={[
          createFrame(NOTIFICATION_TOPIC.ALL, data?.unread ?? 0),
          createFrame(NOTIFICATION_TOPIC.OFFER, data?.offerUnread ?? 0),
          createFrame(NOTIFICATION_TOPIC.INFO, data?.infoUnread ?? 0),
          createFrame(NOTIFICATION_TOPIC.ACTION, data?.actionRequired ?? 0),
        ]}
      />
    </div>
  )
}
