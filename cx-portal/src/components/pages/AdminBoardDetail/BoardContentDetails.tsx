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

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, Typography } from 'cx-portal-shared-components'
import BoardHeader from './components/BoardHeader'
import BoardImageGallery from './components/BoardImageGallery'
import BoardDocuments from './components/BoardDocuments'
import BoardProvider from './components/BoardProvider'
import { AppDetails, DocumentTypeText } from 'features/apps/apiSlice'
import CommonService from 'services/CommonService'
import BoardPrivacy from './components/BoardPrivacy'
import BoardRoles from './components/BoardRoles'
import './AdminBoardDetail.scss'

export default function BoardContentDetails({ item }: { item: AppDetails }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [images, setImages] = useState<any>()

  useEffect(() => {
    if (item) {
      const newPromies = CommonService.fetchLeadPictures(item.images, item.id)
      Promise.all(newPromies).then((result) => {
        setImages(result.flat())
      })
    }
  }, [item])

  return (
    item && (
      <>
        <BoardHeader item={item} />
        <div className="product-description">
          {['longDescriptionTitleEN', 'longDescriptionTitleDE'].map((desc) => (
            <div key={desc}>
              <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
                <span style={{ fontWeight: 'bold' }}>
                  {t(`content.adminboardDetail.${desc}`)}
                </span>
                {
                  item?.description?.filter(
                    (lang: { languageCode: string }) =>
                      lang.languageCode ===
                      (desc === 'longDescriptionTitleEN' ? 'en' : 'de')
                  )[0]?.longDescription
                }
              </Typography>
            </div>
          ))}
        </div>
        {images && <BoardImageGallery images={images} />}
        <BoardPrivacy item={item} />
        <BoardDocuments
          type={DocumentTypeText.CONFORMITY_DOCUMENT}
          appId={item.id}
          documents={item.documents}
        />
        <BoardDocuments
          type={DocumentTypeText.DOCUMENTS}
          appId={item.id}
          documents={item.documents}
        />
        <BoardRoles item={item} />
        <BoardProvider item={item} />
        <Button
          color="secondary"
          size="small"
          onClick={() => navigate('/adminboard')}
        >
          {t('content.adminboardDetail.backToBoard')}
        </Button>
      </>
    )
  )
}
