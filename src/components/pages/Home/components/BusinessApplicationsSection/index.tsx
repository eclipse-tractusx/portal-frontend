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

import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Carousel, Card } from '@catena-x/portal-shared-components'
import Box from '@mui/material/Box'
import uniqueId from 'lodash/uniqueId'
import PageService from 'services/PageService'
import {
  type AppMarketplaceApp,
  useFetchBusinessAppsQuery,
} from 'features/apps/apiSlice'
import { appToCard } from 'features/apps/mapper'
import { fetchImageWithToken } from 'services/ImageService'

export const label = 'BusinessApplictions'

const EmptyBox = ({ text }: { text: string }) => (
  <Box
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
      {text}
    </Typography>
  </Box>
)

export default function BusinessApplicationsSection() {
  const { t } = useTranslation()
  const { data } = useFetchBusinessAppsQuery()
  const reference = PageService.registerReference(label, useRef(null))

  return (
    <div ref={reference} className="orange-background">
      <section className="business-applications-section">
        <Typography
          sx={{
            fontFamily: 'LibreFranklin-Light',
            marginBottom: '48px !important',
          }}
          variant="h2"
          className="section-title"
        >
          {t('content.home.businessApplicationsSection.title')}
        </Typography>

        <Carousel gapToDots={5}>
          {data &&
            data
              .map((app: AppMarketplaceApp) => {
                const card = appToCard(app)
                return card
              })
              .map((item) => (
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
          {data &&
            new Array(4 - data.length)
              .fill(true)
              .map((_item, i) => (
                <EmptyBox key={i} text={t('content.home.emptyCards.title')} />
              ))}
        </Carousel>
      </section>
    </div>
  )
}
