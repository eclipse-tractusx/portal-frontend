/********************************************************************************
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

import { BackButton } from '@catena-x/portal-shared-components'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import {
  useFetchAppDetailsQuery,
  useFetchSubscriptionAppQuery,
} from 'features/apps/apiSlice'
import { PAGES } from 'types/Constants'
import CompanySubscriptionTechnical from './components/CompanySubscriptionTechnical'
import CompanySubscriptionContent from './components/CompanySubscriptionContent'
import CompanySubscriptionHeader from './components/CompanySubscriptionHeader'
import CompanySubscriptionDocument from './components/CompanySubscriptionDocument'
import CompanySubscriptionPrivacy from './components/CompanySubscriptionPrivacy'
import './CompanySubscriptions.scss'

export default function CompanySubscriptionDetail() {
  const navigate = useNavigate()
  const { state: items } = useLocation()
  const { t } = useTranslation()

  const appId = items ? items.offerId : ''
  const subscriptionId = items ? items.subscriptionId : ''

  // Prevent API call when appId does not exist
  const { data } = appId
    ? useFetchSubscriptionAppQuery({ appId, subscriptionId })
    : { data: undefined }
  const { data: fetchAppsData } = appId
    ? useFetchAppDetailsQuery(appId)
    : { data: undefined }

  return (
    <main className="company-subscription-detail">
      <Box className="company-subscription-content">
        <Box className="company-subscription-back app-back">
          <BackButton
            backButtonLabel={t('global.actions.back')}
            backButtonVariant="text"
            onBackButtonClick={() => {
              navigate(`/${PAGES.COMPANY_SUBSCRIPTIONS}`)
            }}
          />
        </Box>
        {data && fetchAppsData && (
          <>
            <CompanySubscriptionHeader detail={fetchAppsData} />
            <CompanySubscriptionContent detail={fetchAppsData} />
            <CompanySubscriptionDocument detail={fetchAppsData} />
            <CompanySubscriptionPrivacy detail={fetchAppsData} />
            <CompanySubscriptionTechnical detail={data} />
          </>
        )}
      </Box>
    </main>
  )
}
