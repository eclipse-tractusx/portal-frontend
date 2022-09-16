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

import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  SearchInput,
  Typography,
  ViewSelector,
} from 'cx-portal-shared-components'
import { AppListGroupView } from '../AppListGroupView'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import PageService from 'services/PageService'
import { itemsSelector } from 'features/apps/favorites/slice'
import {
  addItem,
  fetchItems,
  removeItem,
} from 'features/apps/favorites/actions'
import { useFetchActiveAppsQuery } from 'features/apps/apiSlice'
import { appToCard } from 'features/apps/mapper'

export const label = 'AppList'

export default function AppListSection() {
  const { t } = useTranslation()
  const [group, setGroup] = useState<string>('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data } = useFetchActiveAppsQuery()
  const cards = (data || []).map((app) => appToCard(app))
  const favoriteItems = useSelector(itemsSelector)
  const reference = PageService.registerReference(label, useRef(null))

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch])

  const setView = (e: React.MouseEvent<HTMLInputElement>) => {
    setGroup(e.currentTarget.value)
  }

  const checkIsFavorite = (appId: string) => favoriteItems.includes(appId)

  const addOrRemoveFavorite = (appId: string) => {
    dispatch(checkIsFavorite(appId) ? removeItem(appId) : addItem(appId))
  }

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
            sx={{ minWidth: '544px' }}
            margin={'normal'}
            placeholder={t('content.home.searchSection.inputPlaceholder')}
          />
        </Box>
        <AppListGroupView
          items={cards.map((card) => ({
            ...card,
            onButtonClick: () => navigate(`/appdetail/${card.id}`),
            onSecondaryButtonClick: () => addOrRemoveFavorite(card.id!),
            addButtonClicked: checkIsFavorite(card.id!),
          }))}
          groupKey={group}
        />
      </section>
    </Box>
  )
}
