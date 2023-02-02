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

import { useState } from 'react'
import {
  CardDecision,
  PageNotifications,
  PageSnackbar,
} from 'cx-portal-shared-components'
import { useTheme, CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'
import './AdminBoard.scss'
import {
  AppContent,
  useApproveRequestMutation,
  useDeclineRequestMutation,
} from 'features/adminBoard/adminBoardApiSlice'

export default function AdminBoardElements({
  apps,
  handleApproveDeclineSuccess,
}: {
  apps?: AppContent[]
  handleApproveDeclineSuccess: any
}) {
  const theme = useTheme()
  const { t } = useTranslation()
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false)
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false)

  const [approveRequest] = useApproveRequestMutation()
  const [declineRequest] = useDeclineRequestMutation()

  if (apps && apps.length === 0) {
    return (
      <div className="recommended-section">
        <PageNotifications
          description={t('content.serviceMarketplace.noDataMessage')}
          open
          severity="error"
          showIcon
          title="Error"
        />
      </div>
    )
  }

  const handleDecision = async (appId: string, status: string) => {
    const statusFn =
      status === 'approve' ? approveRequest(appId) : declineRequest(appId)
    await statusFn
      .unwrap()
      .then(() => {
        setShowSuccessAlert(true)
        handleApproveDeclineSuccess(true)
      })
      .catch((error) => setShowErrorAlert(true))
  }

  const onAlertClose = () => {
    setShowSuccessAlert(false)
    setShowErrorAlert(false)
  }

  return (
    <div className="admin-board-elements-main">
      <PageSnackbar
        open={showSuccessAlert || showErrorAlert}
        onCloseNotification={onAlertClose}
        severity={showSuccessAlert ? 'success' : 'error'}
        description={
          showSuccessAlert
            ? t('content.adminBoard.successMsg')
            : t('content.adminBoard.errorMsg')
        }
        showIcon={true}
      />
      {apps && apps.length ? (
        <CardDecision
          items={apps}
          onDelete={(appId: string) => handleDecision(appId, 'decline')}
          onApprove={(appId: string) => handleDecision(appId, 'approve')}
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
