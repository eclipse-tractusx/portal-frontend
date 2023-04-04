/********************************************************************************
 * Copyright (c) 2021, 2023 Mercedes-Benz Group AG and BMW Group AG
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

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { PageBreadcrumb } from 'components/shared/frame/PageBreadcrumb/PageBreadcrumb'
import {
  PageHeader,
  ViewSelector,
  SearchInput,
  Cards,
  LoadMoreButton,
  CardItems,
} from 'cx-portal-shared-components'
import { serviceToCard } from 'features/apps/mapper'
import { Box } from '@mui/material'
import { fetchImageWithToken } from 'services/ImageService'
import {
  ProvidedServices,
  ProvidedServiceStatusEnum,
  ProvidedServiceType,
  StatusIdEnum,
  useFetchProvidedServicesQuery,
} from 'features/serviceManagement/apiSlice'
import NoItems from 'components/pages/NoItems'
import { useNavigate } from 'react-router-dom'
import { PAGES } from 'types/Constants'
import debounce from 'lodash.debounce'
import { setServiceId } from 'features/serviceManagement/actions'
import { useDispatch } from 'react-redux'
import { setServiceReleaseActiveStep } from 'features/serviceManagement/slice'
export default function ServiceListOverview() {
  const { t } = useTranslation('servicerelease')
  const [items, setItems] = useState<any>([])
  const [group, setGroup] = useState<string>('')
  const [searchExpr, setSearchExpr] = useState<string>('')
  const [page, setPage] = useState<number>(0)
  const navigate = useNavigate()
  const [argsData, setArgsData] = useState({
    page: page,
    args: {
      expr: '',
      statusFilter: '',
    },
  })
  const { data } = useFetchProvidedServicesQuery(argsData)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setServiceReleaseActiveStep())
    if (data && data.content)
      setItems(
        data?.meta.page === 0
          ? setDataInfo(data)
          : (i: CardItems[]) => i.concat(setDataInfo(data))
      )
  }, [data])

  const setDataInfo = (data: ProvidedServices) =>
    data.content.map((item: ProvidedServiceType) => serviceToCard(item))

  const setView = (e: React.MouseEvent<HTMLInputElement>) => {
    const viewValue = e.currentTarget.value
    setGroup(viewValue)
    setArgsData({
      page: 0,
      args: {
        expr: '',
        statusFilter: viewValue,
      },
    })
    setPage(0)
  }

  const statusFilterViews = [
    {
      buttonText: t('serviceoverview.filter.all'),
      buttonValue: StatusIdEnum.All,
      onButtonClick: setView,
    },
    {
      buttonText: t('serviceoverview.filter.active'),
      buttonValue: StatusIdEnum.Active,
      onButtonClick: setView,
    },
    {
      buttonText: t('serviceoverview.filter.inactive'),
      buttonValue: StatusIdEnum.Inactive,
      onButtonClick: setView,
    },
    {
      buttonText: t('serviceoverview.filter.wip'),
      buttonValue: StatusIdEnum.WIP,
      onButtonClick: setView,
    },
  ]

  const debouncedSearch = useMemo(
    () =>
      debounce((expr: string) => {
        setArgsData({
          page: page,
          args: {
            expr: expr,
            statusFilter: group,
          },
        })
      }, 400),
    [group, page]
  )

  const onSearch = useCallback(
    (expr: string) => {
      const validateExpr = /^[ A-Za-z]*$/.test(expr)
      if (!validateExpr) {
        return
      }
      setSearchExpr(expr)
      debouncedSearch(expr)
    },
    [debouncedSearch]
  )

  const nextPage = () => {
    setArgsData({
      page: page + 1,
      args: {
        expr: '',
        statusFilter: group,
      },
    })
    setPage(page + 1)
  }

  return (
    <main>
      <PageHeader
        title={t('serviceoverview.headerTitle')}
        topPage={true}
        headerHeight={200}
      >
        <PageBreadcrumb backButtonVariant="contained" />
      </PageHeader>
      <div className="app-main">
        <Box sx={{ marginTop: '20px' }} className="overview-section">
          <section className="overview-section-content">
            <ViewSelector
              activeView={group}
              views={statusFilterViews}
              align="center"
            />
            <Box sx={{ textAlign: 'center', marginTop: '30px' }}>
              <SearchInput
                sx={{ minWidth: '544px' }}
                margin={'normal'}
                value={searchExpr}
                onChange={(e) => {
                  onSearch(e.target.value)
                }}
                placeholder={t('serviceoverview.inputPlaceholder')}
              />
            </Box>
          </section>
        </Box>
      </div>
      <section>
        {items && items.length > 0 ? (
          <div className="desc-card">
            <Cards
              items={items}
              columns={4}
              buttonText="Details"
              variant="minimal"
              filledBackground={false}
              imageSize={'small'}
              imageLoader={fetchImageWithToken}
              showAddNewCard={false}
              newButtonText={t('serviceoverview.addbtn')}
              onNewCardButton={() =>
                navigate(`/${PAGES.SERVICERELEASEPROCESS}/form`)
              }
              onCardClick={(item: { id: string; status: string }) => {
                if (
                  item.status === ProvidedServiceStatusEnum.PENDING ||
                  item.status === ProvidedServiceStatusEnum.CREATED
                ) {
                  dispatch(setServiceId(item.id))
                  navigate(`/${PAGES.SERVICERELEASEPROCESS}/form`)
                } else {
                  navigate(`/${PAGES.SERVICE_DETAIL}/${item.id}`)
                }
              }}
              subMenu={false}
            />
          </div>
        ) : (
          <NoItems />
        )}
      </section>
      <div
        style={{
          textAlign: 'center',
        }}
      >
        {data?.meta && data?.meta?.totalPages > page + 1 && (
          <LoadMoreButton onClick={nextPage} label={t('loadmore')} />
        )}
      </div>
    </main>
  )
}
