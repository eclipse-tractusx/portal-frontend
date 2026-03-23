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

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import PageHeaderWithCrumbs from 'components/shared/frame/PageHeaderWithCrumbs'
import { OVERLAYS, PAGES } from 'types/Constants'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'
import {
  Button,
  PageNotifications,
} from '@arena2036/portal-shared-components-construct-x'
import { show } from 'features/control/overlay'
import UserService from 'services/UserService'
import {
  notificationSelector,
  setNotification,
} from 'features/notification/slice'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import './style.scss'
import { TechnicalUserTable } from './TechnicalUserTable'
import { getAssetBase } from 'services/EnvironmentService'
import { initServicetNotifications } from 'types/MainTypes'

export default function TechnicalUserManagement() {
  const { t } = useTranslation()
  const notification = useSelector(notificationSelector)
  const dispatch = useDispatch()

  const handleCloseNotification = () => {
    dispatch(setNotification(initServicetNotifications))
  }

  return (
    <main>
      <PageHeaderWithCrumbs
        crumbs={[PAGES.USER_MANAGEMENT, PAGES.TECH_USER_MANAGEMENT]}
      />
      <section>
        <div className="content-technical-user">
          <div className="content-technical-user-description">
            <div className="content-technical-user-title">
              <SubHeaderTitle
                title={'content.usermanagement.technicalUser.descriptionHeader'}
                params={{ company: UserService.getCompany() as string }}
                variant="h3"
              />

              <SubHeaderTitle
                title={'content.usermanagement.technicalUser.descriptionText'}
                variant="body1"
              />
            </div>
            <Button
              size="small"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => dispatch(show(OVERLAYS.ADD_TECH_USER))}
            >
              {t('content.usermanagement.technicalUser.create')}
            </Button>
          </div>
          <div className="content-technical-user-image">
            <img
              src={`${getAssetBase()}/images/content/teaser.png`}
              alt={'alt tag info'}
            />
          </div>
        </div>

        <div style={{ paddingTop: '70px' }}>
          {notification?.title && notification?.description && (
            <PageNotifications
              open={notification.open}
              severity={notification.severity}
              title={t(notification.title)}
              description={t(notification.description)}
              onCloseNotification={handleCloseNotification}
              showIcon={false}
            />
          )}
          <TechnicalUserTable />
        </div>
      </section>
    </main>
  )
}
