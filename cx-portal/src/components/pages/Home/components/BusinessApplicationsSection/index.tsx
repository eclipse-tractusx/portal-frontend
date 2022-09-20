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

import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Carousel, Card } from 'cx-portal-shared-components'
import uniqueId from 'lodash/uniqueId'
import PageService from 'services/PageService'
import { appToCard } from 'features/apps/mapper'
import { AppMarketplaceApp } from 'features/apps/apiSlice'
import { useFetchSubscribedAppsQuery } from 'features/apps/apiSliceTest'

export const label = 'BusinessApplictions'

export default function BusinessApplicationsSection() {
  const { t } = useTranslation()
  const subscribed = useFetchSubscribedAppsQuery().data || []
  const cards = subscribed.map((app: AppMarketplaceApp) => appToCard(app))
  const reference = PageService.registerReference(label, useRef(null))

  return (
    <div ref={reference} className="orange-background">
      <section className="business-applications-section">
        <Typography
          sx={{
            fontFamily: 'LibreFranklin-Light',
            marginBottom: '48px !important',
          }}
          variant="h3"
          className="section-title"
        >
          {t('content.home.businessApplicationsSection.title')}
        </Typography>

        <Carousel gapToDots={5}>
          {cards.map((item) => (
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
            />
          ))}
        </Carousel>
      </section>
    </div>
  )
}
