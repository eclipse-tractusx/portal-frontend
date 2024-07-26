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

import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Carousel, Card } from '@catena-x/portal-shared-components'
import uniqueId from 'lodash/uniqueId'
import PageService from 'services/PageService'
import { type AppMarketplaceApp } from 'features/apps/types'
import { useFetchBusinessAppsQuery } from 'features/apps/apiSlice'
import { appToCard } from 'features/apps/mapper'
import { fetchImageWithToken } from 'services/ImageService'
import YourSubscribedApplicationsPlaceholder from './YourSubscribedApplicationsPlaceholder'

export const label = 'BusinessApplictions'

export default function BusinessApplicationsSection() {
  const { t } = useTranslation()
  const { data } = useFetchBusinessAppsQuery()
  const reference = PageService.registerReference(label, useRef(null))

  const placeholder: AppMarketplaceApp[] = [
    {
      id: '...',
      title: '...',
      provider: '',
      leadPictureUri: '',
      shortDescription: '...',
      useCases: [],
      price: '',
    },
  ]

  return (
    <div ref={reference} className="orange-background-home">
      <section className="business-applications-section">
        <Typography variant="h2" className="section-title">
          {t('content.home.businessApplicationsSection.title')}
        </Typography>

        {data && data.length > 0 ? (
          <Carousel gapToDots={5}>
            {(data ?? placeholder).map(appToCard).map((item) => (
              <Card
                {...item}
                key={uniqueId(item.title)}
                buttonText="Details"
                imageSize="small"
                imageShape="round"
                variant="minimal"
                expandOnHover={false}
                filledBackground={true}
                onClick={item.onClick}
                imageLoader={fetchImageWithToken}
              />
            ))}
          </Carousel>
        ) : (
          <YourSubscribedApplicationsPlaceholder />
        )}
      </section>
    </div>
  )
}
