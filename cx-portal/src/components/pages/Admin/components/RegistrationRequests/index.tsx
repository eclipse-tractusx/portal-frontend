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

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Typography,
  PageHeader,
  PageSnackbar,
} from 'cx-portal-shared-components'
import { useDispatch } from 'react-redux'
import { fetchCompanyDetail } from 'features/admin/registration/actions'
import './RegistrationRequests.scss'
import { GridCellParams } from '@mui/x-data-grid'
import CompanyDetailOverlay from './CompanyDetailOverlay'
import ConfirmationOverlay from './ConfirmationOverlay/ConfirmationOverlay'
import {
  useApproveRequestMutation,
  useDeclineRequestMutation,
  useFetchCompanySearchQuery,
  useFetchDocumentByIdMutation,
  useUpdateBPNMutation,
} from 'features/admin/applicationRequestApiSlice'
import { RequestList } from './components/RequestList'
import { download } from 'utils/downloadUtils'
import { ServerResponseOverlay } from 'components/overlays/ServerResponse'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import AddBpnOveraly from './ConfirmationOverlay/AddBpnOverlay'

export default function RegistrationRequests() {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const [overlayOpen, setOverlayOpen] = useState<boolean>(false)

  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false)

  const [selectedRequestId, setSelectedRequestId] = useState<string>()
  const [actionType, setActionType] = useState<string>('approve')

  const [expr, setExpr] = useState<string>('')

  const [approveRequest] = useApproveRequestMutation()
  const [declineRequest] = useDeclineRequestMutation()
  const [getDocumentById] = useFetchDocumentByIdMutation()

  const [updateBpn] = useUpdateBPNMutation()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [showErrorAlert, setShowErrorAlert] = useState<string>('')

  const [loaded, setLoaded] = useState<number>(0)

  const [enableBpnInput, setEnableBpnInput] = useState<boolean>(false)

  const [successOverlay, setSuccessOverlay] = useState(false)
  const [errorOverlay, setErrorOverlay] = useState(false)

  const onTableCellClick = (params: GridCellParams) => {
    // Show overlay only when detail field clicked
    if (params.field === 'detail') {
      dispatch(fetchCompanyDetail(params.row.applicationId))
      setOverlayOpen(true)
    }
  }

  const onApproveClick = (id: string) => {
    setConfirmModalOpen(true)
    setSelectedRequestId(id)
  }

  const onDeclineClick = (id: string) => {
    setConfirmModalOpen(true)
    setActionType('decline')
    setSelectedRequestId(id)
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
        .then((payload) => console.log('fulfilled', payload))
        .catch((error) => setShowErrorAlert(error.data.title))
    } else if (actionType === 'decline' && selectedRequestId) {
      await declineRequest(selectedRequestId)
        .unwrap()
        .then((payload) => console.log('fulfilled', payload))
        .catch((error) => setShowErrorAlert(error.data.title))
    }
    setLoaded(Date.now())
    setIsLoading(false)
  }

  const handleDownloadClick = async (
    documentId: string,
    documentType: string
  ) => {
    try {
      const response = await getDocumentById(documentId).unwrap()

      const fileType = response.headers.get('content-type')
      const file = response.data

      return download(file, fileType, documentType)
    } catch (error) {
      console.error(error, 'ERROR WHILE FETCHING DOCUMENT')
    }
  }

  const onUpdateBpn = async (bpn: string) => {
    setIsLoading(true)
    await updateBpn({ bpn: bpn, applicationId: selectedRequestId })
      .unwrap()
      .then((payload) => {
        setEnableBpnInput(false)
        setSuccessOverlay(true)
        setLoaded(Date.now())
      })
      .catch((error) => {
        setEnableBpnInput(false)
        setErrorOverlay(true)
      })
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
        vertical={'bottom'}
        horizontal={'left'}
      />
      <CompanyDetailOverlay
        {...{
          openDialog: overlayOpen,
          handleOverlayClose: () => setOverlayOpen(false),
        }}
      />
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
      <AddBpnOveraly
        openDialog={enableBpnInput}
        isLoading={isLoading}
        handleOverlayClose={() => {
          setIsLoading(false)
          setEnableBpnInput(false)
        }}
        handleConfirmClick={(bpn: string) => onUpdateBpn(bpn)}
      />

      {/* Page header title and background color */}
      <PageHeader
        title={t('content.admin.registration-requests.headertitle')}
        topPage={false}
        headerHeight={200}
      />

      {/* Adding additional text to introduce the page function */}
      <div className={'padding-r-80'}>
        <Typography variant="body2" mt={3} align="center">
          {t('content.admin.registration-requests.introText1')}
        </Typography>
        <Typography variant="body2" mb={3} align="center">
          {t('content.admin.registration-requests.introText2')}
        </Typography>
      </div>

      {/* Table component */}
      <div className={'table-container'}>
        <RequestList
          fetchHook={useFetchCompanySearchQuery}
          fetchHookArgs={{ expr }}
          onSearch={setExpr}
          onApproveClick={onApproveClick}
          onDeclineClick={onDeclineClick}
          isLoading={isLoading}
          onTableCellClick={onTableCellClick}
          loaded={loaded}
          handleDownloadDocument={handleDownloadClick}
          searchExpr={expr}
          showConfirmOverlay={(id: string) => {
            setSelectedRequestId(id)
            setEnableBpnInput(true)
            setSuccessOverlay(false)
            setErrorOverlay(false)
          }}
        />
      </div>
    </main>
  )
}
