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

import { useCallback, useMemo, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { PageBreadcrumb } from 'components/shared/frame/PageBreadcrumb/PageBreadcrumb'
import {
  PageHeader,
  Typography,
  ViewSelector,
  SearchInput,
  CardItems,
  Cards,
} from 'cx-portal-shared-components'
import { appCardStatus, appCardRecentlyApps } from 'features/apps/mapper'
import { Box } from '@mui/material'
import { useFetchProvidedAppsQuery, AppInfo } from 'features/apps/apiSlice'
import { useDispatch } from 'react-redux'
import debounce from 'lodash.debounce'
import { OVERLAYS, PAGES } from 'types/Constants'
import { show } from 'features/control/overlay/actions'
import { useNavigate } from 'react-router-dom'
import './AppOverview.scss'

export default function AppOverview() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [group, setGroup] = useState<string>('')
  const { data } = useFetchProvidedAppsQuery()
  const items = data && appCardStatus(data)
  const recentlyChangedApps = data && appCardRecentlyApps(data)
  const [filterItem, setFilterItem] = useState<CardItems[]>()
  const [searchExpr, setSearchExpr] = useState<string>('')

  const valueMap: any = {
    wip: ['in_review', 'created'],
    inactive: 'inactive',
    active: 'active',
  }

  const debouncedSearch = useMemo(
    () =>
      debounce((expr: string, data: CardItems[] | undefined, group: string) => {
        if (group) {
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
                .includes(expr.toLocaleLowerCase()) ||
              item.subtitle
                ?.toLocaleLowerCase()
                .includes(expr.toLocaleLowerCase()) ||
              item.statusText
                ?.toLocaleLowerCase()
                .includes(expr.toLocaleLowerCase())
          )
          setFilterItem(filterItems)
        } else if (group) {
          setFilterItem(data)
        } else if (expr.length === 0) {
          setFilterItem(items)
        }
      }, 400),
    // eslint-disable-next-line
    [dispatch, filterItem, group]
  )

  useEffect(() => {
    if (items) {
      setFilterItem(items)
    }
    // eslint-disable-next-line
  }, [data])

  const setView = (e: React.MouseEvent<HTMLInputElement>) => {
    const viewValue = e.currentTarget.value
    setGroup(viewValue)
    debouncedSearch(searchExpr, items, viewValue)
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
      debouncedSearch(expr, items, group)
    },
    [debouncedSearch, items, group]
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
                onCardClick={(item: AppInfo) => {
                  showOverlay(item)
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
                onChange={(e) => doSearch(e.target.value)}
                placeholder={t('content.appoverview.inputPlaceholder')}
              />
            </Box>
            <div className="view-selector">
              <ViewSelector activeView={group} views={categoryViews} />
            </div>
          </section>
        </Box>

        <div className="app-detail">
          {filterItem && filterItem?.length > 0 && (
            <div className="desc-card">
              <Cards
                items={filterItem}
                columns={4}
                buttonText="Details"
                variant="minimal"
                filledBackground={false}
                imageSize={'small'}
                showAddNewCard={true}
                newButtonText={t('content.appoverview.addbtn')}
                onNewCardButton={() =>
                  navigate(`/${PAGES.APPRELEASEPROCESS}/form`)
                }
                onCardClick={(item: AppInfo) => {
                  showOverlay(item)
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
