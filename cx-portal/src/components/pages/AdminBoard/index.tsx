/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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

import { useEffect, useState, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useTheme, CircularProgress } from '@mui/material'
import debounce from 'lodash.debounce'
import { show } from 'features/control/overlay/actions'
import { OVERLAYS } from 'types/Constants'
import SubscriptionElements from './AdminBoardElements'
import {
  SearchInput,
  Typography,
  ViewSelector,
  SortOption,
  PageSnackbar,
  PageHeader,
} from 'cx-portal-shared-components'
import SortIcon from '@mui/icons-material/Sort'
import {
  SubscriptionContent,
  useFetchSubscriptionsQuery,
} from 'features/appSubscription/appSubscriptionApiSlice'
import { currentSuccessType } from 'features/appSubscription/slice'
import { currentProviderSuccessType } from 'features/serviceProvider/slice'
import './AdminBoard.scss'
import { PageBreadcrumb } from 'components/shared/frame/PageBreadcrumb/PageBreadcrumb'
import { useFetchAppReleaseAppsQuery } from 'features/adminBoard/adminBoardApiSlice'
import AdminBoardElements from './AdminBoardElements'

export default function AppSubscription() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const theme = useTheme()
  const [searchExpr, setSearchExpr] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selected, setSelected] = useState<string>('')
  const [sortOption, setSortOption] = useState<string>('new')
  const [cardSubscriptions, setCardSubscriptions] = useState<
    SubscriptionContent[]
  >([])
  const [serviceProviderSuccess, setServiceProviderSuccess] =
    useState<boolean>(false)

  let statusId = selected

  let sortingType = 'DateDesc'
  if (sortOption === 'title') {
    sortingType = 'NameAsc'
  }

  const { data, refetch } = useFetchAppReleaseAppsQuery({
    page: 0,
    statusId: statusId,
    sortingType: sortingType,
  })

  // const { data, refetch } = useFetchSubscriptionsQuery({
  //   page: 0,
  //   statusId: statusId,
  //   sortingType: sortingType,
  // })
  const apps = data && data.content
  // useEffect(() => {
  //   subscriptions && setCardSubscriptions(subscriptions)
  // }, [subscriptions])

  // const success: boolean = useSelector(currentSuccessType)
  // useEffect(() => {
  //   refetch()
  // }, [success, refetch])

  // const isSuccess = useSelector(currentProviderSuccessType)
  // useEffect(() => {
  //   isSuccess && setServiceProviderSuccess(true)
  // }, [isSuccess])

  const setView = (e: React.MouseEvent<HTMLInputElement>) => {
    setSelected(e.currentTarget.value)
  }

  const sortOptions = [
    {
      label: t('content.adminBoard.sortOptions.newFirst'),
      value: 'new',
    },
    {
      label: t('content.adminBoard.sortOptions.AppTitle'),
      value: 'title',
    },
  ]

  const filterButtons = [
    {
      buttonText: t('content.adminBoard.tabs.all'),
      buttonValue: '',
      onButtonClick: setView,
    },
    {
      buttonText: t('content.adminBoard.tabs.request'),
      buttonValue: 'INREVIEW',
      onButtonClick: setView,
    },
  ]

  // const debouncedFilter = useMemo(
  //   () =>
  //     debounce((expr: string) => {
  //       subscriptions &&
  //         setCardSubscriptions(
  //           expr
  //             ? subscriptions &&
  //             subscriptions.filter((card: SubscriptionContent) =>
  //               card.serviceName.toLowerCase().includes(expr.toLowerCase())
  //             )
  //             : subscriptions
  //         )
  //     }, 300),
  //   [subscriptions]
  // )

  const debouncedFilter = (expr: string) => {}

  const searchDataFn = useCallback(
    (expr: string) => {
      setSearchExpr(expr)
      debouncedFilter(expr)
    },
    [debouncedFilter]
  )

  const setSortOptionFunc = (value: string) => {
    setSortOption(value)
    setShowModal(false)
  }

  const setModalFalse = () => {
    setShowModal(false)
  }

  const setSortModalTrue = () => {
    setShowModal(true)
  }

  return (
    <div className="adminBoard">
      <PageHeader
        title={t('content.adminBoard.headerTitle')}
        topPage={true}
        headerHeight={200}
      >
        <PageBreadcrumb backButtonVariant="contained" />
      </PageHeader>
      <div className="mainContainer">
        <div className="searchContainer">
          <SearchInput
            placeholder={t('content.adminBoard.search')}
            value={searchExpr}
            autoFocus={false}
            onChange={(e) => searchDataFn(e.target.value)}
          />
        </div>
        <div className="filterSection" onMouseLeave={setModalFalse}>
          <ViewSelector activeView={selected} views={filterButtons} />
          <div className="iconSection">
            <SortIcon
              onClick={setSortModalTrue}
              sx={{
                fontSize: 20,
                color: '#939393',
                ':hover': { color: '#0D55AF' },
              }}
            />
          </div>
          <div className="sortSection">
            <SortOption
              show={showModal}
              selectedOption={sortOption}
              setSortOption={setSortOptionFunc}
              sortOptions={sortOptions}
            />
          </div>
        </div>
        {!apps ? (
          <div className="loading-progress">
            <CircularProgress
              size={50}
              sx={{
                color: theme.palette.primary.main,
              }}
            />
          </div>
        ) : (
          <AdminBoardElements apps={apps} />
        )}
      </div>
      {
        <PageSnackbar
          open={serviceProviderSuccess}
          onCloseNotification={() => setServiceProviderSuccess(false)}
          severity="success"
          description={t('content.appStore.register.providerSuccessMessage')}
          showIcon={true}
        />
      }
    </div>
  )
}
