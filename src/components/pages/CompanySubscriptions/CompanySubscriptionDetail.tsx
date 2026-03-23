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

import {
  BackButton,
  LogoGrayData,
} from '@arena2036/portal-shared-components-construct-x'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'
import {
  useFetchAppDetailsQuery,
  useFetchSubscriptionAppQuery,
} from 'features/apps/apiSlice'
import { PAGES } from 'types/Constants'
import './style.scss'
import {
  useFetchServiceDetailsQuery,
  useFetchSubscriptionServiceQuery,
} from 'features/serviceSubscription/serviceSubscriptionApiSlice'
import CommonService from 'services/CommonService'
import { useState, useEffect } from 'react'
import { getApiBase } from 'services/EnvironmentService'
import CompanySubscriptionTechnical from './CompanySubscriptionTechnical'
import CompanySubscriptionHeader from './CompanySubscriptionHeader'
import CompanySubscriptionContent from './CompanySubscriptionContent'
import CompanySubscriptionPrivacy from './CompanySubscriptionPrivacyContent'
import CompanySubscriptionDocument from './CompanySubscriptionDocument'

export default function CompanySubscriptionDetail() {
  const navigate = useNavigate()
  const { state: items } = useLocation()
  const { t } = useTranslation()
  const id = items.row.offerId ?? ('' as string)
  const subscriptionId = items.row.subscriptionId ?? ('' as string)
  const { data: appData, error: appError } = useFetchSubscriptionAppQuery(
    { appId: id, subscriptionId },
    { skip: items.service }
  )
  const { data: serviceData, error: serviceError } =
    useFetchSubscriptionServiceQuery(
      { serviceId: id, subscriptionId },
      { skip: items.app }
    )
  const { data: fetchAppsData } = useFetchAppDetailsQuery(id, {
    skip: items.service,
  })
  const { data: fetchServicessData } = useFetchServiceDetailsQuery(id, {
    skip: items.app,
  })
  const [docId, setDocId] = useState('')

  const data = items.app ? appData : serviceData
  const fetchData = items.app ? fetchAppsData : fetchServicessData

  // To-Do fix the type issue with status and data from FetchBaseQueryError
  // eslint-disable-next-line
  const error: any = items.app ? appError : serviceError

  useEffect(() => {
    if (fetchData?.leadPictureId) {
      const id = CommonService.isValidPictureId(fetchData?.leadPictureId)
      setDocId(id)
    }
  }, [fetchData])

  const getSrc = () => {
    if (fetchData?.id && items.app && docId)
      return `${getApiBase()}/api/apps/${fetchData.id}/appDocuments/${docId}`
    if (fetchData?.id && items.service && docId)
      return `${getApiBase()}/api/services/${
        fetchData.id
      }/serviceDocuments/${docId}`
    return LogoGrayData
  }

  return (
    <main className="company-subscription-detail">
      <Box className="company-subscription-content">
        <Box className="company-subscription-back app-back">
          <BackButton
            backButtonLabel={t('global.actions.back')}
            backButtonVariant="text"
            onBackButtonClick={() => {
              navigate(`/${PAGES.COMPANY_SUBSCRIPTIONS}`, {
                state: { activeTab: items.app ? 0 : 1 },
              })
            }}
          />
        </Box>
        {error && <Typography variant="body2">{error?.data?.title}</Typography>}

        {data && fetchData && (
          <>
            <CompanySubscriptionHeader detail={fetchData} src={getSrc()} />
            <CompanySubscriptionContent detail={fetchData} />
            <CompanySubscriptionDocument detail={fetchData} />
            <CompanySubscriptionPrivacy detail={fetchData} />
            <CompanySubscriptionTechnical detail={data} />
          </>
        )}
      </Box>
    </main>
  )
}
