/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
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

import { useTranslation } from 'react-i18next'
import { Typography } from '@catena-x/portal-shared-components'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import 'components/styles/document.scss'
import {
  type AppDetails,
  type Documents,
  useFetchDocumentByIdMutation,
} from 'features/apps/apiSlice'
import { download } from 'utils/downloadUtils'
import '../../AppDetail.scss'
import { DocumentTypeId } from 'features/appManagement/apiSlice'

export default function AppDetailDocuments({ item }: { item: AppDetails }) {
  const { t } = useTranslation()

  const [getDocumentById] = useFetchDocumentByIdMutation()

  const handleDownloadClick = async (
    documentId: string,
    documentName: string
  ) => {
    try {
      const response = await getDocumentById({
        appId: item.id,
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
    <div id="documents">
      <div className="divider-height" />
      <Typography variant="h3">
        {t('content.appdetail.howtouse.heading')}
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        {t('content.appdetail.howtouse.message')}
      </Typography>
      {item.documents.hasOwnProperty(
        DocumentTypeId.APP_TECHNICAL_INFORMATION
      ) ||
      item.documents.hasOwnProperty(DocumentTypeId.APP_CONTRACT) ||
      item.documents.hasOwnProperty(DocumentTypeId.ADDITIONAL_DETAILS) ? (
        Object.keys(item.documents).map(
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
                      item.documents[document as keyof Documents][0].documentId,
                      item.documents[document as keyof Documents][0]
                        .documentName
                    )
                  }
                >
                  {item.documents[document as keyof Documents][0].documentName}
                </button>
              </li>
            )
        )
      ) : (
        <Typography variant="label3" className="not-available">
          {t('global.errors.noDocumentsAvailable')}
        </Typography>
      )}
    </div>
  )
}
