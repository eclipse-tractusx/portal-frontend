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

import { useCallback, useMemo, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { PageBreadcrumb } from 'components/shared/frame/PageBreadcrumb/PageBreadcrumb'
import {
  PageHeader,
  Typography,
  ViewSelector,
  SearchInput,
  type CardItems,
  Cards,
  PageSnackbar,
  ErrorBar,
} from '@catena-x/portal-shared-components'
import { useTheme, CircularProgress, Box } from '@mui/material'
import {
  appCardStatus,
  appCardRecentlyApps,
  appToCard,
} from 'features/apps/mapper'
import {
  useFetchProvidedAppsQuery,
  type AppInfo,
  type AppMarketplaceApp,
} from 'features/apps/apiSlice'
import { useDispatch } from 'react-redux'
import debounce from 'lodash.debounce'
import { OVERLAYS } from 'types/Constants'
import { show } from 'features/control/overlay'
import { useLocation } from 'react-router-dom'
import './AppOverview.scss'
import { AppOverviewList } from './AppOverviewList'
import { SuccessErrorType } from 'features/admin/appuserApiSlice'
import { initialState } from 'features/appManagement/types'
import { fetchImageWithToken } from 'services/ImageService'
import { setCurrentActiveStep } from 'features/appManagement/slice'
import { setAppId, setAppStatus } from 'features/appManagement/actions'
import NoItems from '../NoItems'

export default function AppOverview() {
  const { t } = useTranslation()
  const theme = useTheme()
  const dispatch = useDispatch()

  const { data, refetch, isSuccess, isFetching } = useFetchProvidedAppsQuery()
  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  const [itemCards, setItemCards] = useState<any>([])
  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  const [recentlyChangedApps, setRecentlyChangedApps] = useState<any>([])
  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  const [cards, setCards] = useState<any>([])
  const { state } = useLocation()
  const [group, setGroup] = useState<string>('')
  const [filterItem, setFilterItem] = useState<CardItems[]>()
  const [searchExpr, setSearchExpr] = useState<string>('')

  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  const valueMap: any = {
    wip: ['in_review', 'created'],
    inactive: 'inactive',
    active: 'active',
  }

  useEffect(() => {
    state === 'deactivate-success' && refetch()
    state === 'change-image-success' && refetch()
    state === 'change-description-success' && refetch()
    state === 'add-roles-success' && refetch()
  }, [state, refetch])

  useEffect(() => {
    if (cards) {
      const recentCards = appCardRecentlyApps(cards)
      setRecentlyChangedApps(recentCards)
      const itemCards = appCardStatus(cards)
      setItemCards(itemCards)
    }
    // eslint-disable-next-line
  }, [cards])

  useEffect(() => {
    if (itemCards) {
      setFilterItem(itemCards)
      dispatch(setCurrentActiveStep())
      dispatch(setAppId(''))
      dispatch(setAppStatus(initialState.appStatusData))
    }
    // eslint-disable-next-line
  }, [itemCards])

  useEffect(() => {
    if (data) {
      const filterItems = data.content?.map((item: AppMarketplaceApp) =>
        appToCard(item)
      )
      setCards(filterItems)
    }
  }, [data])

  const debouncedSearch = useMemo(
    () =>
      debounce((expr: string, data: CardItems[] | undefined, group: string) => {
        if (group) {
          // Add an ESLint exception until there is a solution
          // eslint-disable-next-line
          data = data?.filter((item: any) => {
            if (group === 'wip') {
              return valueMap[group].includes(item.status)
            } else {
              return item.status === valueMap[group]
            }
          })
        }
        if (expr.length > 2) {
          const filterItems = data?.filter(
            (item) =>
              item.title
                .toLocaleLowerCase()
                .includes(expr.toLocaleLowerCase()) ??
              item.subtitle
                ?.toLocaleLowerCase()
                .includes(expr.toLocaleLowerCase()) ??
              item.statusText
                ?.toLocaleLowerCase()
                .includes(expr.toLocaleLowerCase())
          )
          setFilterItem(filterItems)
        } else if (group) {
          setFilterItem(data)
        } else if (expr.length === 0) {
          setFilterItem(itemCards)
        }
        dispatch(setCurrentActiveStep())
      }, 400),
    // eslint-disable-next-line
    [dispatch, filterItem, group]
  )

  const setView = (e: React.MouseEvent<HTMLInputElement>) => {
    const viewValue = e.currentTarget.value
    setGroup(viewValue)
    debouncedSearch(searchExpr, itemCards, viewValue)
  }

  const categoryViews = [
    {
      buttonText: t('content.appoverview.filter.all'),
      buttonValue: '',
      onButtonClick: setView,
    },
    {
      buttonText: t('content.appoverview.filter.active'),
      buttonValue: 'active',
      onButtonClick: setView,
    },
    {
      buttonText: t('content.appoverview.filter.inactive'),
      buttonValue: 'inactive',
      onButtonClick: setView,
    },
    {
      buttonText: t('content.appoverview.filter.wip'),
      buttonValue: 'wip',
      onButtonClick: setView,
    },
  ]

  const doSearch = useCallback(
    (expr: string) => {
      const validateExpr = /^[ A-Za-z]*$/.test(expr)
      if (!validateExpr) {
        return
      }
      setSearchExpr(expr)
      debouncedSearch(expr, itemCards, group)
    },
    [debouncedSearch, itemCards, group]
  )

  const showOverlay = (item: AppInfo) => {
    if (item.status === 'created') {
      dispatch(show(OVERLAYS.APP_OVERVIEW_CONFIRM, item.id, item.name))
    } else if (item.status === 'in_review') {
      dispatch(show(OVERLAYS.APP_DETAILS_OVERLAY, item.id, item.name))
    }
  }

  return (
    <div className="appoverview-app">
      <PageHeader
        title={t('content.appoverview.headerTitle')}
        topPage={true}
        headerHeight={200}
      >
        <PageBreadcrumb backButtonVariant="contained" />
      </PageHeader>
      {recentlyChangedApps && recentlyChangedApps.length > 0 ? (
        <div className="desc-recently">
          <div className="container">
            <Typography variant="h4" className="desc-heading">
              {t('content.appoverview.recently.header')}
            </Typography>
            <Typography variant="body2" className="desc-message">
              {t('content.appoverview.recently.subheader')}
            </Typography>
            <div className="desc-card">
              <Cards
                items={recentlyChangedApps}
                columns={4}
                buttonText="Details"
                variant="minimal"
                filledBackground={true}
                imageSize={'small'}
                imageLoader={fetchImageWithToken}
                onCardClick={(item: unknown) => {
                  showOverlay(item as AppInfo)
                }}
              />
            </div>
          </div>
        </div>
      ) : null}
      <div className="app-main">
        <Box sx={{ marginTop: '20px' }} className="overview-section">
          <section className="overview-section-content">
            <Typography
              sx={{ fontFamily: 'LibreFranklin-Light' }}
              variant="h3"
              className="section-title"
            >
              {t('content.appoverview.title')}
            </Typography>

            <Box sx={{ textAlign: 'center' }}>
              <SearchInput
                sx={{ minWidth: '544px' }}
                margin={'normal'}
                value={searchExpr}
                onChange={(e) => {
                  doSearch(e.target.value)
                }}
                placeholder={t('content.appoverview.inputPlaceholder')}
              />
            </Box>
            <div className="view-selector">
              <ViewSelector activeView={group} views={categoryViews} />
            </div>
          </section>
        </Box>

        <div className="app-detail">
          {isFetching ? (
            <div style={{ textAlign: 'center' }}>
              <CircularProgress
                size={50}
                sx={{
                  color: theme.palette.primary.main,
                }}
              />
            </div>
          ) : (
            <>
              {!isSuccess && (
                <ErrorBar
                  errorText={t('error.errorBar')}
                  handleButton={refetch}
                  buttonText={t('error.tryAgain')}
                  showButton={true}
                />
              )}
              {filterItem && filterItem.length > 0 && isSuccess ? (
                <AppOverviewList
                  filterItem={filterItem}
                  showOverlay={showOverlay}
                />
              ) : (
                <NoItems />
              )}
            </>
          )}
        </div>
      </div>
      {state && (
        <PageSnackbar
          open={state !== ''}
          onCloseNotification={() => {}}
          severity={
            state === 'deactivate-success'
              ? SuccessErrorType.SUCCESS
              : SuccessErrorType.ERROR
          }
          description={
            state === 'deactivate-success'
              ? t('content.deactivate.successMsg')
              : t('content.deactivate.errorMsg')
          }
          showIcon={true}
          autoClose={true}
        />
      )}
    </div>
  )
}
