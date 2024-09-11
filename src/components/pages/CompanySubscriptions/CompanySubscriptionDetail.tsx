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
  Button,
  LogoGrayData,
  StaticTable,
  Typography,
  Image,
  BackButton,
} from '@catena-x/portal-shared-components'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  useFetchAppDetailsQuery,
  useFetchSubscriptionAppQuery,
} from 'features/apps/apiSlice'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import CommonService from 'services/CommonService'
import { Box } from '@mui/material'
import { PAGES } from 'types/Constants'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import UnpublishedIcon from '@mui/icons-material/Unpublished'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import {
  type SubscribeTechnicalUserData,
  SubscriptionStatus,
} from 'features/apps/types'
import { fetchImageWithToken } from 'services/ImageService'
import { getApiBase } from 'services/EnvironmentService'
import './CompanySubscriptions.scss'
import {
  useFetchServiceDetailsQuery,
  useFetchSubscriptionServiceQuery,
} from 'features/serviceSubscription/serviceSubscriptionApiSlice'

export default function CompanySubscriptionDetail() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const items = state
  const { t } = useTranslation()
  const id = items.row.offerId ?? ('' as string)
  const subscriptionId =
    items.row.companySubscriptionStatuses[0].subscriptionId ?? ('' as string)
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

  const tableData = {
    head: [
      t('content.companySubscriptions.connector'),
      t('content.companySubscriptions.technicalUser'),
    ],
    body: [
      [data?.connectorData?.[0]?.name ?? ''],
      [
        data?.technicalUserData
          ?.map((userdata: SubscribeTechnicalUserData) => userdata.name)
          .toString() ?? '',
      ],
    ],
  }

  useEffect(() => {
    if (fetchData?.leadPictureId) {
      const id = CommonService.isValidPictureId(fetchData?.leadPictureId)
      setDocId(id)
    }
  }, [fetchData])

  const renderStatusButton = (status: string | undefined) => {
    if (status === SubscriptionStatus.ACTIVE)
      return (
        <Button
          startIcon={<CheckCircleOutlineIcon />}
          size="small"
          sx={{
            backgroundColor: '#B3CB2D',
            pointerEvents: 'none',
            float: 'right',
            textTransform: 'none',
          }}
        >
          {t('content.companySubscriptions.subscribed')}
        </Button>
      )
    else if (status === SubscriptionStatus.PENDING)
      return (
        <Button
          size="small"
          sx={{
            backgroundColor: '#FFA600',
            pointerEvents: 'none',
            float: 'right',
            borderColor: '#FFA600',
            textTransform: 'none',
          }}
          startIcon={<HourglassEmptyIcon />}
        >
          {t('content.companySubscriptions.requested')}
        </Button>
      )
    else
      return (
        <Button
          startIcon={<UnpublishedIcon />}
          size="small"
          sx={{
            backgroundColor: '#D91E18',
            pointerEvents: 'none',
            float: 'right',
            textTransform: 'none',
          }}
        >
          {t('content.companySubscriptions.declined')}
        </Button>
      )
  }

  const getSrc = () => {
    if (fetchData?.id && items.app && docId)
      return `${getApiBase()}/api/apps/${fetchData.id}/appDocuments/${docId}`
    else if (fetchData?.id && items.service && docId)
      return `${getApiBase()}/api/services/${
        fetchData.id
      }/serviceDocuments/${docId}`
    return LogoGrayData
  }

  const serviceSubscriptionStatus =
    fetchData?.offerSubscriptionDetailData?.[0]?.offerSubscriptionStatus

  return (
    <main className="company-subscription-detail">
      <Box className="company-subscription-back app-back">
        <BackButton
          backButtonLabel={t('global.actions.back')}
          backButtonVariant="text"
          onBackButtonClick={() => {
            navigate(`/${PAGES.COMPANY_SUBSCRIPTIONS}`)
          }}
        />
      </Box>

      <Box className="company-subscription-content ">
        {error && <Typography variant="body2">{error?.data?.title}</Typography>}
        {data && fetchData && (
          <>
            <Box className="company-subscription-header">
              <div className="lead-image">
                <Image
                  src={getSrc()}
                  alt={fetchData.title}
                  loader={fetchImageWithToken}
                />
              </div>
              <div className="content">
                <Box sx={{ padding: '11px 12px' }}>
                  {renderStatusButton(
                    items.service
                      ? serviceSubscriptionStatus
                      : fetchData.isSubscribed
                  )}
                  <Typography variant="h5" sx={{ color: '#888888' }}>
                    {fetchData.provider}
                  </Typography>
                  <Typography variant="h4" sx={{}}>
                    {fetchData.title}
                  </Typography>
                </Box>
              </div>
            </Box>
            <Typography variant="h3" sx={{ whiteSpace: 'pre-line', mb: 4 }}>
              {'Long description'}
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
              {fetchData.longDescription ?? fetchData.description}
            </Typography>
            <Box sx={{ mt: '59px' }}>
              <Typography variant="h3" sx={{ mb: 4 }}>
                {'Technical Details'}
              </Typography>
              <StaticTable data={tableData} horizontal={true} />
            </Box>
          </>
        )}
      </Box>
    </main>
  )
}
