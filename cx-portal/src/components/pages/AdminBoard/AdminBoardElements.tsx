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

import { CardDecision, PageSnackbar } from 'cx-portal-shared-components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTheme, CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { show } from 'features/control/overlay/actions'
import './AdminBoard.scss'
import {
  AppContent,
  useApproveRequestMutation,
} from 'features/adminBoard/adminBoardApiSlice'
import NoItems from '../NoItems'
import { OVERLAYS } from 'types/Constants'
import {
  currentErrorType,
  currentSuccessType,
  setErrorType,
  setSuccessType,
} from 'features/adminBoard/slice'

export default function AdminBoardElements({ apps }: { apps?: AppContent[] }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
  const { t } = useTranslation()

  const [approveRequest] = useApproveRequestMutation()
  const isDecisionSuccess = useSelector(currentSuccessType)
  const isDecisionError = useSelector(currentErrorType)

  if (apps && apps.length === 0) {
    return <NoItems />
  }

  const handleApprove = async (appId: string) => {
    await approveRequest(appId)
      .unwrap()
      .then(() => {
        dispatch(setSuccessType(true))
      })
      .catch((error) => dispatch(setErrorType(true)))
  }

  const onAlertClose = () => {
    dispatch(setSuccessType(false))
    dispatch(setErrorType(false))
  }

  return (
    <div className="admin-board-elements-main">
      <PageSnackbar
        open={isDecisionSuccess || isDecisionError}
        onCloseNotification={onAlertClose}
        severity={isDecisionSuccess ? 'success' : 'error'}
        description={
          isDecisionSuccess
            ? t('content.adminBoard.successMsg')
            : t('content.adminBoard.errorMsg')
        }
        showIcon={true}
        autoClose={true}
      />
      {apps && apps.length ? (
        <CardDecision
          items={apps}
          onDelete={(appId: string) =>
            dispatch(show(OVERLAYS.DECLINE_ADMINBOARD, appId))
          }
          onApprove={(appId: string) => handleApprove(appId)}
          onClick={(appId: string) => navigate(`/adminboarddetail/${appId}`)}
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
