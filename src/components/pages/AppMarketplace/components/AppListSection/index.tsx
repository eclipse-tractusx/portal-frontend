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

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  CardItems,
  SearchInput,
  Typography,
  ViewSelector,
} from '@catena-x/portal-shared-components'
import { useTheme, CircularProgress, Box } from '@mui/material'
import { AppListGroupView } from '../AppListGroupView'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PageService from 'services/PageService'
import { itemsSelector } from 'features/apps/favorites/slice'
import {
  addItem,
  fetchItems,
  removeItem,
} from 'features/apps/favorites/actions'
import { useFetchActiveAppsQuery } from 'features/apps/apiSlice'
import debounce from 'lodash.debounce'
import CommonService from 'services/CommonService'
import { AppDispatch } from 'features/store'

export const label = 'AppList'

export default function AppListSection() {
  const { t } = useTranslation()
  const theme = useTheme()
  const [group, setGroup] = useState<string>('')
  const [filterExpr, setFilterExpr] = useState<string>('')
  const [cardsData, setCardsData] = useState<CardItems[]>([])

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { data } = useFetchActiveAppsQuery()
  const [cards, setCards] = useState<any>([])
  const favoriteItems = useSelector(itemsSelector)
  const reference = PageService.registerReference(label, useRef(null))

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch])

  useEffect(() => {
    setCardsData(cards)
  }, [cards])

  useEffect(() => {
    setCards(data?.map(CommonService.appToCard))
  }, [data, setCards, CommonService.appToCard])

  const setView = (e: React.MouseEvent<HTMLInputElement>) => {
    setGroup(e.currentTarget.value)
  }

  const checkIsFavorite = (appId: string) => favoriteItems.includes(appId)

  const addOrRemoveFavorite = (event: React.MouseEvent, appId: string) => {
    event?.stopPropagation()
    dispatch(checkIsFavorite(appId) ? removeItem(appId) : addItem(appId))
  }

  const debouncedFilter = useMemo(
    () =>
      debounce(
        (expr: string) =>
          setCardsData(
            expr && cards?.length > 0
              ? cards.filter(
                  (card: { title: string; subtitle: string }) =>
                    card.title.toLowerCase().includes(expr.toLowerCase()) ||
                    (card.subtitle &&
                      card.subtitle.toLowerCase().includes(expr.toLowerCase()))
                )
              : cards
          ),
        300
      ),
    [cards]
  )

  const doFilter = useCallback(
    (expr: string) => {
      setFilterExpr(expr)
      debouncedFilter(expr)
    },
    [debouncedFilter]
  )

  const categoryViews = [
    {
      buttonText: t('content.appstore.appOverviewSection.categoryViews.all'),
      buttonValue: '',
      onButtonClick: setView,
    },
    {
      buttonText: t(
        'content.appstore.appOverviewSection.categoryViews.useCases'
      ),
      buttonValue: 'useCases',
      onButtonClick: setView,
    },
  ]

  const renderList = () => {
    if (filterExpr && cardsData && !cardsData.length) {
      return (
        <div style={{ textAlign: 'center' }}>
          <Typography variant="h5">
            {t('content.appstore.appOverviewSection.noMatch')}
          </Typography>
          <Typography variant="body1">
            {t('content.appstore.appOverviewSection.for') + ' ' + filterExpr}
          </Typography>
        </div>
      )
    } else if (cardsData && cardsData.length) {
      return (
        <AppListGroupView
          items={cardsData.map((card) => ({
            ...card,
            onButtonClick: () => navigate(`/appdetail/${card.id}`),
            onSecondaryButtonClick: (e: React.MouseEvent) =>
              addOrRemoveFavorite(e, card.id!),
            addButtonClicked: checkIsFavorite(card.id!),
          }))}
          groupKey={group}
        />
      )
    } else {
      return (
        <div style={{ textAlign: 'center' }}>
          <CircularProgress
            size={50}
            sx={{
              color: theme.palette.primary.main,
            }}
          />
        </div>
      )
    }
  }

  return (
    <Box ref={reference} className="overview-section">
      <section className="overview-section-content">
        <Typography
          sx={{ fontFamily: 'LibreFranklin-Light' }}
          variant="h3"
          className="section-title"
        >
          {t('content.appstore.appOverviewSection.title')}
        </Typography>

        <ViewSelector activeView={group} views={categoryViews} />

        <Box sx={{ textAlign: 'center' }}>
          <SearchInput
            sx={{ minWidth: '544px', marginBottom: '50px' }}
            margin={'normal'}
            placeholder={t('content.home.searchSection.inputPlaceholder')}
            value={filterExpr}
            onChange={(e) => doFilter(e.target.value)}
          />
        </Box>
        {renderList()}
      </section>
    </Box>
  )
}
