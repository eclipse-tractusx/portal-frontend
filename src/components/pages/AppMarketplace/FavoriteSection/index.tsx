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

import { CarouselBox } from '@catena-x/portal-shared-components'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import FavoriteItem from './FavoriteItem'
import EmptyFavorites from './EmptyFavorites'
import {
  useFetchActiveAppsQuery,
  useFetchFavoriteAppsQuery,
} from 'features/apps/apiSlice'
import { appToCard } from 'features/apps/mapper'

export default function FavoriteSection() {
  const { t } = useTranslation()
  const { data: active = [] } = useFetchActiveAppsQuery()
  const { data: favorites = [] } = useFetchFavoriteAppsQuery()

  const favoriteSectionPosition = favorites.length === 0 ? 30 : 35

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50px',
        right: `${favoriteSectionPosition}px !important`,
      }}
    >
      {favorites.length <= 0 ? (
        <EmptyFavorites />
      ) : (
        <CarouselBox
          title={t('content.appstore.favoriteSection.myFavorite')}
          itemWidth={270}
          itemHeight={250}
          backgroundColor={'rgba(255, 255, 255, 0.2)'}
          hasBorder={false}
        >
          {active
            .filter((item) => favorites.includes(item.id))
            .map((item) => appToCard(item))
            .map((item) => (
              <FavoriteItem
                key={item.id}
                item={item}
                expandOnHover={false}
                cardClick={true}
              />
            ))}
        </CarouselBox>
      )}
    </Box>
  )
}
