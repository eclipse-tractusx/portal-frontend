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
  type CardItems,
  PageSnackbar,
  ErrorBar,
} from '@catena-x/portal-shared-components'
import { serviceToCard } from 'features/apps/mapper'
import { fetchImageWithToken } from 'services/ImageService'
import {
  type ProvidedServices,
  ProvidedServiceStatusEnum,
  type ProvidedServiceType,
  ServiceDeactivateEnum,
  StatusIdEnum,
  useFetchProvidedServicesQuery,
} from 'features/serviceManagement/apiSlice'
import NoItems from 'components/pages/NoItems'
import { useLocation, useNavigate } from 'react-router-dom'
import { PAGES } from 'types/Constants'
import debounce from 'lodash.debounce'
import {
  setServiceId,
  setServiceStatus,
} from 'features/serviceManagement/actions'
import { useDispatch } from 'react-redux'
import { setServiceReleaseActiveStep } from 'features/serviceManagement/slice'
import { SuccessErrorType } from 'features/admin/appuserApiSlice'
import { Box, useTheme, CircularProgress } from '@mui/material'
import { initialState } from 'features/serviceManagement/types'

enum ServiceSubMenuItems {
  DEACTIVATE = 'deactivate',
}

export default function ServiceListOverview() {
  const { t } = useTranslation('servicerelease')
  const [items, setItems] = useState<any>([])
  const [group, setGroup] = useState<string>('')
  const [searchExpr, setSearchExpr] = useState<string>('')
  const [page, setPage] = useState<number>(0)
  const navigate = useNavigate()
  const [argsData, setArgsData] = useState({
    page,
    args: {
      expr: '',
      statusFilter: '',
    },
  })
  const { state } = useLocation()
  const { data, isFetching, isSuccess, refetch } =
    useFetchProvidedServicesQuery(argsData)
  const dispatch = useDispatch()
  const theme = useTheme()

  const submenuOptions = [
    {
      label: t('serviceoverview.sortOptions.deactivate'),
      value: ServiceSubMenuItems.DEACTIVATE,
      url: '',
    },
  ]

  useEffect(() => {
    state === ServiceDeactivateEnum.SERVICE_DEACTIVATE_SUCCESS && refetch()
  }, [state, refetch])

  useEffect(() => {
    dispatch(setServiceReleaseActiveStep())
    if (data && data.content)
      setItems(
        data?.meta.page === 0
          ? setDataInfo(data)
          : (i: CardItems[]) => i.concat(setDataInfo(data))
      )
  }, [data, dispatch])

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
          page,
          args: {
            expr,
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

  const onNewServiceCardClick = () => {
    navigate(`/${PAGES.SERVICERELEASEPROCESS}/form`)
    dispatch(setServiceId(''))
    dispatch(setServiceReleaseActiveStep())
    dispatch(setServiceStatus(initialState.serviceStatusData))
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
            {items && items.length > 0 && isSuccess ? (
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
                  onNewCardButton={onNewServiceCardClick}
                  onCardClick={(item: CardItems) => {
                    // TODO: workaround - fix CardItems type
                    const cardItem: any = item
                    if (
                      cardItem.status === ProvidedServiceStatusEnum.PENDING ||
                      cardItem.status === ProvidedServiceStatusEnum.CREATED
                    ) {
                      dispatch(setServiceId(item.id ?? ''))
                      navigate(`/${PAGES.SERVICERELEASEPROCESS}/form`)
                    } else {
                      navigate(`/${PAGES.SERVICE_DETAIL}/${item.id}`)
                    }
                  }}
                  subMenu={true}
                  submenuOptions={submenuOptions}
                  submenuClick={(sortMenu: string, id: string | undefined) => {
                    sortMenu === ServiceSubMenuItems.DEACTIVATE &&
                      navigate(`/${PAGES.SERVICEDEACTIVATE}/${id}`, {
                        state: items,
                      })
                    return undefined
                  }}
                  tooltipText={t('serviceoverview.submenuNotAvailable')}
                />
              </div>
            ) : (
              <NoItems />
            )}
          </>
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

      {state && (
        <PageSnackbar
          open={state !== ''}
          onCloseNotification={() => {}}
          severity={
            state === ServiceDeactivateEnum.SERVICE_DEACTIVATE_SUCCESS
              ? SuccessErrorType.SUCCESS
              : SuccessErrorType.ERROR
          }
          description={
            state === ServiceDeactivateEnum.SERVICE_DEACTIVATE_SUCCESS
              ? t('serviceoverview.serviceDeactivate.successMsg')
              : t('serviceoverview.serviceDeactivate.errorMsg')
          }
          showIcon={true}
          autoClose={true}
        />
      )}
    </main>
  )
}
