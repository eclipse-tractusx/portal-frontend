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
  StaticTable,
  Typography,
} from '@catena-x/portal-shared-components'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  SubscriptionStatus,
  useFetchAppsDataQuery,
  useFetchDocumentByIdMutation,
  useFetchSubscriptionAppQuery,
} from 'features/apps/apiSlice'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import CommonService from 'services/CommonService'
import { Box } from '@mui/material'
import { PAGES } from 'types/Constants'
import './Companysubscriptions.scss'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import UnpublishedIcon from '@mui/icons-material/Unpublished'

export default function CompanySubscriptionDetail() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const items = state
  const { t } = useTranslation()
  const appId = items.offerId ?? ''
  const subscriptionId = items.subscriptionId ?? ''
  const { data } = useFetchSubscriptionAppQuery({ appId, subscriptionId })
  const fetchAppsData = useFetchAppsDataQuery(appId).data
  const [image, setImage] = useState('')
  const [fetchDocumentById] = useFetchDocumentByIdMutation()

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
      void getImage(id)
    }
    // eslint-disable-next-line
  }, [fetchAppsData])

  const getImage = async (documentId: string) => {
    try {
      const response = await fetchDocumentById({
        appId: fetchAppsData?.id??'',
        documentId,
      }).unwrap()
      const file = response.data
      setImage(URL.createObjectURL(file))
    } catch (error) {
      console.log(error)
    }
  }

  const renderStatusButton = (status: string) => {
    return status === SubscriptionStatus.ACTIVE ? (
      <Button
        startIcon={<CheckCircleOutlineIcon />}
        sx={{
          backgroundColor: '#B3CB2D',
          pointerEvents: 'none',
          float: 'right',
        }}
        size="small"
      >
        {t('content.companySubscriptions.subscribed')}
      </Button>
    ) : status === SubscriptionStatus.PENDING ? (
      <Button
        sx={{
          backgroundColor: '#FFA600',
          pointerEvents: 'none',
          float: 'right',
          borderColor: '#FFA600',
        }}
        size="small"
      >
        {t('content.companySubscriptions.requested')}
      </Button>
    ) : (
      <Button
        startIcon={<UnpublishedIcon />}
        sx={{
          backgroundColor: '#D91E18',
          pointerEvents: 'none',
          float: 'right',
        }}
        size="small"
      >
        {t('content.companySubscriptions.declined')}
      </Button>
    )
  }

  return (
    <main className="company-subscription-detail">
      <Box className="company-subscription-back">
        <Button
          color="secondary"
          size="small"
          onClick={() => {
            navigate(`/${PAGES.COMPANY_SUBSCRIPTIONS}`)
          }}
        >
          {t('global.actions.back')}
        </Button>
      </Box>
      {data && fetchAppsData && (
        <Box className="company-subscription-content ">
          <Box className="company-subscription-header">
            <div className="lead-image">
              <img src={image} alt={fetchAppsData.title} />
            </div>
            <div className="content">
              <Box sx={{ padding: '11px 12px' }}>
                {renderStatusButton(fetchAppsData.isSubscribed)}
                {/* <Button sx={{ float: 'right' }} size='small'>{'Subscribed'}</Button> */}
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
