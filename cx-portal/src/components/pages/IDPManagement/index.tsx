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

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import PageHeaderWithCrumbs from 'components/shared/frame/PageHeaderWithCrumbs'
import { OVERLAYS, PAGES } from 'types/Constants'
import {
  Button,
  PageNotifications,
  Typography,
} from 'cx-portal-shared-components'
import { resetNotification } from 'features/notification/actions'
import { notificationSelector } from 'features/notification/slice'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { IDPList } from './IDPList'
import './style.scss'
import { IDPAuthType, useAddIDPMutation } from 'features/admin/idpApiSlice'
import { updateData, UPDATES } from 'features/control/updatesSlice'
import { show } from 'features/control/overlay/actions'

export default function IDPManagement() {
  const { t } = useTranslation()
  const notification = useSelector(notificationSelector)
  const dispatch = useDispatch()
  const [addIdp] = useAddIDPMutation()

  const handleCloseNotification = () => {
    dispatch(resetNotification())
  }

  const doCreateIDP = async (type: IDPAuthType) => {
    try {
      const idp = await addIdp(type).unwrap()
      dispatch(show(OVERLAYS.IDP, idp.identityProviderId))
      dispatch(updateData(UPDATES.IDP_LIST))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main>
      <PageHeaderWithCrumbs crumbs={[PAGES.IDP_MANAGEMENT]} />
      <section>
        <div className="idp-management-header">
          <img src="/idp-teaser.jpg" alt={'idp management'} />
          <div className="idp-management-title">
            <Typography>
              {
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
              }
            </Typography>
            <Button
              size="small"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => doCreateIDP(IDPAuthType.OIDC)}
            >
              {t('content.idpmanagement.create')}
            </Button>
          </div>
        </div>

        <div style={{ paddingTop: '70px' }}>
          {notification.title && notification.description && (
            <PageNotifications
              open={notification.open}
              severity={notification.severity}
              title={t(notification.title)}
              description={t(notification.description)}
              onCloseNotification={handleCloseNotification}
              showIcon={false}
            />
          )}
          <IDPList />
        </div>
      </section>
    </main>
  )
}
