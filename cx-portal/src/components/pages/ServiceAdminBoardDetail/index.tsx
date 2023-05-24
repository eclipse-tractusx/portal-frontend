/********************************************************************************
 * Copyright (c) 2021, 2023 Mercedes-Benz Group AG and BMW Group AG
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
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { Button, StaticTable, Typography } from 'cx-portal-shared-components'
import { useNavigate, useParams } from 'react-router-dom'
import './../AdminBoardDetail/AdminBoardDetail.scss'
import { getAssetBase } from 'services/EnvironmentService'
import {
  ServiceDetailsType,
  useFetchBoardServiceDetailsQuery,
} from 'features/adminBoard/serviceAdminBoardApiSlice'
import { useCallback, useEffect, useState } from 'react'
import {
  ServiceTypeIdsEnum,
  useFetchDocumentMutation,
} from 'features/serviceManagement/apiSlice'
import { useTranslation } from 'react-i18next'
import { PAGES } from 'types/Constants'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { InputLabel, Grid } from '@mui/material'
import { download } from 'utils/downloadUtils'

export default function ServiceAdminBoardDetail() {
  const { t } = useTranslation('servicerelease')
  const navigate = useNavigate()
  const { appId } = useParams()
  const { data, isFetching } = useFetchBoardServiceDetailsQuery(appId || '', {
    refetchOnMountOrArgChange: true,
  })
  const [fetchDocument] = useFetchDocumentMutation()
  const [serviceData, setServiceData] = useState<ServiceDetailsType>()

  useEffect(() => {
    if (!isFetching && data) {
      setServiceData(data)
    }
  }, [isFetching, data])

  const getTypes = useCallback(() => {
    const newArr: string[] = []
    serviceData?.serviceTypes.forEach((serviceType: string) => {
      if (serviceType === ServiceTypeIdsEnum.CONSULTANCE_SERVICE)
        newArr.push(t('consultanceService'))
      if (serviceType === ServiceTypeIdsEnum.DATASPACE_SERVICE)
        newArr.push(t('dataspaceService'))
    })
    return newArr.join(', ')
  }, [serviceData, t])

  const onDownload = async (item: {
    documentId: string
    documentName: string
  }) => {
    try {
      const response = await fetchDocument({
        appId: appId,
        documentId: item.documentId,
      }).unwrap()
      const fileType = response.headers.get('content-type')
      const file = response.data
      return download(file, fileType, item.documentName)
    } catch (error) {
      console.error(error, 'ERROR WHILE FETCHING DOCUMENT')
    }
  }

  const getTechUserData = (data: string[] | null) => {
    return data && data?.length > 0 ? (
      data?.map((role: string) => (
        <Typography variant="subtitle2">* {role}</Typography>
      ))
    ) : (
      <Typography variant="caption2" className="not-available">
        {t(
          'adminboardDetail.technicalUserSetup.noTechnicalUserProfilesAvailable'
        )}
      </Typography>
    )
  }

  return (
    <main className="adminboard-main">
      <Button
        color="secondary"
        size="small"
        onClick={() => navigate(`/${PAGES.SERVICEADMINBOARD}`)}
      >
        {t('adminboardDetail.action.back')}
      </Button>
      {serviceData && (
        <>
          <div className="adminboard-header">
            <div className="lead-image">
              <img
                src={`${getAssetBase()}/images/content/ServiceMarketplace.png`}
                alt={serviceData.title}
              />
            </div>
            <div className="content">
              <Typography variant="body2" className="provider">
                {serviceData.provider}
              </Typography>
              <Typography variant="h3" className="heading">
                {serviceData.title}
              </Typography>
              <div className="usecase">{getTypes()}</div>
            </div>
          </div>
          <div className="product-description">
            {['longDescriptionTitleEN', 'longDescriptionTitleDE'].map(
              (desc) => (
                <div key={desc}>
                  <Typography variant="h4">
                    {t(`adminboardDetail.${desc}`)}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      whiteSpace: 'pre-line',
                      margin: '20px 0px 30px 0px',
                    }}
                  >
                    {
                      serviceData?.descriptions?.filter(
                        (lang: { languageCode: string }) =>
                          lang.languageCode ===
                          (desc === 'longDescriptionTitleEN' ? 'en' : 'de')
                      )[0]?.longDescription
                    }
                  </Typography>
                </div>
              )
            )}
          </div>
          <div className="adminboard-documents">
            <Typography variant="h4">
              {t(`adminboardDetail.documents.heading`)}
            </Typography>
            <Typography
              variant="body2"
              style={{
                marginTop: '20px',
              }}
            >
              {t(`adminboardDetail.documents.message`)}
            </Typography>
            {serviceData?.documents &&
              Object.keys(serviceData.documents).map((item, i) => (
                <InputLabel sx={{ mb: 0, mt: 3 }} key={item}>
                  <span
                    style={{
                      display: 'flex',
                      cursor: 'pointer',
                      color: '#0f71cb',
                    }}
                    onClick={() => onDownload(serviceData.documents[item][i])}
                  >
                    <ArrowForwardIcon fontSize="small" />
                    {serviceData.documents[item][i].documentName}
                  </span>
                </InputLabel>
              ))}
          </div>

          <div style={{ marginBottom: '60px' }}>
            <Typography variant="h4">
              {t('adminboardDetail.technicalUserSetup.heading')}
            </Typography>
            <Typography
              variant="body2"
              style={{
                marginTop: '20px',
              }}
            >
              {t('adminboardDetail.technicalUserSetup.message')}
            </Typography>
            <Grid container spacing={2} sx={{ margin: '30px 0' }}>
              <Grid item xs={12} style={{ padding: '0px' }}>
                {serviceData.technicalUserProfile &&
                  getTechUserData(
                    Object.values(serviceData?.technicalUserProfile)[0]
                  )}
              </Grid>
            </Grid>
          </div>

          <div className="adminboard-provider">
            <div className="provider-content">
              <Typography variant="h4">
                {t('adminboardDetail.provider.heading')}
              </Typography>
              <Typography
                variant="body2"
                style={{
                  marginTop: '20px',
                }}
              >
                {t('adminboardDetail.provider.message')}
              </Typography>
            </div>

            <StaticTable
              data={{
                head: ['Homepage', 'E-Mail'],
                body: [
                  [
                    serviceData.providerUri === 'ERROR'
                      ? ''
                      : serviceData.providerUri,
                  ],
                  [serviceData?.contactEmail],
                ],
              }}
              horizontal={true}
            />
          </div>
        </>
      )}
    </main>
  )
}
