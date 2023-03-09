/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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
import { Typography } from 'cx-portal-shared-components'
import './BoardDocuments.scss'
import {
  Documents,
  DocumentData,
  DocumentTypeText,
  useFetchDocumentByIdMutation,
} from 'features/apps/apiSlice'
import { download } from 'utils/downloadUtils'

export default function BoardDocuments({
  type,
  appId,
  documents,
}: {
  type: string
  appId: string
  documents: Documents
}) {
  const { t } = useTranslation()

  const [getDocumentById] = useFetchDocumentByIdMutation()

  const checkDocumentExist =
    type === DocumentTypeText.CONFORMITY_DOCUMENT
      ? documents[DocumentTypeText.CONFORMITY_APPROVAL_BUSINESS_APPS]?.length
      : Object.keys(documents)?.length

  const handleDownloadClick = async (
    documentId: string,
    documentName: string
  ) => {
    try {
      const response = await getDocumentById({
        appId: appId,
        documentId,
      }).unwrap()
      const fileType = response.headers.get('content-type')
      const file = response.data
      return download(file, fileType, documentName)
    } catch (error) {
      console.error(error, 'ERROR WHILE FETCHING DOCUMENT')
    }
  }

  const renderDocuments = () => {
    return type === DocumentTypeText.CONFORMITY_DOCUMENT
      ? documents[DocumentTypeText.CONFORMITY_APPROVAL_BUSINESS_APPS].map(
          (document: DocumentData) => (
            <li key={document.documentId}>
              <button
                className="document-button-link"
                onClick={() =>
                  handleDownloadClick(
                    document.documentId,
                    document.documentName
                  )
                }
              >
                {document.documentName}
              </button>
            </li>
          )
        )
      : Object.keys(documents).map(
          (document) =>
            document !== DocumentTypeText.CONFORMITY_APPROVAL_BUSINESS_APPS && (
              <li key={document}>
                <button
                  className="document-button-link"
                  onClick={() =>
                    handleDownloadClick(
                      documents[document as keyof Documents][0].documentId,
                      documents[document as keyof Documents][0].documentName
                    )
                  }
                >
                  {documents[document as keyof Documents][0].documentName}
                </button>
              </li>
            )
        )
  }

  return (
    <div className="adminboard-documents">
      <Typography variant="h4">
        {t(`content.adminboardDetail.${type}.heading`)}
      </Typography>
      <Typography variant="body2">
        {t(`content.adminboardDetail.${type}.message`)}
      </Typography>
      <ul>
        {checkDocumentExist ? (
          renderDocuments()
        ) : (
          <Typography variant="caption2" className="not-available">
            {t('global.errors.noDocumentsAvailable')}
          </Typography>
        )}
      </ul>
    </div>
  )
}
