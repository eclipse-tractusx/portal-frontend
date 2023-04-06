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

import { useEffect, useState, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useTheme, CircularProgress } from '@mui/material'
import debounce from 'lodash.debounce'
import { show } from 'features/control/overlay'
import { OVERLAYS } from 'types/Constants'
import SubscriptionElements from './SubscriptionElements'
import {
  SearchInput,
  Typography,
  ViewSelector,
  SortOption,
  PageSnackbar,
} from 'cx-portal-shared-components'
import SortIcon from '@mui/icons-material/Sort'
import {
  SubscriptionContent,
  useFetchSubscriptionsQuery,
} from 'features/appSubscription/appSubscriptionApiSlice'
import { currentSuccessType } from 'features/appSubscription/slice'
import { currentProviderSuccessType } from 'features/serviceProvider/slice'
import './AppSubscription.scss'

export default function AppSubscription() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const theme = useTheme()
  const [searchExpr, setSearchExpr] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selected, setSelected] = useState<string>('request')
  const [sortOption, setSortOption] = useState<string>('customer')
  const [cardSubscriptions, setCardSubscriptions] = useState<
    SubscriptionContent[]
  >([])
  const [serviceProviderSuccess, setServiceProviderSuccess] =
    useState<boolean>(false)

  let statusId = ''

  if (selected === 'request') {
    statusId = 'PENDING'
  } else if (selected === 'Active') {
    statusId = 'ACTIVE'
  }

  let sortingType = 'CompanyNameDesc'
  if (sortOption === 'offer') {
    sortingType = 'OfferIdAsc'
  }

  const { data, refetch } = useFetchSubscriptionsQuery({
    page: 0,
    statusId: statusId,
    sortingType: sortingType,
  })
  const subscriptions = data && data.content
  useEffect(() => {
    subscriptions && setCardSubscriptions(subscriptions)
  }, [subscriptions])

  const success: boolean = useSelector(currentSuccessType)
  useEffect(() => {
    refetch()
  }, [success, refetch])

  const isSuccess = useSelector(currentProviderSuccessType)
  useEffect(() => {
    isSuccess && setServiceProviderSuccess(true)
  }, [isSuccess])

  const setView = (e: React.MouseEvent<HTMLInputElement>) => {
    setSelected(e.currentTarget.value)
  }

  const sortOptions = [
    {
      label: t('content.appSubscription.sortOptions.customer'),
      value: 'customer',
    },
    {
      label: t('content.appSubscription.sortOptions.offer'),
      value: 'offer',
    },
  ]

  const filterButtons = [
    {
      buttonText: t('content.appSubscription.tabs.request'),
      buttonValue: 'request',
      onButtonClick: setView,
    },
    {
      buttonText: t('content.appSubscription.tabs.active'),
      buttonValue: 'active',
      onButtonClick: setView,
    },
  ]

  const debouncedFilter = useMemo(
    () =>
      debounce((expr: string) => {
        subscriptions &&
          setCardSubscriptions(
            expr
              ? subscriptions &&
                  subscriptions.filter((card: SubscriptionContent) =>
                    card.serviceName.toLowerCase().includes(expr.toLowerCase())
                  )
              : subscriptions
          )
      }, 300),
    [subscriptions]
  )

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

  return (
    <main className="appSubscription">
      <div className="mainContainer">
        <div className="mainRow">
          <Typography className="heading" variant="h2">
            {t('content.appSubscription.headline')}
          </Typography>
          <Typography className="subheading" variant="body1">
            {t('content.appSubscription.subHeading')}
          </Typography>
          <Typography className="description" variant="caption2">
            {t('content.appSubscription.description')}
          </Typography>
          <div className="subDescription">
            <Typography className="readMore" variant="label3">
              {t('content.appSubscription.readMore')}
            </Typography>
            <Typography
              variant="label3"
              onClick={() => dispatch(show(OVERLAYS.ADD_SERVICE_PROVIDER))}
              sx={{ cursor: 'pointer' }}
            >
              {t('content.appSubscription.registerURL')}
            </Typography>
          </div>
          <div>
            <div className="searchContainer">
              <SearchInput
                placeholder={t('content.appSubscription.search')}
                value={searchExpr}
                autoFocus={false}
                onChange={(e) => searchDataFn(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div
              className="filterSection"
              onMouseLeave={() => setShowModal(false)}
            >
              <ViewSelector activeView={selected} views={filterButtons} />
              <div className="iconSection">
                <SortIcon
                  onClick={() => setShowModal(true)}
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
            {!subscriptions ? (
              <div className="loading-progress">
                <CircularProgress
                  size={50}
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                />
              </div>
            ) : (
              <SubscriptionElements subscriptions={cardSubscriptions} />
            )}
          </div>
        </div>
      </div>
      {
        <PageSnackbar
          open={serviceProviderSuccess}
          onCloseNotification={() => setServiceProviderSuccess(false)}
          severity="success"
          description={t(
            'content.appSubscription.register.providerSuccessMessage'
          )}
          showIcon={true}
        />
      }
    </main>
  )
}
