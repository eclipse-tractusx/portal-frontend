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

import {
  CardDecision,
  ErrorBar,
  PageSnackbar,
} from '@catena-x/portal-shared-components'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme, CircularProgress } from '@mui/material'
import { show } from 'features/control/overlay'
import './AdminBoard.scss'
import {
  type AppContent,
  useApproveRequestMutation,
} from 'features/adminBoard/adminBoardApiSlice'
import { OVERLAYS, PAGES } from 'types/Constants'
import {
  currentErrorType,
  currentSuccessType,
  setErrorType,
  setSuccessType,
} from 'features/adminBoard/slice'
import { SuccessErrorType } from 'features/admin/appuserApiSlice'
import NoItems from 'components/pages/NoItems'
import {
  type ServiceContent,
  useApproveServiceRequestMutation,
} from 'features/adminBoard/serviceAdminBoardApiSlice'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function AdminBoardElements({
  apps,
  onClick,
  type,
  successApproveMsg,
  errorApproveMsg,
  successDeclineMsg,
  errorDeclineMsg,
  isSuccess,
  refetch,
}: {
  apps?: AppContent[] | ServiceContent[]
  onClick: (appId: string) => void
  type?: string
  successApproveMsg?: string
  errorApproveMsg?: string
  successDeclineMsg?: string
  errorDeclineMsg?: string
  isSuccess: boolean
  refetch: () => {}
}) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const theme = useTheme()
  const [approveRequest] = useApproveRequestMutation()
  const [approveServiceRequest] = useApproveServiceRequestMutation()
  const isDecisionSuccess = useSelector(currentSuccessType)
  const isDecisionError = useSelector(currentErrorType)
  const [actionApprove, setActionApprove] = useState<boolean>(false)

  if (apps && apps.length === 0 && isSuccess) {
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

  const handleApprove = async (appId: string) => {
    setActionApprove(true)
    if (type === PAGES.SERVICEADMINBOARD_DETAIL) {
      await approveServiceRequest(appId)
        .unwrap()
        .then(() => {
          dispatch(setSuccessType(true))
        })
        .catch((error) => dispatch(setErrorType(true)))
    } else {
      await approveRequest(appId)
        .unwrap()
        .then(() => {
          dispatch(setSuccessType(true))
        })
        .catch((error) => dispatch(setErrorType(true)))
    }
  }

  const onAlertClose = () => {
    dispatch(setSuccessType(false))
    dispatch(setErrorType(false))
  }

  const getDescription = () => {
    if (actionApprove) {
      return isDecisionSuccess ? successApproveMsg : errorApproveMsg
    } else {
      return isDecisionSuccess ? successDeclineMsg : errorDeclineMsg
    }
  }

  return (
    <div className="admin-board-elements-main">
      <PageSnackbar
        open={isDecisionSuccess || isDecisionError}
        onCloseNotification={onAlertClose}
        severity={
          isDecisionSuccess ? SuccessErrorType.SUCCESS : SuccessErrorType.ERROR
        }
        description={getDescription()}
        showIcon={true}
        autoClose={true}
      />
      {apps && apps.length ? (
        <CardDecision
          items={apps}
          onDelete={(appId: string) => {
            setActionApprove(false)
            if (type === PAGES.SERVICEADMINBOARD_DETAIL) {
              dispatch(show(OVERLAYS.SERVICE_DECLINE_ADMINBOARD, appId))
            } else {
              dispatch(show(OVERLAYS.APP_DECLINE_ADMINBOARD, appId))
            }
          }}
          onApprove={(appId: string) => handleApprove(appId)}
          onClick={onClick}
        />
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
  )
}
