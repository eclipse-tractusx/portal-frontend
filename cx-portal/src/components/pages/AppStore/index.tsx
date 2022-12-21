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
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useTheme, CircularProgress } from '@mui/material'
import debounce from 'lodash.debounce'
import SubscriptionElements from './SubscriptionElements'
import './AppStore.scss'
import {
  SearchInput,
  Typography,
  ViewSelector,
  SortOption,
} from 'cx-portal-shared-components'
import SortIcon from '@mui/icons-material/Sort'
import {
  SubscriptionContent,
  useFetchSubscriptionsQuery,
} from 'features/appStore/appStoreApiSlice'
import { currentSuccessType } from 'features/appStore/slice'

export default function AppStore() {
  const { t } = useTranslation()
  const theme = useTheme()
  const [searchExpr, setSearchExpr] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selected, setSelected] = useState<string>('request')
  const [sortOption, setSortOption] = useState<string>('customer')
  const [cardSubscriptions, setCardSubscriptions] = useState<
    SubscriptionContent[]
  >([])

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

  const setView = (e: React.MouseEvent<HTMLInputElement>) => {
    setSelected(e.currentTarget.value)
  }

  const sortOptions = [
    {
      label: t('content.appStore.sortOptions.customer'),
      value: 'customer',
    },
    {
      label: t('content.appStore.sortOptions.offer'),
      value: 'offer',
    },
  ]

  const filterButtons = [
    {
      buttonText: t('content.appStore.tabs.request'),
      buttonValue: 'request',
      onButtonClick: setView,
    },
    {
      buttonText: t('content.appStore.tabs.active'),
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

  const doFilter = useCallback(
    (expr: string) => {
      setSearchExpr(expr)
      debouncedFilter(expr)
    },
    [debouncedFilter]
  )

  const setSortOptionFn = useCallback((value: string) => {
    setSortOption(value)
    setShowModal(false)
  }, [])

  const setModalFalse = useCallback(() => {
    setShowModal(false)
  }, [])

  const setModalTrue = useCallback(() => {
    setShowModal(true)
  }, [])

  return (
    <main className="appStore">
      <div className="mainContainer">
        <div className="mainRow">
          <Typography className="heading" variant="h2">
            {t('content.appStore.headline')}
          </Typography>
          <Typography className="subheading" variant="body1">
            {t('content.appStore.subHeading')}
          </Typography>
          <Typography className="description" variant="caption2">
            {t('content.appStore.description')}
          </Typography>
          <div className="subDescription">
            <Typography className="readMore" variant="label3">
              {t('content.appStore.readMore')}
            </Typography>
            <Typography variant="label3">
              {t('content.appStore.registerURL')}
            </Typography>
          </div>
          <div>
            <div className="searchContainer">
              <SearchInput
                placeholder={t('content.appStore.search')}
                value={searchExpr}
                autoFocus={false}
                onChange={(e) => doFilter(e.target.value)}
              />
            </div>
            <div className="filterSection" onMouseLeave={setModalFalse}>
              <ViewSelector activeView={selected} views={filterButtons} />
              <div className="iconSection">
                <SortIcon
                  onClick={setModalTrue}
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
                  setSortOption={setSortOptionFn}
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
              <SubscriptionElements
                subscriptions={cardSubscriptions}
                selectedTab={selected}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
