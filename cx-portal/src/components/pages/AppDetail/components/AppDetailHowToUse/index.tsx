/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
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
import './AppDetailHowToUse.scss'
import {
  AppDetails,
  DocumentData,
  useFetchDocumentByIdMutation,
} from 'features/apps/apiSlice'
import { download } from 'utils/downloadUtils'

export default function AppDetailHowToUse({ item }: { item: AppDetails }) {
  const { t } = useTranslation()

  const [getDocumentById] = useFetchDocumentByIdMutation()

  const handleDownloadClick = async (
    documentId: string,
    documentName: string
  ) => {
    try {
      const response = await getDocumentById(documentId).unwrap()
      const fileType = response.headers.get('content-type')
      const file = response.data
      return download(file, fileType, documentName)
    } catch (error) {
      console.error(error, 'ERROR WHILE FETCHING DOCUMENT')
    }
  }

  return (
    <div className="appdetail-howtouse">
      <div className="howtouse-content">
        <Typography variant="h4">
          {t('content.appdetail.howtouse.heading')}
        </Typography>
        <Typography variant="body2">
          {t('content.appdetail.howtouse.message')}
        </Typography>
      </div>
      <ul>
        {item.documents &&
          item.documents['APP_CONTRACT'] &&
          item.documents['APP_CONTRACT'].map(
            (document: DocumentData, index: number) => (
              <li key={index}>
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
          )}
      </ul>
    </div>
  )
}
