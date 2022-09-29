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
  Cards,
  ViewSelector,
  SearchInput,
  CardAddService,
  CardHorizontal,
  CardItems,
} from 'cx-portal-shared-components'
import { appCardStatus } from 'features/apps/mapper'
import { Box } from '@mui/material'
import './AppOverview.scss'
import { useFetchProvidedAppsQuery } from 'features/apps/apiSlice'
import uniqueId from 'lodash/uniqueId'
import { useDispatch } from 'react-redux'
import debounce from 'lodash.debounce'

export default function AppOverview() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [group, setGroup] = useState<string>('')
  const { data } = useFetchProvidedAppsQuery()
  const items = data && appCardStatus(data)
  const [filterItem, setFilterItem] = useState<CardItems[]>()
  const [searchExpr, setSearchExpr] = useState<string>('')

  const debouncedSearch = useMemo(
    () =>
      debounce((expr: string, data: CardItems[] | undefined, group: string) => {
        if (group) {
          data = data?.filter((item: any) => item.status === group)
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

  return (
    <div className="appoverview-app">
      <PageHeader
        title={t('content.appoverview.headerTitle')}
        topPage={true}
        headerHeight={200}
      >
        <PageBreadcrumb backButtonVariant="contained" />
      </PageHeader>
      <div className="desc-recently">
        <div className="container">
          <Typography variant="h4" className="desc-heading">
            {t('content.appoverview.recently.header')}
          </Typography>
          <Typography variant="body2" className="desc-message">
            {t('content.appoverview.recently.subheader')}
          </Typography>
          <div className="desc-card">
            {items ? (
              <Cards
                items={items.slice(0, 4)}
                columns={4}
                buttonText="Details"
                variant="minimal"
                filledBackground={true}
              />
            ) : null}
          </div>
        </div>
      </div>
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
          <div className="app-child">
            <CardAddService
              borderRadius={20}
              backgroundColor={'background.background01'}
              onButtonClick={function noRefCheck() {}}
              title={t('content.appoverview.addbtn')}
            />
          </div>
          {filterItem?.map((item: any) => {
            return (
              <div className="app-child" key={uniqueId(item.title)}>
                <CardHorizontal
                  borderRadius={20}
                  imageAlt={item.image.alt || ''}
                  imagePath={item.image.src}
                  label={item.subtitle || ''}
                  onBtnClick={function noRefCheck() {}}
                  statusText={item.statusText}
                  status={item.status}
                  title={item.title}
                  backgroundColor={'background.background01'}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
