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

import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useTheme, CircularProgress } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import {
  Typography,
  IconButton,
  Tooltips,
  Chip,
} from 'cx-portal-shared-components'
import { show } from 'features/control/overlay'
import { OVERLAYS } from 'types/Constants'
import { SubscriptionContent } from 'features/appSubscription/appSubscriptionApiSlice'
import NoItems from 'components/pages/NoItems'
import './Subscription.scss'
import AppSubscriptionDetailOverlay from 'components/pages/AppSubscription/AppSubscriptionDetailOverlay'
import ActivateSubscriptionOverlay from 'components/pages/AppSubscription/ActivateSubscriptionOverlay'
import { useState } from 'react'
import { SubscriptionStatus } from 'features/apps/apiSlice'

type ViewDetail = {
  appId: string
  subscriptionId: string
}

const ViewDetailData = {
  appId: '',
  subscriptionId: '',
}

type SubscriptionDataType = {
  appId: string
  subscriptionId: string
  title: string
}

const SubscriptionInitialData = {
  appId: '',
  subscriptionId: '',
  title: '',
}

export default function SubscriptionElements({
  subscriptions,
  isAppFilters,
}: {
  subscriptions?: SubscriptionContent[]
  isAppFilters?: boolean
}) {
  const theme = useTheme()
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [viewDetails, setViewDetails] = useState<ViewDetail>(ViewDetailData)
  const [subscriptionDetail, setSubscriptionDetail] =
    useState<SubscriptionDataType>(SubscriptionInitialData)

  if (subscriptions && subscriptions.length === 0) {
    return <NoItems />
  }

  return (
    <div className="recommended-main">
      {subscriptions && subscriptions.length ? (
        <ul className="subscription-list">
          {subscriptions.map((subscriptionData) => {
            return subscriptionData.companySubscriptionStatuses.map(
              (subscription) => (
                <li
                  key={subscription.subscriptionId}
                  className="subscription-list-item"
                >
                  <Typography variant="body3" className="firstSection">
                    {subscription.companyName}
                  </Typography>
                  <Typography variant="body3" className="secondSection">
                    {subscriptionData.offerName}
                  </Typography>
                  {isAppFilters ? (
                    <div
                      className="viewDetails"
                      onClick={() =>
                        setViewDetails({
                          appId: subscriptionData.offerId,
                          subscriptionId: subscription.subscriptionId,
                        })
                      }
                    >
                      <IconButton color="secondary" size="small">
                        <Tooltips
                          color="dark"
                          tooltipPlacement="top-start"
                          tooltipText={t('content.appSubscription.viewDetails')}
                        >
                          <ArrowForwardIcon />
                        </Tooltips>
                      </IconButton>
                    </div>
                  ) : (
                    <Typography variant="body3" className="thirdSection">
                      {'Placeholders for add details such as BPN; etc'}
                    </Typography>
                  )}
                  {subscription.offerSubscriptionStatus ===
                    SubscriptionStatus.PENDING && (
                    <div className="forthSection">
                      <Chip
                        color="primary"
                        label={t('content.appSubscription.activateBtn')}
                        type="plain"
                        variant="filled"
                        onClick={() =>
                          isAppFilters
                            ? setSubscriptionDetail({
                                appId: subscriptionData.offerId,
                                subscriptionId: subscription.subscriptionId,
                                title: subscriptionData.offerName,
                              })
                            : dispatch(
                                show(
                                  OVERLAYS.ADD_SUBSCRIPTION,
                                  subscription.subscriptionId
                                )
                              )
                        }
                      />
                    </div>
                  )}
                  {subscription.offerSubscriptionStatus ===
                    SubscriptionStatus.ACTIVE && (
                    <Chip
                      color="success"
                      label={t('content.appSubscription.tabs.active')}
                      type="confirm"
                      variant="filled"
                      withIcon
                    />
                  )}
                </li>
              )
            )
          })}
        </ul>
      ) : (
        <div className="loading-progress">
          <CircularProgress
            size={50}
            sx={{
              color: theme.palette.primary.main,
            }}
          />
        </div>
      )}
      {viewDetails && (
        <AppSubscriptionDetailOverlay
          openDialog={viewDetails.appId ? true : false}
          appId={viewDetails.appId}
          subscriptionId={viewDetails.subscriptionId}
          handleOverlayClose={() => setViewDetails(ViewDetailData)}
        />
      )}
      {subscriptionDetail.appId && (
        <ActivateSubscriptionOverlay
          openDialog={subscriptionDetail.appId ? true : false}
          appId={subscriptionDetail.appId}
          subscriptionId={subscriptionDetail.subscriptionId}
          title={subscriptionDetail.title}
          handleOverlayClose={() =>
            setSubscriptionDetail(SubscriptionInitialData)
          }
        />
      )}
    </div>
  )
}
