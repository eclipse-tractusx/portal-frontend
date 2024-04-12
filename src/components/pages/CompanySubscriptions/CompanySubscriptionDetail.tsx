/********************************************************************************
 * Copyright (c) 2021, 2024 Contributors to the Eclipse Foundation
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
import { SubscriptionStatus } from 'features/apps/types'
import { fetchImageWithToken } from 'services/ImageService'
import { getApiBase } from 'services/EnvironmentService'
import './CompanySubscriptions.scss'

export default function CompanySubscriptionDetail() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const items = state
  const { t } = useTranslation()
  const appId = items.offerId ?? ''
  const subscriptionId = items.subscriptionId ?? ''
  const { data } = useFetchSubscriptionAppQuery({ appId, subscriptionId })
  const fetchAppsData = useFetchAppDetailsQuery(appId).data
  const [docId, setDocId] = useState('')

  const tableData = {
    head: [
      t('content.companySubscriptions.connector'),
      t('content.companySubscriptions.technicalUser'),
    ],
    body: [
      [data?.connectorData?.[0]?.name ?? ''],
      [data?.technicalUserData?.[0]?.name ?? ''],
    ],
  }

  useEffect(() => {
    if (fetchAppsData?.leadPictureId) {
      const id = CommonService.isValidPictureId(fetchAppsData?.leadPictureId)
      setDocId(id)
    }
  }, [fetchAppsData])

  const renderStatusButton = (status: string) => {
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
      {data && fetchAppsData && (
        <Box className="company-subscription-content ">
          <Box className="company-subscription-header">
            <div className="lead-image">
              <Image
                src={
                  fetchAppsData?.id
                    ? `${getApiBase()}/api/apps/${
                        fetchAppsData.id
                      }/appDocuments/${docId}`
                    : LogoGrayData
                }
                alt={fetchAppsData.title}
                loader={fetchImageWithToken}
              />
            </div>
            <div className="content">
              <Box sx={{ padding: '11px 12px' }}>
                {renderStatusButton(fetchAppsData.isSubscribed)}
                <Typography variant="h5" sx={{ color: '#888888' }}>
                  {fetchAppsData.provider}
                </Typography>
                <Typography variant="h4" sx={{}}>
                  {fetchAppsData.title}
                </Typography>
              </Box>
            </div>
          </Box>
          <Typography variant="h3" sx={{ whiteSpace: 'pre-line', mb: 4 }}>
            {'Long description'}
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
            {fetchAppsData.longDescription}
          </Typography>
          <Box sx={{ mt: '59px' }}>
            <Typography variant="h3" sx={{ mb: 4 }}>
              {'Technical Details'}
            </Typography>
            <StaticTable data={tableData} horizontal={true} />
          </Box>
        </Box>
      )}
    </main>
  )
}
