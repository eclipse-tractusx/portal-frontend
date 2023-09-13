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

import { useTranslation } from 'react-i18next'
import { useTheme, CircularProgress } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import {
  Typography,
  IconButton,
  Tooltips,
  Chip,
  ErrorBar,
} from '@catena-x/portal-shared-components'
import { SubscriptionContent } from 'features/appSubscription/appSubscriptionApiSlice'
import NoItems from 'components/pages/NoItems'
import './Subscription.scss'
import AppSubscriptionDetailOverlay from 'components/pages/AppSubscription/AppSubscriptionDetailOverlay'
import ActivateSubscriptionOverlay from 'components/pages/AppSubscription/ActivateSubscriptionOverlay'
import { useState } from 'react'
import { SubscriptionStatus } from 'features/apps/apiSlice'
import { useReducer } from 'react'
import ActivateServiceSubscription from 'components/overlays/ActivateServiceSubscription'
import { SubscriptionTypes } from '.'

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
  companyName: string
  bpnNumber: string
}

const SubscriptionInitialData = {
  appId: '',
  subscriptionId: '',
  title: '',
  companyName: '',
  bpnNumber: '',
}

enum ActionKind {
  SET_OVERLAY = 'SET_OVERLAY',
  SET_ID = 'SET_ID',
  SET_TECH_USER = 'SET_TECH_USER',
  SET_ID_OFFER_ID_TECH_USER_OVERLEY = 'SET_ID_OFFER_ID_TECH_USER_OVERLEY',
  SET_OFFER_ID = 'SET_OFFER_ID',
}

type State = {
  id: string
  isTechUser: boolean
  overlay: boolean
  offerId: string
  companyName: string
}

const initialState: State = {
  id: '',
  isTechUser: false,
  overlay: false,
  offerId: '',
  companyName: '',
}

type Action = {
  type: string
  payload: any
}

function reducer(state: State, { type, payload }: Action) {
  switch (type) {
    case ActionKind.SET_ID:
      return { ...state, id: payload }
    case ActionKind.SET_OFFER_ID:
      return { ...state, offerId: payload }
    case ActionKind.SET_TECH_USER:
      return { ...state, isTechUser: payload }
    case ActionKind.SET_OVERLAY:
      return { ...state, overlay: payload }
    case ActionKind.SET_ID_OFFER_ID_TECH_USER_OVERLEY:
      return {
        ...state,
        id: payload.id,
        isTechUser: payload.isTechUser,
        overlay: payload.overlay,
        offerId: payload.offerId,
        companyName: payload.companyName,
      }
    default:
      return state
  }
}

export default function SubscriptionElements({
  subscriptions,
  type,
  refetch,
  isSuccess,
}: {
  subscriptions?: SubscriptionContent[]
  type: string
  refetch: () => void
  isSuccess: boolean
}) {
  const theme = useTheme()
  const { t } = useTranslation()
  const [{ id, isTechUser, overlay, offerId, companyName }, setState] =
    useReducer(reducer, initialState)

  const [viewDetails, setViewDetails] = useState<ViewDetail>(ViewDetailData)
  const [subscriptionDetail, setSubscriptionDetail] =
    useState<SubscriptionDataType>(SubscriptionInitialData)

  if (subscriptions && subscriptions.length === 0 && isSuccess) {
    return <NoItems />
  } else if (!isSuccess) {
    return (
      <ErrorBar
        errorText={t('error.errorBar')}
        handleButton={refetch}
        buttonText={t('error.tryAgain')}
        showButton={true}
      />
    )
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
                  {subscription.offerSubscriptionStatus ===
                    SubscriptionStatus.PENDING && (
                    <div className="forthSection">
                      <Chip
                        color="primary"
                        label={t('content.appSubscription.activateBtn')}
                        type="plain"
                        variant="filled"
                        onClick={() =>
                          type === SubscriptionTypes.APP_SUBSCRIPTION
                            ? setSubscriptionDetail({
                                appId: subscriptionData.offerId,
                                subscriptionId: subscription.subscriptionId,
                                title: subscriptionData.offerName,
                                companyName: subscription.companyName,
                                bpnNumber: subscription.bpnNumber,
                              })
                            : setState({
                                type: ActionKind.SET_ID_OFFER_ID_TECH_USER_OVERLEY,
                                payload: {
                                  id: subscription.subscriptionId,
                                  offerId: subscriptionData.offerId,
                                  isTechUser: subscription.technicalUser,
                                  overlay: true,
                                  companyName: subscription.companyName,
                                },
                              })
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
                      sx={{
                        borderRadius: '36px',
                        ':hover': {
                          pointerEvents: 'auto',
                        },
                      }}
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
      {overlay && (
        <ActivateServiceSubscription
          subscriptionId={id}
          offerId={offerId}
          isTechUser={isTechUser}
          companyName={companyName}
          handleOverlayClose={() => {
            setState({
              type: ActionKind.SET_OVERLAY,
              payload: false,
            })
            refetch()
          }}
        />
      )}
      {viewDetails.appId && (
        <AppSubscriptionDetailOverlay
          openDialog={viewDetails.appId ? true : false}
          appId={viewDetails.appId}
          subscriptionId={viewDetails.subscriptionId}
          type={type}
          handleOverlayClose={() => setViewDetails(ViewDetailData)}
        />
      )}
      {subscriptionDetail.appId && (
        <ActivateSubscriptionOverlay
          openDialog={subscriptionDetail.appId ? true : false}
          appId={subscriptionDetail.appId}
          subscriptionId={subscriptionDetail.subscriptionId}
          title={subscriptionDetail.title}
          companyName={subscriptionDetail.companyName}
          bpnNumber={subscriptionDetail.bpnNumber}
          handleOverlayClose={() =>
            setSubscriptionDetail(SubscriptionInitialData)
          }
        />
      )}
    </div>
  )
}
