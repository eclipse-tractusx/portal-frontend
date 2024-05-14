/********************************************************************************
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

import { useTranslation } from 'react-i18next'
import { Typography } from '@catena-x/portal-shared-components'
import { useTheme, CircularProgress } from '@mui/material'
import { AppListGroupView } from '../AppListGroupView'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addItem, removeItem } from 'features/apps/favorites/actions'
import {
  useFetchActiveAppsQuery,
  useFetchFavoriteAppsQuery,
} from 'features/apps/apiSlice'
import CommonService from 'services/CommonService'
import type { AppDispatch } from 'features/store'
import { appsControlSelector } from 'features/apps/control'
import { type AppMarketplaceApp } from 'features/apps/types'
import { useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'

export const label = 'AppList'

export default function AppListSection() {
  const { t } = useTranslation()
  const theme = useTheme()

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { data } = useFetchActiveAppsQuery()
  const { data: favoriteItems } = useFetchFavoriteAppsQuery()
  const control = useSelector(appsControlSelector)
  const [list, setList] = useState<AppMarketplaceApp[]>([])
  const [favList, setFavlist] = useState<string[]>([])

  const checkIsFavorite = (appId: string) => favList?.includes(appId)

  const addOrRemoveFavorite = (event: React.MouseEvent, appId: string) => {
    const favs = cloneDeep(favList)
    event?.stopPropagation()
    if (checkIsFavorite(appId)) {
      dispatch(removeItem(appId))
      const indexVal = favs?.indexOf(appId)
      favs.splice(indexVal, 1)
      arrangeDataList(list, favs)
    } else {
      dispatch(addItem(appId))
      favs?.push(appId)
      arrangeDataList(list, favs)
    }
  }

  const arrangeDataList = (d: AppMarketplaceApp[], favs: string[]) => {
    d?.forEach((i: AppMarketplaceApp) => {
      i.addButtonClicked = favs?.includes(i.id)
    })
    setList(d)
    setFavlist(favs)
  }

  useEffect(() => {
    if (data && favoriteItems) {
      const d = cloneDeep(data)
      arrangeDataList(d, favoriteItems)
    }
  }, [data, favoriteItems])

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

  const renderGroups = () =>
    list ? (
      <AppListGroupView
        items={list
          ?.filter(
            (app) =>
              app?.name?.toLowerCase().includes(control.search.toLowerCase()) ??
              app?.title?.toLowerCase().includes(control.search.toLowerCase())
          )
          .map(CommonService.appToCard)
          .map((card) => ({
            ...card,
            onButtonClick: () => {
              navigate(`/appdetail/${card.id}`)
            },
            onSecondaryButtonClick: (e: React.MouseEvent) => {
              addOrRemoveFavorite(e, card.id!)
            },
            addButtonClicked: card.addButtonClicked,
            description: card.description,
          }))}
        groupKey={control.group}
      />
    ) : (
      <></>
    )

  const renderList = () => {
    if (!data) return renderProgress()
    if (!data.length) return renderNoMatch()
    return renderGroups()
  }

  return <section>{renderList()}</section>
}
