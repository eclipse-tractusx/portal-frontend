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

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, PageSnackbar } from '@catena-x/portal-shared-components'
import { useDispatch } from 'react-redux'
import { fetchCompanyDetail } from 'features/admin/registration/actions'
import './RegistrationRequests.scss'
import type { GridCellParams } from '@mui/x-data-grid'
import CompanyDetailOverlay from './CompanyDetailOverlay'
import ConfirmationOverlay from './ConfirmationOverlay/ConfirmationOverlay'
import {
  type ApplicationRequest,
  useApproveRequestMutation,
  useDeclineChecklistMutation,
  useFetchCompanySearchQuery,
  useUpdateBPNMutation,
} from 'features/admin/applicationRequestApiSlice'
import { RequestList } from './components/RequestList'
import { ServerResponseOverlay } from 'components/overlays/ServerResponse'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import AddBpnOveraly from './ConfirmationOverlay/AddBpnOverlay'
import ConfirmCancelOverlay from './ConfirmationOverlay/ConfirmCancelOverlay'
import type { AppDispatch } from 'features/store'

enum TableField {
  DETAIL = 'detail',
  STATUS = 'status',
}

export default function RegistrationRequests() {
  const { t } = useTranslation()

  const dispatch = useDispatch<AppDispatch>()

  const [overlayOpen, setOverlayOpen] = useState<boolean>(false)

  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false)

  const [selectedRequestId, setSelectedRequestId] = useState<string>()
  const [selectedRequest, setSelectedRequest] = useState<ApplicationRequest>()
  const [actionType, setActionType] = useState<string>('approve')

  const [approveRequest] = useApproveRequestMutation()
  const [declineRequest] = useDeclineChecklistMutation()

  const [updateBpn] = useUpdateBPNMutation()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [showErrorAlert, setShowErrorAlert] = useState<string>('')

  const [loaded, setLoaded] = useState<number>(0)

  const [enableBpnInput, setEnableBpnInput] = useState<boolean>(false)

  const [successOverlay, setSuccessOverlay] = useState<boolean>(false)
  const [errorOverlay, setErrorOverlay] = useState<boolean>(false)

  const [confirmCancelModalOpen, setConfirmCancelModalOpen] =
    useState<boolean>(false)
  const [selectedRequestName, setSelectedRequestName] = useState<string>('')
  const [selectedActiveTab, setSelectedActiveTab] = useState<number>(0)
  const onTableCellClick = (params: GridCellParams) => {
    // Show overlay only when detail field clicked
    if (
      params.field === TableField.DETAIL ||
      params.field === TableField.STATUS
    ) {
      setSelectedRequestId(params.row.applicationId)
      setSelectedRequest(params.row)
      dispatch(fetchCompanyDetail(params.row.applicationId))
      setOverlayOpen(true)
      setSelectedActiveTab(params.field === TableField.DETAIL ? 0 : 2)
    }
  }

  const onErrorAlertClose = () => {
    setShowErrorAlert('')
  }

  const makeActionSelectedRequest = async () => {
    setIsLoading(true)
    setConfirmModalOpen(false)
    if (actionType === 'approve' && selectedRequestId) {
      await approveRequest(selectedRequestId)
        .unwrap()
        .then((payload) => {
          console.log('fulfilled', payload)
        })
        .catch((error) => {
          setShowErrorAlert(error.data.title)
        })
    } else if (actionType === 'decline' && selectedRequestId) {
      await declineRequest({
        applicationId: selectedRequestId,
        comment: '',
      })
        .unwrap()
        .then((payload) => {
          console.log('fulfilled', payload)
        })
        .catch((error) => {
          setShowErrorAlert(error.data.title)
        })
    }
    setLoaded(Date.now())
    setIsLoading(false)
  }

  const onUpdateBpn = async (bpn: string) => {
    setIsLoading(true)
    await updateBpn({ bpn, applicationId: selectedRequestId })
      .unwrap()
      .then(() => {
        setEnableBpnInput(false)
        setSuccessOverlay(true)
        setLoaded(Date.now())
      })
      .catch(() => {
        setEnableBpnInput(false)
        setErrorOverlay(true)
      })
    setIsLoading(false)
  }

  const onConfirmationCancel = (id: string, name: string) => {
    setSelectedRequestName(name)
    setActionType('decline')
    setSelectedRequestId(id)
    setConfirmCancelModalOpen(true)
  }

  return (
    <main className="page-main-container">
      <PageSnackbar
        open={showErrorAlert !== ''}
        onCloseNotification={onErrorAlertClose}
        severity="error"
        title={t('content.semantichub.alerts.alertErrorTitle')}
        description={showErrorAlert}
        showIcon={true}
      />
      {overlayOpen && (
        <CompanyDetailOverlay
          {...{
            openDialog: overlayOpen,
            selectedRequest,
            selectedRequestId,
            selectedActiveTab,
            handleOverlayClose: () => {
              setOverlayOpen(false)
            },
          }}
        />
      )}
      {successOverlay && (
        <ServerResponseOverlay
          title={t('content.admin.registration-requests.addBpn.successTitle')}
          intro={t(
            'content.admin.registration-requests.addBpn.successDescription'
          )}
          dialogOpen={true}
        >
          <Typography variant="body2"></Typography>
        </ServerResponseOverlay>
      )}
      {errorOverlay && (
        <ServerResponseOverlay
          title={t('content.admin.registration-requests.addBpn.errorTitle')}
          intro={t(
            'content.admin.registration-requests.addBpn.errorDescription'
          )}
          dialogOpen={true}
          iconComponent={
            <ErrorOutlineIcon sx={{ fontSize: 60 }} color="error" />
          }
        >
          <Typography variant="body2"></Typography>
        </ServerResponseOverlay>
      )}
      <ConfirmationOverlay
        openDialog={confirmModalOpen}
        handleOverlayClose={() => {
          setIsLoading(false)
          setConfirmModalOpen(false)
        }}
        handleConfirmClick={() => makeActionSelectedRequest()}
      />
      <ConfirmCancelOverlay
        openDialog={confirmCancelModalOpen}
        handleOverlayClose={() => {
          setIsLoading(false)
          setConfirmCancelModalOpen(false)
        }}
        handleConfirmClick={(title: string) => {
          setConfirmCancelModalOpen(false)
          setLoaded(Date.now())
          if (title !== '') setShowErrorAlert(title)
        }}
        companyName={selectedRequestName}
        selectedRequestId={selectedRequestId}
      />
      <AddBpnOveraly
        openDialog={enableBpnInput}
        isLoading={isLoading}
        handleOverlayClose={() => {
          setIsLoading(false)
          setEnableBpnInput(false)
        }}
        handleConfirmClick={(bpn: string) => void onUpdateBpn(bpn)}
      />

      <div
        style={{
          marginTop: '60px',
        }}
      >
        <Typography className="newTitle" variant="h2">
          {t('content.admin.registration-requests.headertitle')}
        </Typography>
        <Typography
          className="subTitle"
          variant="body1"
          sx={{
            fontSize: '36px',
          }}
        >
          {t('content.admin.registration-requests.headersubtitle')}
        </Typography>
      </div>

      {/* Table component */}
      <div className={'table-container'}>
        <RequestList
          fetchHook={useFetchCompanySearchQuery}
          onTableCellClick={onTableCellClick}
          loaded={loaded}
          showConfirmOverlay={(id: string) => {
            setSelectedRequestId(id)
            setEnableBpnInput(true)
            setSuccessOverlay(false)
            setErrorOverlay(false)
            setIsLoading(false)
          }}
          onConfirmationCancel={(id: string, name: string) => {
            onConfirmationCancel(id, name)
          }}
        />
      </div>
    </main>
  )
}
