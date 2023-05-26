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

import { Button, Typography } from 'cx-portal-shared-components'
import { useTheme, CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { show } from 'features/control/overlay'
import { OVERLAYS } from 'types/Constants'
import {
  CompanySubscriptionData,
  SubscriptionContent,
} from 'features/appSubscription/appSubscriptionApiSlice'
import './Subscription.scss'
import NoItems from 'components/pages/NoItems'
import { SubscriptionTypes } from '.'
import { useReducer } from 'react'
import ActivateServiceSubscription from 'components/overlays/ActivateServiceSubscription'

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
}: {
  subscriptions?: SubscriptionContent[]
  type: string
}) {
  const theme = useTheme()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [{ id, isTechUser, overlay, offerId, companyName }, setState] =
    useReducer(reducer, initialState)

  if (subscriptions && subscriptions.length === 0) {
    return <NoItems />
  }

  const showOverlay = (
    subscription: CompanySubscriptionData,
    offerId: string
  ) => {
    if (type === SubscriptionTypes.APP_SUBSCRIPTION) {
      dispatch(show(OVERLAYS.ADD_SUBSCRIPTION, subscription.subscriptionId))
    } else {
      setState({
        type: ActionKind.SET_ID_OFFER_ID_TECH_USER_OVERLEY,
        payload: {
          id: subscription.subscriptionId,
          offerId: offerId,
          isTechUser: true,
          overlay: true,
          companyName: subscription.companyName,
        },
      })
    }
  }

  return (
    <>
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
                    <Typography variant="body2" className="firstSection">
                      {subscription.companyName}
                    </Typography>
                    <Typography variant="body2" className="secondSection">
                      {subscriptionData.serviceName}
                    </Typography>
                    <Typography variant="body3" className="thirdSection">
                      {'Placeholders for add details such as BPN; etc'}
                    </Typography>
                    {subscription.offerSubscriptionStatus === 'PENDING' && (
                      <div className="forthSection">
                        <Button
                          color="primary"
                          className="wd-25"
                          onClick={() =>
                            showOverlay(subscription, subscriptionData.offerId)
                          }
                          size="small"
                          variant="contained"
                        >
                          {t('content.appSubscription.activateBtn')}
                        </Button>
                      </div>
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
      </div>
      {overlay && (
        <ActivateServiceSubscription
          companyId={id}
          offerId={offerId}
          isTechUser={isTechUser}
          companyName={companyName}
          handleOverlayClose={() =>
            setState({
              type: ActionKind.SET_OVERLAY,
              payload: false,
            })
          }
        />
      )}
    </>
  )
}
