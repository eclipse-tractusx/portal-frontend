/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
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
import { useTheme } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import {
  Typography,
  IconButton,
  Tooltips,
  Chip,
  ErrorBar,
  CircleProgress,
} from '@catena-x/portal-shared-components'
import {
  type CompanySubscriptionData,
  ProcessStep,
  type SubscriptionContent,
  useActivateSubscriptionMutation,
} from 'features/appSubscription/appSubscriptionApiSlice'
import NoItems from 'components/pages/NoItems'
import './style.scss'
import AppSubscriptionDetailOverlay from 'components/pages/AppSubscription/AppSubscriptionDetailOverlay'
import ActivateSubscriptionOverlay from 'components/pages/AppSubscription/ActivateSubscriptionOverlay'
import { useState, useReducer } from 'react'
import { SubscriptionStatus } from 'features/apps/types'
import ActivateServiceSubscription from 'components/overlays/ActivateServiceSubscription'
import { SubscriptionTypes } from '.'
import AddTaskIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import HistoryIcon from '@mui/icons-material/History'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined'
import { error, success } from 'services/NotifyService'
import DeclineSubscriptionOverlay from 'components/pages/AppSubscription/DeclineSubscriptionOverlay'

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
  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
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
  subscriptionHeading,
  declineSubscription,
}: {
  subscriptions?: SubscriptionContent[]
  type: string
  refetch: () => void
  isSuccess: boolean
  subscriptionHeading: string
  declineSubscription: (subscriptionId: string) => void
}) {
  const theme = useTheme()
  const { t } = useTranslation()
  const [{ id, isTechUser, overlay, offerId, companyName }, setState] =
    useReducer(reducer, initialState)

  const [viewDetails, setViewDetails] = useState<ViewDetail>(ViewDetailData)
  const [subscriptionDetail, setSubscriptionDetail] =
    useState<SubscriptionDataType>(SubscriptionInitialData)
  const [subscriptionDecline, setSubscriptionDecline] =
    useState<SubscriptionDataType>(SubscriptionInitialData)

  const [activateSubscription] = useActivateSubscriptionMutation()

  const handleActivate = async (subscriptionId: string) => {
    try {
      await activateSubscription(subscriptionId).unwrap()
      success(t('content.appSubscription.success'))
    } catch (err) {
      error(t('content.appSubscription.error'), '', err as object)
    } finally {
      refetch()
    }
  }

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
  const renderStatus = (
    subscriptionData: SubscriptionContent,
    subscription: CompanySubscriptionData
  ) => {
    if (subscription.offerSubscriptionStatus === SubscriptionStatus.ACTIVE) {
      return (
        <Tooltips
          color="dark"
          tooltipPlacement="top-start"
          tooltipText={t('content.appSubscription.active')}
        >
          <AddTaskIcon className="statusIcon active" />
        </Tooltips>
      )
    } else if (
      subscription.offerSubscriptionStatus === SubscriptionStatus.INACTIVE
    ) {
      return (
        <Tooltips
          color="dark"
          tooltipPlacement="top-start"
          tooltipText={t('content.appSubscription.unsubscribed')}
        >
          <CancelOutlinedIcon className="statusIcon inactive unsubscribed" />
        </Tooltips>
      )
    } else if (
      subscription.offerSubscriptionStatus === SubscriptionStatus.PENDING
    ) {
      if (
        subscription.processStepTypeId === ProcessStep.AWAIT_START_AUTOSETUP
      ) {
        return (
          <>
            <Chip
              className="cx-chip-decline"
              color="primary"
              label={t('content.appSubscription.declineBtn')}
              type="plain"
              variant="filled"
              onClick={() => {
                setSubscriptionDecline({
                  appId: subscriptionData.offerId,
                  subscriptionId: subscription.subscriptionId,
                  title: subscriptionData.offerName,
                  companyName: subscription.companyName,
                  bpnNumber: subscription.bpnNumber,
                })
              }}
            />
            <Chip
              className="cx-chip-configure"
              color="primary"
              label={t('content.appSubscription.configureBtn')}
              type="plain"
              variant="filled"
              onClick={() => {
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
              }}
            />
            <Tooltips
              color="dark"
              tooltipPlacement="top-start"
              tooltipText={t('content.appSubscription.pending')}
            >
              <HistoryIcon className="statusIcon pending" />
            </Tooltips>
          </>
        )
      } else if (
        subscription.processStepTypeId ===
        ProcessStep.MANUAL_TRIGGER_ACTIVATE_SUBSCRIPTION
      ) {
        return (
          <>
            <Chip
              color="primary"
              label={t('content.appSubscription.activateBtn')}
              type="plain"
              variant="filled"
              onClick={() => {
                handleActivate(subscription.subscriptionId)
              }}
            />
            <Tooltips
              color="dark"
              tooltipPlacement="top-start"
              tooltipText={
                t('content.appSubscription.pending') +
                subscription.processStepTypeId
              }
            >
              <HistoryIcon className="statusIcon pending" />
            </Tooltips>
          </>
        )
      } else {
        return (
          <Tooltips
            color="dark"
            tooltipPlacement="top-start"
            tooltipText={t('content.appSubscription.process')}
          >
            <PublishedWithChangesOutlinedIcon className="statusIcon process" />
          </Tooltips>
        )
      }
    } else {
      return (
        <Typography variant="label2" className="statusErrorIcon">
          {t('global.actions.error')}
        </Typography>
      )
    }
  }

  return (
    <div className="recommended-main">
      {subscriptions?.length ? (
        <>
          <Typography variant="h4" sx={{ marginBottom: '20px' }}>
            {subscriptionHeading}
          </Typography>
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

                    <div className="forthSection">
                      {renderStatus(subscriptionData, subscription)}
                    </div>
                    <div
                      className="viewDetails"
                      onClick={() => {
                        setViewDetails({
                          appId: subscriptionData.offerId,
                          subscriptionId: subscription.subscriptionId,
                        })
                      }}
                      onKeyDown={() => {
                        // do nothing
                      }}
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
                  </li>
                )
              )
            })}
          </ul>
        </>
      ) : (
        <div className="loading-progress">
          <CircleProgress
            variant="indeterminate"
            colorVariant="primary"
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
          handleOverlayClose={() => {
            setViewDetails(ViewDetailData)
          }}
        />
      )}
      {subscriptionDetail.appId && (
        <ActivateSubscriptionOverlay
          openDialog={subscriptionDetail.appId ? true : false}
          appId={subscriptionDetail.appId}
          subscriptionId={subscriptionDetail.subscriptionId}
          title={subscriptionDetail.title}
          handleOverlayClose={() => {
            setSubscriptionDetail(SubscriptionInitialData)
            refetch()
          }}
        />
      )}
      {subscriptionDecline.appId && (
        <DeclineSubscriptionOverlay
          openDialog={subscriptionDecline.appId ? true : false}
          appId={subscriptionDecline.appId}
          subscriptionId={subscriptionDecline.subscriptionId}
          title={subscriptionDecline.companyName}
          handleOverlayClose={() => {
            setSubscriptionDecline(SubscriptionInitialData)
          }}
          refetch={refetch}
          appName={subscriptionDecline.title}
          subscriptionType={type ?? SubscriptionTypes.APP_SUBSCRIPTION}
          declineSubscriptionAction={declineSubscription}
        />
      )}
    </div>
  )
}
