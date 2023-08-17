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

import { useEffect, useState } from 'react'
import {
  Typography,
  Navigation,
  ImageGallery,
  Button,
} from '@catena-x/portal-shared-components'
import { useTranslation } from 'react-i18next'
import AppDetailHeader from './components/AppDetailHeader'
import AppDetailPrivacy from './components/AppDetailPrivacy'
import AppDetailDocuments from './components/AppDetailDocuments'
import AppDetailProvider from './components/AppDetailProvider'
import AppDetailTags from './components/AppDetailTags'
import { AppDetails } from 'features/apps/apiSlice'
import './AppDetail.scss'
import CommonService from 'services/CommonService'
import AppDetailTechUserSetup from './components/AppDetailTechUserSetup'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function AppDetailContentDetails({
  item,
  showBack = true,
}: {
  item: AppDetails
  showBack?: boolean
}) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [images, setImages] = useState<any>()
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
      href: '#provider-info',
      title: t('content.appdetail.providerInformation.heading'),
    },
  ]

  useEffect(() => {
    if (item) {
      const newPromies = CommonService.fetchLeadPictures(item.images, item.id)
      Promise.all(newPromies)
        .then((result) => {
          setImages(result.flat())
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [item])

  return (
    item && (
      <>
        <div className="app-marketplace-main">
          {showBack && (
            <Box className="app-back">
              <Button
                color="secondary"
                size="small"
                onClick={() => navigate(-1)}
              >
                {t('global.actions.back')}
              </Button>
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
              selectedItem={(item: string) => setSelectedItem(item)}
            />
          </div>
        </div>
        <div className="divider-height" />
        <div className="appdetail-main">
          <div id="description">
            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
              {item.longDescription}
            </Typography>
          </div>
          <div className="divider-height" />
          {images && (
            <div id="image-gallery">
              <ImageGallery gallery={images} modalWidth="900" />
            </div>
          )}
          <div className="divider-height" />
          <AppDetailPrivacy item={item} />
          <div className="divider-height" />
          <AppDetailDocuments item={item} />
          <div className="divider-height" />
          <AppDetailTechUserSetup item={item} />
          <div className="divider-height" />
          <AppDetailProvider item={item} />
          <div className="divider-height" />
          <AppDetailTags item={item} />
          <div className="divider-height" />
        </div>
      </>
    )
  )
}
