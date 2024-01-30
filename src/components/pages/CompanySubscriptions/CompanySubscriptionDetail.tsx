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
  useFetchAppsDataQuery,
  useFetchDocumentByIdMutation,
  useFetchSubscriptionAppQuery,
} from 'features/apps/apiSlice'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import CommonService from 'services/CommonService'
import { Box, Grid } from '@mui/material'

enum CardDetails {
  LANGUAGE = 'language',
  USECASE = 'useCase',
  PRICE = 'price',
}
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
    head: ['connectorData', 'technicalUserData'],
    body: [['connectorData'], ['technicalUserData']],
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
        appId: fetchAppsData.id,
        documentId,
      }).unwrap()
      const file = response.data
      setImage(URL.createObjectURL(file))
    } catch (error) {
      console.log(error)
    }
  }

  const getAppData = (field: string) => {
    if (field === CardDetails.LANGUAGE)
      return fetchAppsData?.languages.join(', ')
    else if (field === CardDetails.USECASE)
      return fetchAppsData?.useCases.join(', ')
    else if (field === CardDetails.PRICE) return fetchAppsData?.price
  }

  return (
    <main className="adminboard-main">
      <Button
        color="secondary"
        size="small"
        onClick={() => {
          navigate('/company-subscriptions')
        }}
      >
        {t('global.actions.back')}
      </Button>
      {data && fetchAppsData && (
        <>
          <div className="adminboard-header">
            <div className="lead-image">
              <img src={image} alt={fetchAppsData.title} />
            </div>
            <div className="content">
              <Typography variant="h5" sx={{ pb: '6px', color: '#888888' }}>
                {fetchAppsData.provider}
              </Typography>
              <Typography variant="h2" sx={{ mb: 1.5, mt: 1.5 }}>
                {fetchAppsData.title}
              </Typography>
              <Grid md={8}>
                {[
                  CardDetails.LANGUAGE,
                  CardDetails.USECASE,
                  CardDetails.PRICE,
                ].map((field) => (
                  <div
                    style={{ display: 'flex', marginBottom: '5px' }}
                    key={field}
                  >
                    <Typography variant="body2">
                      {t(`content.apprelease.validateAndPublish.${field}`)}
                      {getAppData(field)}
                    </Typography>
                  </div>
                ))}
              </Grid>
            </div>
          </div>
          <div className="divider-height" />
          <div className="product-description">
            <Typography variant="h3" style={{ whiteSpace: 'pre-line' }}>
              {'Short description'}
            </Typography>
            <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
              {fetchAppsData.longDescription}
            </Typography>
          </div>
          <div className="adminboard-provider">
            <Box sx={{ mb: 4 }}>
              <Typography variant="h3">{t('heading')}</Typography>
              <Typography variant="body2">{t('message')}</Typography>
            </Box>
            <StaticTable data={tableData} horizontal={true} />
          </div>
        </>
      )}
    </main>
  )
}
