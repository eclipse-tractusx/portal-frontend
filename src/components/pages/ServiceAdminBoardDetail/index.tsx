/********************************************************************************
 * Copyright (c) 2023 Mercedes-Benz Group AG and BMW Group AG
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

import {
  Button,
  StaticTable,
  Typography,
  Image,
  LogoGrayData,
} from '@catena-x/portal-shared-components'
import { useNavigate, useParams } from 'react-router-dom'
import '../AdminBoardDetail/AdminBoardDetail.scss'
import {
  type ServiceDetailsType,
  useFetchBoardServiceDetailsQuery,
} from 'features/adminBoard/serviceAdminBoardApiSlice'
import { useCallback, useEffect, useState } from 'react'
import {
  ServiceTypeIdsEnum,
  useFetchDocumentMutation,
} from 'features/serviceManagement/apiSlice'
import { useTranslation } from 'react-i18next'
import { PAGES } from 'types/cfx/Constants'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Grid, Box, Divider } from '@mui/material'
import { download } from 'utils/downloadUtils'
import { DocumentTypeText } from 'features/apps/types'
import { DocumentTypeId } from 'features/appManagement/apiSlice'

enum TableData {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export default function ServiceAdminBoardDetail() {
  const [leadImg, setLeadImg] = useState<string>('')
  const { t } = useTranslation('servicerelease')
  const navigate = useNavigate()
  const { appId } = useParams()
  const { data, isFetching } = useFetchBoardServiceDetailsQuery(appId ?? '', {
    refetchOnMountOrArgChange: true,
  })
  const [fetchDocument] = useFetchDocumentMutation()
  const [serviceData, setServiceData] = useState<ServiceDetailsType>()

  useEffect(() => {
    if (!isFetching && data) {
      setServiceData(data)
    }
  }, [isFetching, data])

  useEffect(() => {
    if (serviceData?.documents?.SERVICE_LEADIMAGE?.[0].documentId) {
      setLeadingImg()
    } else setLeadImg(LogoGrayData)
  }, [serviceData])

  const setLeadingImg = async () => {
    try {
      const response = await fetchDocument({
        appId,
        documentId: serviceData?.documents?.SERVICE_LEADIMAGE?.[0].documentId,
      }).unwrap()
      const file = response.data
      setLeadImg(URL.createObjectURL(file))
    } catch (error) {
      console.error(error)
    }
  }

  const getTypes = useCallback(() => {
    const newArr: string[] = []
    serviceData?.serviceTypes.forEach((serviceType: string) => {
      if (serviceType === ServiceTypeIdsEnum.CONSULTANCY_SERVICE)
        newArr.push(t('consultancyService'))
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
        appId,
        documentId: item.documentId,
      }).unwrap()
      const fileType = response.headers.get('content-type')
      const file = response.data
      download(file, fileType, item.documentName)
    } catch (error) {
      console.error(error, 'ERROR WHILE FETCHING DOCUMENT')
    }
  }

  const getTechUserData = (data: string[] | null) => {
    return data && data?.length > 0 ? (
      data?.map((role: string) => (
        <Grid container spacing={2} key={role} sx={{ margin: '0px' }}>
          <Grid item sx={{ p: '10px 22px !important' }} xs={12}>
            <Typography variant="label3">* {role}</Typography>
          </Grid>
        </Grid>
      ))
    ) : (
      <Grid spacing={2} container margin={'0px'}>
        <Typography
          sx={{ textAlign: 'center', width: '100%' }}
          variant="label3"
        >
          {t(
            'adminboardDetail.technicalUserSetup.noTechnicalUserProfilesAvailable'
          )}
        </Typography>
      </Grid>
    )
  }

  return (
    <div className="service-admin-board-detail">
      <Box className="service-back">
        <Button
          color="secondary"
          size="small"
          onClick={() => {
            navigate(`/${PAGES.SERVICE_ADMIN_BOARD}`)
          }}
        >
          {t('adminboardDetail.action.back')}
        </Button>
      </Box>
      {serviceData && (
        <Box className="service-content">
          <div className="service-board-header">
            <div className="lead-image">
              <Image src={leadImg} alt={serviceData.title} />
            </div>
            <Box className="service-app-content">
              <Typography variant="h5" sx={{ pb: '6px', color: '#888888' }}>
                {serviceData.provider}
              </Typography>
              <Typography variant="h2" sx={{ pb: '8px', lineHeight: '48px' }}>
                {serviceData.title}
              </Typography>
              <Typography variant="body2" sx={{ pb: '2px' }}>
                {getTypes()}
              </Typography>
            </Box>
          </div>
          <div className="divider-height" />
          {['longDescriptionTitleEN', 'longDescriptionTitleDE'].map((desc) => (
            <div key={desc}>
              <Typography variant="h3" sx={{ lineHeight: '36px' }}>
                {t(`adminboardDetail.${desc}`)}
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                {
                  serviceData?.descriptions?.filter(
                    (lang: { languageCode: string }) =>
                      lang.languageCode ===
                      (desc === 'longDescriptionTitleEN' ? 'en' : 'de')
                  )[0]?.longDescription
                }
              </Typography>
              <div className="divider-height" />
            </div>
          ))}

          <Typography variant="h3">
            {t('adminboardDetail.ConformityDocument.heading')}
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            {t('adminboardDetail.ConformityDocument.message')}
          </Typography>
          {serviceData?.documents?.[
            DocumentTypeText.CONFORMITY_APPROVAL_SERVICES
          ] ? (
            serviceData?.documents[
              DocumentTypeText.CONFORMITY_APPROVAL_SERVICES
            ]?.map((document) => (
              <li key={document.documentId} className="service-documents">
                <ArrowForwardIcon fontSize="small" sx={{ mr: '12px' }} />
                <button
                  onClick={() =>
                    onDownload({
                      documentId: document.documentId,
                      documentName: document.documentName,
                    })
                  }
                  className="document-button-link"
                >
                  <Typography variant="label3">
                    {document.documentName}
                  </Typography>
                </button>
              </li>
            ))
          ) : (
            <Typography variant="label3" className="not-available">
              {t('adminboardDetail.noDocumentsAvailable')}
            </Typography>
          )}

          <div className="divider-height" />
          <Typography variant="h3">
            {t('adminboardDetail.documents.heading')}
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            {t('adminboardDetail.documents.message')}
          </Typography>
          {serviceData?.documents.hasOwnProperty(
            DocumentTypeId.SERVICE_LEADIMAGE
          ) ||
          serviceData?.documents.hasOwnProperty(
            DocumentTypeId.ADDITIONAL_DETAILS
          ) ? (
            serviceData?.documents &&
            Object.keys(serviceData.documents).length > 0 &&
            Object.keys(serviceData.documents).map(
              (item) =>
                (item === DocumentTypeId.SERVICE_LEADIMAGE ||
                  item === DocumentTypeId.ADDITIONAL_DETAILS) && (
                  <li key={item} className="service-documents">
                    <ArrowForwardIcon fontSize="small" sx={{ mr: '12px' }} />
                    <button
                      onClick={() => onDownload(serviceData.documents[item][0])}
                      className="document-button-link"
                    >
                      <Typography variant="label3">
                        {serviceData.documents[item][0]?.documentName}
                      </Typography>
                    </button>
                  </li>
                )
            )
          ) : (
            <Typography variant="label3" className="not-available">
              {t('adminboardDetail.noDocumentsAvailable')}
            </Typography>
          )}

          <div className="divider-height" />
          <Typography variant="h3">
            {t('adminboardDetail.technicalUserSetup.heading')}
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            {t('adminboardDetail.technicalUserSetup.message')}
          </Typography>

          {serviceData.technicalUserProfile &&
            getTechUserData(
              Object.values(serviceData?.technicalUserProfile)[0]
            )}

          <div className="divider-height" />
          <Typography variant="h3">
            {t('adminboardDetail.provider.heading')}
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            {t('adminboardDetail.provider.message')}
          </Typography>
          <StaticTable
            data={{
              head: [
                t('adminboardDetail.provider.homepage'),
                t('adminboardDetail.provider.email'),
              ],
              body: [
                [
                  serviceData.providerUri === TableData.ERROR
                    ? ''
                    : serviceData.providerUri,
                ],
                [serviceData?.contactEmail],
              ],
            }}
            horizontal={true}
          />
          <div className="divider-height" />
          <Divider sx={{ m: '32px 0px' }} />
          <Button
            color="secondary"
            size="small"
            onClick={() => {
              navigate('/serviceAdminBoard')
            }}
          >
            {t('adminboardDetail.backToBoard')}
          </Button>
        </Box>
      )}
    </div>
  )
}
