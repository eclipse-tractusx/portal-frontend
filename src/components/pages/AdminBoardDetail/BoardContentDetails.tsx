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

import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Button,
  ImageGallery,
  Typography,
} from '@arena2036/portal-shared-components-construct-x'
import BoardHeader from './BoardHeader'
import BoardDocuments from './BoardDocuments'
import BoardProvider from './BoardProvider'
import { type AppDetails, DocumentTypeText } from 'features/apps/types'
import CommonService from 'services/CommonService'
import BoardPrivacy from './BoardPrivacy'
import BoardRoles from './BoardRoles'
import BoardTechnicalUserSetup from './BoardTechnicalUserSetup'
import { PAGES } from 'types/Constants'
import './style.scss'

export default function BoardContentDetails({ item }: { item: AppDetails }) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    item && (
      <>
        <BoardHeader item={item} />
        <div className="divider-height" />
        <div className="product-description">
          {['longDescriptionTitleEN', 'longDescriptionTitleDE'].map((desc) => (
            <div key={desc}>
              <Typography variant="h3" style={{ whiteSpace: 'pre-line' }}>
                {t(`content.adminboardDetail.${desc}`)}
              </Typography>
              <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
                {' '}
                {
                  item?.description?.filter(
                    (lang: { languageCode: string }) =>
                      lang.languageCode ===
                      (desc === 'longDescriptionTitleEN' ? 'en' : 'de')
                  )[0]?.longDescription
                }
              </Typography>
              <div className="divider-height" />
            </div>
          ))}
        </div>
        <ImageGallery
          gallery={CommonService.imagesAndAppidToImageType(
            item.images,
            item.id
          )}
          modalWidth="900"
        />
        <div className="divider-height" />
        <BoardPrivacy item={item} />
        <div className="divider-height" />
        <BoardDocuments
          type={DocumentTypeText.CONFORMITY_DOCUMENT}
          appId={item.id}
          documents={item.documents}
        />
        <div className="divider-height" />
        <BoardDocuments
          type={DocumentTypeText.DOCUMENTS}
          appId={item.id}
          documents={item.documents}
        />
        <div className="divider-height" />
        <BoardRoles item={item} />
        <div className="divider-height" />
        <BoardTechnicalUserSetup item={item} />
        <div className="divider-height" />
        <BoardProvider item={item} />
        <Button
          color="secondary"
          size="small"
          onClick={() => {
            navigate(`/${PAGES.APP_ADMIN_BOARD}`)
          }}
        >
          {t('content.adminboardDetail.backToBoard')}
        </Button>
      </>
    )
  )
}
