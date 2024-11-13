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
  PageHeader,
  Typography,
  CardHorizontal,
  StaticTable,
} from '@catena-x/portal-shared-components'
import './ServiceDetail.scss'
import 'components/styles/document.scss'
import {
  ServiceTypeIdsEnum,
  useFetchDocumentMutation,
  useFetchServiceStatusQuery,
} from 'features/serviceManagement/apiSlice'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Divider } from '@mui/material'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import { useParams } from 'react-router-dom'
import { download } from 'utils/downloadUtils'
import { type DocumentData } from 'features/apps/types'
import { DocumentTypeId } from 'features/appManagement/apiSlice'

export default function ServiceDetails() {
  const { t } = useTranslation('servicerelease')
  const { serviceId } = useParams()
  const fetchServiceStatus = useFetchServiceStatusQuery(serviceId ?? '', {
    refetchOnMountOrArgChange: true,
  }).data
  const [fetchDocument] = useFetchDocumentMutation()
  const [leadImg, setLeadImg] = useState<string>('')

  const getServiceTypes = useCallback(() => {
    const newArr: string[] = []
    fetchServiceStatus?.serviceTypeIds.forEach((serviceType: string) => {
      if (serviceType === ServiceTypeIdsEnum.CONSULTANCY_SERVICE)
        newArr.push(t('consultancyService'))
      if (serviceType === ServiceTypeIdsEnum.DATASPACE_SERVICE)
        newArr.push(t('dataspaceService'))
    })
    return newArr.join(', ')
  }, [fetchServiceStatus, t])

  const handleDownload = async (item: {
    documentId: string
    documentName: string
  }) => {
    try {
      const response = await fetchDocument({
        appId: serviceId,
        documentId: item.documentId,
      }).unwrap()
      const fileType = response.headers.get('content-type')
      const file = response.data
      download(file, fileType, item.documentName)
    } catch (error) {
      console.error(error, 'ERROR WHILE FETCHING DOCUMENT')
    }
  }

  const setLeadingImg = async () => {
    try {
      const response = await fetchDocument({
        appId: serviceId,
        documentId: fetchServiceStatus?.leadPictureId,
      }).unwrap()
      const file = response.data
      setLeadImg(URL.createObjectURL(file))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (fetchServiceStatus) {
      setLeadingImg()
    }
  }, [fetchServiceStatus])

  return (
    <main>
      <div>
        <PageHeader
          title={t('servicedetails.headerTitle')}
          topPage={true}
          headerHeight={200}
        />
      </div>
      {fetchServiceStatus && (
        <>
          <div className="serviceDetail-main">
            <div className="imageCard">
              <CardHorizontal
                borderRadius={6}
                image={{
                  alt: 'Service Card',
                  src: leadImg,
                }}
                label={''}
                buttonText=""
                onBtnClick={() => {
                  // do nothing
                }}
                title={fetchServiceStatus.title}
                subTitle={getServiceTypes()}
                description={''}
                backgroundColor="#fff"
              />
            </div>
          </div>
          <div className="textContainer">
            <>
              <Typography variant="h4" sx={{ mb: 4 }}>
                {t('step4.appDetails')}
              </Typography>
              {['longDescriptionEN', 'longDescriptionDE'].map((item) => (
                <div key={item}>
                  {item === 'longDescriptionEN' ? (
                    <Typography
                      sx={{
                        marginBottom: '40px',
                      }}
                      variant="body2"
                      style={{ whiteSpace: 'pre-line' }}
                      className="form-field"
                    >
                      <span style={{ fontWeight: 'bold' }}>
                        {t('step4.longDescriptionTitleEN')}
                      </span>
                      {
                        fetchServiceStatus?.descriptions?.filter(
                          (lang: { languageCode: string }) =>
                            lang.languageCode === 'en'
                        )[0]?.longDescription
                      }
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        marginBottom: '40px',
                      }}
                      variant="body2"
                      className="form-field"
                      style={{ whiteSpace: 'pre-line' }}
                    >
                      <span style={{ fontWeight: 'bold' }}>
                        {t('step4.longDescriptionTitleDE')}
                      </span>
                      {
                        fetchServiceStatus?.descriptions?.filter(
                          (lang: { languageCode: string }) =>
                            lang.languageCode === 'de'
                        )[0]?.longDescription
                      }
                    </Typography>
                  )}
                </div>
              ))}
              <Divider className="verify-validate-form-divider" />
            </>
            <div className="margin-h-40">
              <Typography variant="h4" sx={{ mb: 4 }}>
                {t('step4.conformityDocument')}
              </Typography>
              <Typography variant="body2" className="form-field">
                {t('defaultValues.conformityDocumentsDescription')}
              </Typography>
              <ul>
                {fetchServiceStatus?.documents?.[
                  DocumentTypeId.CONFORMITY_APPROVAL_SERVICES
                ] ? (
                  fetchServiceStatus?.documents[
                    DocumentTypeId.CONFORMITY_APPROVAL_SERVICES
                  ].map((item: DocumentData) => (
                    <li key={item.documentId} className="document-list">
                      <ArticleOutlinedIcon sx={{ color: '#9c9c9c' }} />
                      <button
                        className="document-button-link"
                        onClick={() => handleDownload(item)}
                      >
                        {item.documentName}
                      </button>
                    </li>
                  ))
                ) : (
                  <Typography variant="label3" className="not-available">
                    {t('adminboardDetail.noDocumentsAvailable')}
                  </Typography>
                )}
              </ul>
            </div>
            <Divider className="verify-validate-form-divider" />

            <div className="margin-h-40">
              <Typography variant="h4" sx={{ mb: 4 }}>
                {t('step4.documents')}
              </Typography>
              <Typography variant="body2" className="form-field">
                {t('defaultValues.documentsDescription')}
              </Typography>
              <ul>
                {fetchServiceStatus?.documents.hasOwnProperty(
                  DocumentTypeId.SERVICE_LEADIMAGE
                ) ||
                fetchServiceStatus?.documents.hasOwnProperty(
                  DocumentTypeId.ADDITIONAL_DETAILS
                ) ? (
                  Object.keys(fetchServiceStatus?.documents).map(
                    (document) =>
                      (document === DocumentTypeId.SERVICE_LEADIMAGE ||
                        document === DocumentTypeId.ADDITIONAL_DETAILS) && (
                        <li key={document} className="document-list">
                          <ArticleOutlinedIcon sx={{ color: '#9c9c9c' }} />
                          <button
                            onClick={() =>
                              handleDownload({
                                documentId:
                                  fetchServiceStatus?.documents[document][0]
                                    .documentId,
                                documentName:
                                  fetchServiceStatus?.documents[document][0]
                                    .documentName,
                              })
                            }
                            className="document-button-link"
                          >
                            {
                              fetchServiceStatus?.documents[document][0]
                                .documentName
                            }
                          </button>
                        </li>
                      )
                  )
                ) : (
                  <Typography variant="label3" className="not-available">
                    {t('adminboardDetail.noDocumentsAvailable')}
                  </Typography>
                )}
              </ul>
            </div>
            <Divider className="verify-validate-form-divider" />
            <div className="margin-h-40">
              <Typography variant="h4" sx={{ mb: 4 }}>
                {t('step4.providerInformation')}
              </Typography>
              <StaticTable
                data={{
                  head: ['Homepage', 'E-Mail'],
                  body: [
                    [fetchServiceStatus?.providerUri],
                    [fetchServiceStatus?.contactEmail],
                  ],
                }}
                horizontal={true}
              />
            </div>
          </div>
        </>
      )}
    </main>
  )
}
