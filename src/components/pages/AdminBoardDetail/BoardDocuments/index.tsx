/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
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

import { useTranslation } from 'react-i18next'
import { Typography } from '@arena2036/portal-shared-components-construct-x'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import 'components/styles/document.scss'
import {
  type Documents,
  type DocumentData,
  DocumentTypeText,
} from 'features/apps/types'
import { useFetchDocumentByIdMutation } from 'features/apps/apiSlice'
import { download } from 'utils/downloadUtils'
import { DocumentTypeId } from 'features/appManagement/apiSlice'

export default function BoardDocuments({
  type,
  appId,
  documents,
}: Readonly<{
  type: string
  appId: string
  documents: Documents
}>) {
  const { t } = useTranslation()

  const [getDocumentById] = useFetchDocumentByIdMutation()

  const handleDownloadClick = async (
    documentId: string,
    documentName: string
  ) => {
    try {
      const response = await getDocumentById({
        appId,
        documentId,
      }).unwrap()
      const fileType = response.headers.get('content-type')
      const file = response.data
      download(file, fileType, documentName)
    } catch (error) {
      console.error(error, 'ERROR WHILE FETCHING DOCUMENT')
    }
  }

  const renderConformityDocument = () => {
    return documents[DocumentTypeText.CONFORMITY_APPROVAL_BUSINESS_APPS]?.map(
      (document: DocumentData) => (
        <li key={document.documentId} className="document-list doc-list">
          <ArticleOutlinedIcon sx={{ color: '#9c9c9c' }} />
          <button
            onClick={() =>
              handleDownloadClick(document.documentId, document.documentName)
            }
            className="document-button-link"
          >
            {document.documentName}
          </button>
        </li>
      )
    )
  }

  const renderDocuments = () => {
    return documents.hasOwnProperty(DocumentTypeId.ADDITIONAL_DETAILS) ||
      documents.hasOwnProperty(
        DocumentTypeId.APP_TECHNICAL_INFORMATION ||
          documents.hasOwnProperty(DocumentTypeId.APP_CONTRACT)
      ) ? (
      Object.keys(documents).map(
        (document) =>
          (document === DocumentTypeId.APP_CONTRACT ||
            document === DocumentTypeId.ADDITIONAL_DETAILS ||
            document === DocumentTypeId.APP_TECHNICAL_INFORMATION) && (
            <li key={document} className="document-list doc-list">
              <ArticleOutlinedIcon sx={{ color: '#9c9c9c' }} />
              <button
                onClick={() =>
                  handleDownloadClick(
                    documents[document as keyof Documents][0].documentId,
                    documents[document as keyof Documents][0].documentName
                  )
                }
                className="document-button-link"
              >
                {documents[document as keyof Documents][0].documentName}
              </button>
            </li>
          )
      )
    ) : (
      <Typography variant="label3" className="not-available">
        {t('global.errors.noDocumentsAvailable')}
      </Typography>
    )
  }

  return (
    <>
      <Typography variant="h3">
        {t(`content.adminboardDetail.${type}.heading`)}
      </Typography>
      <Typography variant="body2" sx={{ mb: 4 }}>
        {t(`content.adminboardDetail.${type}.message`)}
      </Typography>
      {type === DocumentTypeText.CONFORMITY_DOCUMENT
        ? renderConformityDocument()
        : renderDocuments()}
    </>
  )
}
