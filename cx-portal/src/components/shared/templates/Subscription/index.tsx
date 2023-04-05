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
import { useTheme, CircularProgress } from '@mui/material'
import debounce from 'lodash.debounce'
import { show } from 'features/control/overlay/actions'
import { OVERLAYS } from 'types/Constants'
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
  SubscriptionRequestBody,
} from 'features/appSubscription/appSubscriptionApiSlice'
import { currentProviderSuccessType } from 'features/serviceProvider/slice'
import './Subscription.scss'
import SubscriptionElements from './SubscriptionElements'
import { SubscriptionRequestType } from 'features/serviceSubscription/serviceSubscriptionApiSlice'
import { RootState } from 'features/store'

enum FilterType {
  REQUEST = 'request',
  ACTIVE = 'active',
}

enum StatusIdType {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
}

enum SortType {
  CUSTOMER = 'customer',
  OFFER = 'offer',
  COMPANY_NAME_DESC = 'CompanyNameDesc',
  OFFER_IDS_ASC = 'OfferIdAsc',
}

interface SubscriptionType {
  providerSuccessMessage: string
  fetchQuery: (Obj: SubscriptionRequestType | SubscriptionRequestBody) => any
  headline: string
  subHeading: string
  description: string
  readMore: string
  registerURL: string
  searchPlaceHoder: string
  sortOptionLabels: {
    customer: string
    offer: string
  }
  tabLabels: {
    request: string
    active: string
  }
  doNotShowAutoSetup?: boolean
  currentSuccessType: (state: RootState) => any
}

export default function Subscription({
  providerSuccessMessage,
  headline,
  fetchQuery,
  subHeading,
  description,
  readMore,
  registerURL,
  searchPlaceHoder,
  sortOptionLabels,
  tabLabels,
  doNotShowAutoSetup,
  currentSuccessType,
}: SubscriptionType) {
  const dispatch = useDispatch()
  const theme = useTheme()
  const [searchExpr, setSearchExpr] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selected, setSelected] = useState<string>(FilterType.REQUEST)
  const [sortOption, setSortOption] = useState<string>(SortType.CUSTOMER)
  const [cardSubscriptions, setCardSubscriptions] = useState<
    SubscriptionContent[]
  >([])
  const [serviceProviderSuccess, setServiceProviderSuccess] =
    useState<boolean>(false)

  let statusId = ''

  if (selected === FilterType.REQUEST) {
    statusId = StatusIdType.PENDING
  } else if (selected === FilterType.ACTIVE) {
    statusId = StatusIdType.ACTIVE
  }

  let sortingType = SortType.COMPANY_NAME_DESC
  if (sortOption === SortType.OFFER) {
    sortingType = SortType.OFFER_IDS_ASC
  }

  const { data, refetch } = fetchQuery({
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
      label: sortOptionLabels.customer,
      value: SortType.CUSTOMER,
    },
    {
      label: sortOptionLabels.offer,
      value: SortType.OFFER,
    },
  ]

  const filterButtons = [
    {
      buttonText: tabLabels.request,
      buttonValue: FilterType.REQUEST,
      onButtonClick: setView,
    },
    {
      buttonText: tabLabels.active,
      buttonValue: FilterType.ACTIVE,
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
            {headline}
          </Typography>
          <Typography className="subheading" variant="body1">
            {subHeading}
          </Typography>
          {!doNotShowAutoSetup && (
            <Typography className="description" variant="caption2">
              {description}
            </Typography>
          )}
          {!doNotShowAutoSetup && (
            <div className="subDescription">
              <Typography className="readMore" variant="label3">
                {readMore}
              </Typography>
              <Typography
                variant="label3"
                onClick={() => dispatch(show(OVERLAYS.ADD_SERVICE_PROVIDER))}
                sx={{ cursor: 'pointer' }}
              >
                {registerURL}
              </Typography>
            </div>
          )}
          <div>
            <div className="searchContainer">
              <SearchInput
                placeholder={searchPlaceHoder}
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
          description={providerSuccessMessage}
          showIcon={true}
        />
      }
    </main>
  )
}
