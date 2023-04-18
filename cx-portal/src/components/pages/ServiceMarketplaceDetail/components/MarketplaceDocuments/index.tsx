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
import { Typography } from 'cx-portal-shared-components'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import { download } from 'utils/downloadUtils'
import 'components/styles/document.scss'
import {
  DocumentData,
  ServiceRequest,
} from 'features/serviceMarketplace/serviceApiSlice'
import { useFetchDocumentMutation } from 'features/serviceManagement/apiSlice'

export default function MarketplaceDocuments({
  item,
}: {
  item: ServiceRequest
}) {
  const { t } = useTranslation()

  const [getDocumentById] = useFetchDocumentMutation()

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
      return download(file, fileType, documentName)
    } catch (error) {
      console.error(error, 'ERROR WHILE FETCHING DOCUMENT')
    }
  }

  return (
    <div className="document-main">
      <div className="document-content">
        <Typography variant="h3">
          {t('content.serviceMarketplace.document.heading')}
        </Typography>
        <Typography variant="body2">
          {t('content.serviceMarketplace.document.message')}
        </Typography>
      </div>
      <ul>
        {item.documents && item.documents['ADDITIONAL_DETAILS'] ? (
          item.documents['ADDITIONAL_DETAILS'].map((document: DocumentData) => (
            <li className="document-list" key={document.documentId}>
              <ArticleOutlinedIcon className="document-icon" />
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
          ))
        ) : (
          <Typography variant="caption2" className="not-available wd-70">
            {t('global.errors.noDocumentsAvailable')}
          </Typography>
        )}
      </ul>
    </div>
  )
}
