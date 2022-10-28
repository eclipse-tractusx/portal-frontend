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
import Box from '@mui/material/Box'
import uniqueId from 'lodash/uniqueId'
import PageService from 'services/PageService'
import { appToCard } from 'features/apps/mapper'
import {
  AppMarketplaceApp,
  useFetchBusinessAppsQuery,
} from 'features/apps/apiSlice'

export const label = 'BusinessApplictions'

export default function BusinessApplicationsSection() {
  const { t } = useTranslation()
  const businessApps = useFetchBusinessAppsQuery().data || []
  const cards = businessApps.map((app: AppMarketplaceApp) => appToCard(app))
  const reference = PageService.registerReference(label, useRef(null))
  const maximumCards = 4
  const emptyCards: number = maximumCards - cards.length

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
          {emptyCards > 0
            ? Array.from(Array(emptyCards), (_item, i) => (
                <Box
                  key={i}
                  sx={{
                    height: '240px',
                    border: '3px dashed #f3f3f3',
                    borderRadius: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '15px',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#f3f3f3',
                    }}
                    variant="body2"
                  >
                    {t('content.home.emptyCards.title')}
                  </Typography>
                </Box>
              ))
            : ''}
        </Carousel>
      </section>
    </div>
  )
}
