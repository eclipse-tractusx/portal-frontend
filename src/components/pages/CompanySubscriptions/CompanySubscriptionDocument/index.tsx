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

import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import { Typography } from '@arena2036/portal-shared-components-construct-x'
import { DocumentTypeId } from 'features/appManagement/apiSlice'
import { useFetchDocumentByIdMutation } from 'features/apps/apiSlice'
import { type AppDetails, type Documents } from 'features/apps/types'
import { download } from 'utils/downloadUtils'
import 'components/styles/document.scss'
import { type ServiceDetailsResponse } from 'features/serviceSubscription/serviceSubscriptionApiSlice'

export default function CompanySubscriptionDocument({
  detail,
}: Readonly<{
  detail: AppDetails | ServiceDetailsResponse
}>) {
  const { t } = useTranslation()

  const [getDocumentById] = useFetchDocumentByIdMutation()

  const handleDownloadClick = async (
    documentId: string,
    documentName: string
  ) => {
    try {
      const response = await getDocumentById({
        appId: detail.id,
        documentId,
      }).unwrap()
      const fileType = response.headers.get('content-type')
      const file = response.data
      download(file, fileType, documentName)
    } catch (error) {
      console.error(error, 'ERROR WHILE FETCHING DOCUMENT')
    }
  }
  return (
    <Box className="company-subscription-content-section" id="documents">
      <Typography variant="h3">
        {t('content.companySubscriptionsDetail.howtouse.heading')}
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        {t('content.companySubscriptionsDetail.howtouse.message')}
      </Typography>
      {detail.documents.hasOwnProperty(
        DocumentTypeId.APP_TECHNICAL_INFORMATION
      ) ||
      detail.documents.hasOwnProperty(DocumentTypeId.APP_CONTRACT) ||
      detail.documents.hasOwnProperty(DocumentTypeId.ADDITIONAL_DETAILS) ? (
        Object.keys(detail.documents).map(
          (document) =>
            (document === DocumentTypeId.APP_TECHNICAL_INFORMATION ||
              document === DocumentTypeId.APP_CONTRACT ||
              document === DocumentTypeId.ADDITIONAL_DETAILS) && (
              <li key={document} className="document-list doc-list">
                <ArticleOutlinedIcon sx={{ color: '#9c9c9c' }} />
                <button
                  className="document-button-link"
                  onClick={() =>
                    handleDownloadClick(
                      detail.documents[document as keyof Documents][0]
                        .documentId,
                      detail.documents[document as keyof Documents][0]
                        .documentName
                    )
                  }
                >
                  {
                    detail.documents[document as keyof Documents][0]
                      .documentName
                  }
                </button>
              </li>
            )
        )
      ) : (
        <Typography variant="label3" className="not-available">
          {t('global.errors.noDocumentsAvailable')}
        </Typography>
      )}
    </Box>
  )
}
