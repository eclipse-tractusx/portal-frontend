/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
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

import { OVERLAYS } from 'types/Constants'
import { PageNotifications } from '@catena-x/portal-shared-components'
import { MainHeader } from 'components/shared/cfx/MainHeader'
import { show } from 'features/control/overlay'
import { resetNotification } from 'features/notification/actions'
import { notificationSelector } from 'features/notification/slice'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import './style.scss'
import { TechnicalUserTable } from './TechnicalUserTable'
import PageInfo from 'components/shared/cfx/PageInfo'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

export default function TechnicalUserManagement() {
  const { t } = useTranslation()
  const location = useLocation()

  const triggerEvent = location.state?.triggerEvent
  const notification = useSelector(notificationSelector)
  const dispatch = useDispatch()

  const handleCloseNotification = () => {
    dispatch(resetNotification())
  }

  useEffect(() => {
    if (triggerEvent) {
      dispatch(show(OVERLAYS.ADD_TECH_USER))
    }
  }, [triggerEvent])

  return (
    <main>
      <MainHeader
        title={t('content.usermanagement.technicalUser.descriptionHeader')}
        subTitle={t('content.usermanagement.technicalUser.descriptionText')}
        headerHeight={250}
        subTitleWidth={900}
      />
      <section>
        <PageInfo
          description={t(
            'content.usermanagement.technicalUser.shortDescriptionText'
          )}
          buttonLabel={t('content.usermanagement.technicalUser.create')}
          buttonAction={() => dispatch(show(OVERLAYS.ADD_TECH_USER))}
        />

        <div className="cx-content-technical__container">
          {notification.title && notification.description && (
            <div className="cx-content-technical__notifications">
              <PageNotifications
                open={notification.open}
                severity={notification.severity}
                title={t(notification.title)}
                description={t(notification.description)}
                onCloseNotification={handleCloseNotification}
                showIcon={false}
              />
            </div>
          )}
          <div className="cx-content-technical__table">
            <TechnicalUserTable />
          </div>
        </div>
      </section>
    </main>
  )
}
