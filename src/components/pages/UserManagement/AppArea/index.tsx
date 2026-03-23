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

import {
  Typography,
  Card,
  Carousel,
} from '@arena2036/portal-shared-components-construct-x'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'
import { type ActiveSubscriptionItem } from 'features/apps/types'
import { useFetchSubscriptionStatusQuery } from 'features/apps/apiSlice'
import { fetchImageWithToken } from 'services/ImageService'

export const AppArea = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const cards = useFetchSubscriptionStatusQuery().data

  return (
    <section id="access-management-id">
      <div className="app-user-details-header-title">
        <SubHeaderTitle
          title="content.usermanagement.apparea.headline"
          variant="h3"
        />
      </div>
      <Carousel
        infinite={false}
        gapToDots={5}
        position={cards && cards.length > 0 ? 'relative' : ''}
      >
        {cards && cards.length > 0
          ? cards?.map((item: ActiveSubscriptionItem) => {
              return (
                <Card
                  {...item}
                  title={item.name ?? ''}
                  subtitle={item.provider}
                  key={item.offerId}
                  buttonText="Details"
                  imageSize="small"
                  imageShape="round"
                  imageLoader={fetchImageWithToken}
                  variant="minimal"
                  expandOnHover={false}
                  filledBackground={true}
                  onClick={() => {
                    navigate(`/appUserManagement/${item.offerId}`)
                  }}
                />
              )
            })
          : Array.from(Array(2), (_item, i) => (
              <Box
                key={i}
                sx={{
                  height: '240px',
                  border: '3px dashed #7f7f7f',
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
                    color: '#7f7f7f',
                  }}
                  variant="body2"
                >
                  {t('content.usermanagement.apparea.appsNotAvailable')}
                </Typography>
              </Box>
            ))}
      </Carousel>
    </section>
  )
}
