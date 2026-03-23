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

import { useState } from 'react'
import {
  Typography,
  Navigation,
  ImageGallery,
  BackButton,
} from '@arena2036/portal-shared-components-construct-x'
import { useTranslation } from 'react-i18next'
import AppDetailHeader from './AppDetailHeader'
import AppDetailPrivacy from './AppDetailPrivacy'
import AppDetailDocuments from './AppDetailDocuments'
import AppDetailProvider from './AppDetailProvider'
import AppDetailTags from './AppDetailTags'
import type { AppDetails } from 'features/apps/types'
import './style.scss'
import CommonService from 'services/CommonService'
import AppDetailTechUserSetup from './AppDetailTechUserSetup'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { PAGES } from 'types/Constants'

export default function AppDetailContentDetails({
  item,
  showBack = true,
  nav,
}: {
  item: AppDetails
  showBack?: boolean
  nav?: string
}) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [selectedItem, setSelectedItem] = useState<string>('#description')

  const navigationItems = [
    {
      href: '#description',
      title: t('content.appdetail.description'),
    },
    {
      href: '#image-gallery',
      title: t('content.appdetail.imageGallery'),
    },
    {
      href: '#privacy-policy',
      title: t('content.appdetail.privacy.heading'),
    },
    {
      href: '#documents',
      title: t('content.appdetail.howtouse.heading'),
    },
    {
      href: '#technical-user-setup',
      title: t('content.appdetail.technicalUserSetup.heading'),
    },
    {
      href: '#provider-info',
      title: t('content.appdetail.providerInformation.heading'),
    },
    {
      href: '#tags',
      title: t('content.appdetail.tags'),
    },
  ]

  return (
    item && (
      <>
        <div className="app-marketplace-main">
          {showBack && (
            <Box className="app-back">
              <BackButton
                backButtonLabel={t('global.actions.back')}
                backButtonVariant="text"
                onBackButtonClick={() => {
                  nav === 'marketplace'
                    ? navigate(`/${PAGES.APP_MARKETPLACE}`)
                    : navigate(`/${PAGES.APP_OVERVIEW}`)
                }}
              />
            </Box>
          )}

          <AppDetailHeader item={item} />
          <div className="divider-height" />
        </div>
        <div className="navigation-main">
          <div className="navigation-list">
            <Navigation
              active={selectedItem}
              items={navigationItems}
              selectedItem={(item: string) => {
                setSelectedItem(item)
              }}
            />
          </div>
        </div>
        <div className="appdetail-main">
          <div id="description">
            <div className="divider-height" />
            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
              {item.longDescription}
            </Typography>
          </div>
          <div id="image-gallery">
            <div className="divider-height" />
            <ImageGallery
              gallery={CommonService.imagesAndAppidToImageType(
                item.images,
                item.id
              )}
              modalWidth="900"
            />
          </div>
          <AppDetailPrivacy item={item} />
          <AppDetailDocuments item={item} />
          <AppDetailTechUserSetup item={item} />
          <AppDetailProvider item={item} />
          <div className="divider-height" />
          <AppDetailTags item={item} />
          <div className="divider-height" />
        </div>
      </>
    )
  )
}
