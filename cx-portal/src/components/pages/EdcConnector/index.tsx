/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
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

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ConnectorTableColumns } from 'components/pages/EdcConnector/edcConnectorTableColumns'
import { GridCellParams } from '@mui/x-data-grid'
import UserService from 'services/UserService'
import {
  PageHeader,
  Typography,
  PageLoadingTable,
  PageSnackbar,
} from 'cx-portal-shared-components'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'
import PictureWithText from 'components/shared/frame/PictureWithText'
import AddConnectorOverlay from './AddConnectorOverlay'
import { FormFieldsType } from 'components/pages/EdcConnector/AddConnectorOverlay'
import './EdcConnector.scss'
import { ConnectorContentAPIResponse } from 'features/connector/types'
import DeleteConfirmationOverlay from './DeleteConfirmationOverlay/DeleteConfirmationOverlay'
import {
  ConnectorType,
  ConnectorStatusType,
  useCreateConnectorMutation,
  useCreateManagedConnectorMutation,
  useDeleteConnectorMutation,
  ConnectType,
  useFetchConnectorsQuery,
  ConnectorResponseBody,
} from 'features/connector/connectorApiSlice'
import { ServerResponseOverlay } from 'components/overlays/ServerResponse'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const EdcConnector = () => {
  const { t } = useTranslation()
  const columns = ConnectorTableColumns(useTranslation)
  const [addConnectorOverlayOpen, setAddConnectorOverlayOpen] =
    useState<boolean>(false)
  const [addConnectorOverlayCurrentStep, setAddConnectorOverlayCurrentStep] =
    useState<number>(0)
  const [deleteConnectorConfirmModalOpen, setDeleteConnectorConfirmModalOpen] =
    useState<boolean>(false)
  const [selectedConnector, setSelectedConnector] =
    useState<ConnectorContentAPIResponse>({
      id: '',
      name: '',
      type: '',
    })
  const token = UserService.getToken()
  const [selectedService, setSelectedService] = useState<any>({})
  const [createConnector] = useCreateConnectorMutation()
  const [createManagedConnector] = useCreateManagedConnectorMutation()
  const [deleteConnector] = useDeleteConnectorMutation()
  const [refresh, setRefresh] = useState<number>(0)
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<boolean>(false)
  const [action, setAction] = useState<string>('create')
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false)
  const [notificationType, setNotificationType] = useState<
    'error' | 'warning' | 'info' | 'success'
  >('success')
  const [notificationMessage, setNotificationMessage] = useState<string>(
    t('content.edcconnector.snackbar.successmessage')
  )

  const closeAndResetModalState = () => {
    setAddConnectorOverlayCurrentStep(0)
    setAddConnectorOverlayOpen(false)
  }

  const onTableCellClick = (params: GridCellParams) => {
    // Show overlay only when detail field clicked
    if (params.field === 'detail') {
      setSelectedConnector(params.row as ConnectorContentAPIResponse)
      setDeleteConnectorConfirmModalOpen(true)
    }
  }

  const onConfirmClick = (selected: ConnectorType) => {
    setSelectedService(selected)
    setAddConnectorOverlayCurrentStep((prevState) => {
      return prevState < 1 ? 1 : prevState
    })
  }

  const onFormSubmit = async (data: FormFieldsType) => {
    setLoading(true)
    if (selectedService.type === ConnectType.COMPANY_CONNECTOR) {
      const body = {
        name: data.ConnectorName,
        connectorUrl: data.ConnectorURL,
        location: data.ConnectorLocation,
        status: ConnectorStatusType.PENDING,
      }
      await createConnector(body)
        .unwrap()
        .then(() => showOverlay(true))
        .catch(() => showOverlay(false))
    } else if (selectedService.type === ConnectType.MANAGED_CONNECTOR) {
      const body = {
        name: data.ConnectorName,
        connectorUrl: data.ConnectorURL,
        location: data.ConnectorLocation,
        providerBpn: data.ConnectorBPN,
        status: ConnectorStatusType.PENDING,
      }
      await createManagedConnector(body)
        .unwrap()
        .then(() => showOverlay(true))
        .catch(() => showOverlay(false))
    }
  }

  const showOverlay = (result: boolean) => {
    setLoading(false)
    closeAndResetModalState()
    if (result) {
      setResponse(true)
      setRefresh(Date.now())
    } else {
      setError(true)
    }
  }

  const deleteSelectedConnector = async () => {
    setAction('delete')
    setLoading(true)
    await deleteConnector(selectedConnector.id || '')
      .unwrap()
      .then(() => {
        setDeleteConnectorConfirmModalOpen(false)
        showOverlay(true)
      })
      .catch(() => {
        setDeleteConnectorConfirmModalOpen(false)
        showOverlay(false)
      })
  }

  const isCreate = () => {
    return action === 'create'
  }

  const getSuccessTitle = () => {
    if (isCreate()) {
      return t('content.edcconnector.modal.create.successTitle')
    } else {
      return t('content.edcconnector.modal.delete.successTitle')
    }
  }

  const getErrorTitle = () => {
    if (isCreate()) {
      return t('content.edcconnector.modal.create.errorTitle')
    } else {
      return t('content.edcconnector.modal.delete.errorTitle')
    }
  }

  const getSuccessIntro = () => {
    if (isCreate()) {
      return t('content.edcconnector.modal.create.successDescription')
    } else {
      return t('content.edcconnector.modal.delete.successDescription')
    }
  }

  const getErrorIntro = () => {
    if (isCreate()) {
      return t('content.edcconnector.modal.create.errorDescription')
    } else {
      return t('content.edcconnector.modal.delete.errorDescription')
    }
  }

  useEffect(() => {
    if (!token) {
      setNotificationType('error')
      setNotificationMessage(t('content.edcconnector.snackbar.errormessage'))
      setNotificationOpen(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="connector-page-container">
      <PageSnackbar
        description={notificationMessage}
        vertical="bottom"
        horizontal="right"
        onCloseNotification={() => setNotificationOpen(false)}
        severity={notificationType}
        open={notificationOpen}
      />
      <DeleteConfirmationOverlay
        openDialog={deleteConnectorConfirmModalOpen}
        handleOverlayClose={() => setDeleteConnectorConfirmModalOpen(false)}
        handleConfirmClick={() => deleteSelectedConnector()}
        loading={loading}
      />
      <AddConnectorOverlay
        openDialog={addConnectorOverlayOpen}
        handleOverlayClose={closeAndResetModalState}
        connectorStep={addConnectorOverlayCurrentStep}
        handleConfirmClick={onConfirmClick}
        onFormConfirmClick={onFormSubmit}
        loading={loading}
      />
      <PageHeader
        title={t('content.edcconnector.headertitle')}
        topPage={false}
        headerHeight={200}
      />
      <section>
        <SubHeaderTitle title={'content.edcconnector.subheadertitle'} />
      </section>
      <section className={'picture-with-text-section'}>
        <PictureWithText
          text={'content.edcconnector.imagetext'}
          onButtonClicked={() => setAddConnectorOverlayOpen(true)}
        />
      </section>
      <div className="partner-network-table-container">
        <PageLoadingTable<ConnectorResponseBody>
          toolbarVariant="premium"
          title={t('content.edcconnector.tabletitle')}
          loadLabel={t('global.actions.more')}
          fetchHook={useFetchConnectorsQuery}
          fetchHookRefresh={refresh}
          getRowId={(row: { [key: string]: string }) => row.id}
          columns={columns}
          onCellClick={(params: GridCellParams) => onTableCellClick(params)}
        />
      </div>
      {response && (
        <ServerResponseOverlay
          title={getSuccessTitle()}
          intro={getSuccessIntro()}
          dialogOpen={true}
          handleCallback={() => {}}
        >
          <Typography variant="body2"></Typography>
        </ServerResponseOverlay>
      )}
      {error && (
        <ServerResponseOverlay
          title={getErrorTitle()}
          intro={getErrorIntro()}
          dialogOpen={true}
          iconComponent={
            <ErrorOutlineIcon sx={{ fontSize: 60 }} color="error" />
          }
          handleCallback={() => {}}
        >
          <Typography variant="body2"></Typography>
        </ServerResponseOverlay>
      )}
    </main>
  )
}

export default EdcConnector
