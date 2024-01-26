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

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type CardItems, Typography } from '@catena-x/portal-shared-components'
import { useTheme, CircularProgress } from '@mui/material'
import { AppListGroupView } from '../AppListGroupView'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addItem, removeItem } from 'features/apps/favorites/actions'
import {
  useFetchActiveAppsQuery,
  useFetchFavoriteAppsQuery,
} from 'features/apps/apiSlice'
import CommonService from 'services/CommonService'
import type { AppDispatch } from 'features/store'

export const label = 'AppList'

export default function AppListSection() {
  const { t } = useTranslation()
  const theme = useTheme()
  const [cardsData, setCardsData] = useState<CardItems[]>([])

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { data } = useFetchActiveAppsQuery()
  const favoriteItems = useFetchFavoriteAppsQuery().data
  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  const [cards, setCards] = useState<any>([])

  useEffect(() => {
    setCardsData(cards)
  }, [cards])

  useEffect(() => {
    setCards(data?.map(CommonService.appToCard))
  }, [data, setCards, CommonService.appToCard])

  const checkIsFavorite = (appId: string) => favoriteItems?.includes(appId)

  const addOrRemoveFavorite = (event: React.MouseEvent, appId: string) => {
    event?.stopPropagation()
    dispatch(checkIsFavorite(appId) ? removeItem(appId) : addItem(appId))
  }

  /*
  const debouncedFilter = useMemo(
    () =>
      debounce((expr: string) => {
        setCardsData(
          expr && cards?.length > 0
            ? cards.filter(
                (card: { title: string; subtitle: string }) =>
                  card.title.toLowerCase().includes(expr.toLowerCase()) ||
                  card?.subtitle?.toLowerCase().includes(expr.toLowerCase())
              )
            : cards
        )
      }, 300),
    [cards]
  )
*/

  const renderProgress = () => (
    <div style={{ textAlign: 'center' }}>
      <CircularProgress
        size={50}
        sx={{
          color: theme.palette.primary.main,
        }}
      />
    </div>
  )

  const renderNoMatch = () => (
    <div style={{ textAlign: 'center' }}>
      <Typography variant="h5">
        {t('content.appstore.appOverviewSection.noMatch')}
      </Typography>
      <Typography variant="body1">
        {t('content.appstore.appOverviewSection.for')}
      </Typography>
    </div>
  )

  const renderGroups = () => (
    <AppListGroupView
      items={cardsData.map((card) => ({
        ...card,
        onButtonClick: () => {
          navigate(`/appdetail/${card.id}`)
        },
        onSecondaryButtonClick: (e: React.MouseEvent) => {
          addOrRemoveFavorite(e, card.id!)
        },
        addButtonClicked: checkIsFavorite(card.id!),
      }))}
      groupKey={''}
    />
  )

  const renderList = () => {
    if (!cardsData) return renderProgress()
    if (!cardsData.length) return renderNoMatch()
    return renderGroups()
  }

  return <section>{renderList()}</section>
}
