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

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ConnectorTableColumns } from 'components/pages/EdcConnector/edcConnectorTableColumns'
import type { GridCellParams } from '@mui/x-data-grid'
import UserService from 'services/UserService'
import {
  PageHeader,
  Typography,
  PageSnackbar,
  PageLoadingTable,
} from '@catena-x/portal-shared-components'
import PictureWithText from 'components/shared/frame/PictureWithText'
import AddConnectorOverlay from './AddConnectorOverlay'
import type { FormFieldsType } from 'components/pages/EdcConnector/AddConnectorOverlay'
import './EdcConnector.scss'
import type { ConnectorContentAPIResponse } from 'features/connector/types'
import DeleteConfirmationOverlay from './DeleteConfirmationOverlay/DeleteConfirmationOverlay'
import {
  type ConnectorType,
  ConnectorStatusType,
  useCreateConnectorMutation,
  useCreateManagedConnectorMutation,
  useDeleteConnectorMutation,
  ConnectType,
  useFetchConnectorsQuery,
  type ConnectorResponseBody,
  useFetchManagedConnectorsQuery,
} from 'features/connector/connectorApiSlice'
import { ServerResponseOverlay } from 'components/overlays/ServerResponse'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { SuccessErrorType } from 'features/admin/appuserApiSlice'
import { ManagedConnectorTableColumns } from './edcManagedConnectorTableColumns'
import { OwnConnectorTableColumns } from './edcOwnConnectorTableColumns'
import ConfigurationDetailsOverlay from './ConfigurationDetailsOverlay'

const EdcConnector = () => {
  const { t } = useTranslation()
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
      technicalUser: {
        id: '',
        name: '',
        clientId: '',
        description: '',
      },
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
    SuccessErrorType.ERROR | SuccessErrorType.SUCCESS
  >(SuccessErrorType.SUCCESS)
  const [notificationMessage, setNotificationMessage] = useState<string>(
    t('content.edcconnector.snackbar.successmessage')
  )
  const [
    viewConfigurationDetailsOverlayOpen,
    setViewConfigurationDetailsOverlayOpen,
  ] = useState<boolean>(false)

  const onStepChange = () => {
    setAddConnectorOverlayCurrentStep(0)
  }

  const onDelete = (row: ConnectorContentAPIResponse) => {
    setSelectedConnector(row)
    setDeleteConnectorConfirmModalOpen(true)
  }

  const swap = (arry: any, from: number, to: number) => {
    const swapValue = arry[from]
    arry[from] = arry[to]
    arry[to] = swapValue
    return arry
  }

  const rawColumns = ConnectorTableColumns(useTranslation, onDelete) // Common col values for own and managed connectors
  let ownConnectorCols = OwnConnectorTableColumns(useTranslation) // unique col values from own connectors
  let managedConnectorCols = ManagedConnectorTableColumns(useTranslation) // unique col values from managed connectors
  ownConnectorCols.push(...rawColumns)
  ownConnectorCols = swap(ownConnectorCols, 2, 0) //swap position according to the design
  managedConnectorCols.push(...rawColumns)
  managedConnectorCols = swap(managedConnectorCols, 2, 0) //swap position according to the design

  const closeAndResetModalState = () => {
    setAddConnectorOverlayCurrentStep(0)
    setAddConnectorOverlayOpen(false)
  }

  const onTableCellClick = (params: GridCellParams) => {
    // Show overlay only when detail field clicked
    setSelectedConnector(params.row as ConnectorContentAPIResponse)
  }

  const onConfirmClick = (selected: ConnectorType) => {
    setSelectedService(selected)
    setAddConnectorOverlayCurrentStep((prevState) => {
      return prevState < 1 ? 1 : prevState
    })
  }

  const onFormSubmit = async (data: FormFieldsType) => {
    const body = new FormData()
    body.append('Name', data.ConnectorName)
    body.append('ConnectorUrl', data.ConnectorURL)
    body.append('Location', data.ConnectorLocation)
    body.append('Status', ConnectorStatusType.PENDING)
    setLoading(true)
    if (selectedService.type === ConnectType.COMPANY_CONNECTOR) {
      await createConnector(body)
        .unwrap()
        .then(() => {
          showOverlay(true)
        })
        .catch(() => {
          showOverlay(false)
        })
    } else if (selectedService.type === ConnectType.MANAGED_CONNECTOR) {
      // body.append('providerBpn', data.ConnectorBPN)
      body.append('subscriptionId', data.ConnectorSubscriptionId)
      body.append('technicalUserId', '')
      await createManagedConnector(body)
        .unwrap()
        .then(() => {
          showOverlay(true)
        })
        .catch(() => {
          showOverlay(false)
        })
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
    await deleteConnector(selectedConnector.id ?? '')
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
      setNotificationType(SuccessErrorType.ERROR)
      setNotificationMessage(t('content.edcconnector.snackbar.errormessage'))
      setNotificationOpen(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onHelpButtonClicked = () => {
    const url =
      '/documentation/?path=docs%2F02.+Technical+Integration%2F01.+Connector+Registration%2F02.+Connector+Registration.md'
    window.open(url, '_blank')
  }

  return (
    <main className="connector-page-container">
      <PageSnackbar
        description={notificationMessage}
        onCloseNotification={() => {
          setNotificationOpen(false)
        }}
        severity={notificationType}
        open={notificationOpen}
      />
      <DeleteConfirmationOverlay
        openDialog={deleteConnectorConfirmModalOpen}
        handleOverlayClose={() => {
          setDeleteConnectorConfirmModalOpen(false)
        }}
        handleConfirmClick={() => deleteSelectedConnector()}
        loading={loading}
        techUser={selectedConnector?.technicalUser}
      />
      <AddConnectorOverlay
        openDialog={addConnectorOverlayOpen}
        handleOverlayClose={closeAndResetModalState}
        connectorStep={addConnectorOverlayCurrentStep}
        handleConfirmClick={onConfirmClick}
        onFormConfirmClick={(data) => void onFormSubmit(data)}
        loading={loading}
        onStepChange={onStepChange}
      />
      <ConfigurationDetailsOverlay
        openDialog={viewConfigurationDetailsOverlayOpen}
        handleOverlayClose={() => {
          setViewConfigurationDetailsOverlayOpen(false)
        }}
      />
      <PageHeader
        title={t('content.edcconnector.headertitle')}
        topPage={false}
        headerHeight={200}
      />
      <section className={'picture-with-text-section'}>
        <PictureWithText
          text={'content.edcconnector.imagetext'}
          onHelpButtonClicked={() => {
            onHelpButtonClicked()
          }}
          onButtonClicked={() => {
            setAddConnectorOverlayOpen(true)
          }}
          onNewHelpButtonClicked={() => {
            setViewConfigurationDetailsOverlayOpen(true)
          }}
        />
      </section>
      <div className="connector-table-container">
        <PageLoadingTable<ConnectorResponseBody, {}>
          toolbarVariant="premium"
          title={t('content.edcconnector.tabletitle')}
          loadLabel={t('global.actions.more')}
          fetchHook={useFetchConnectorsQuery}
          fetchHookRefresh={refresh}
          getRowId={(row: { [key: string]: string }) => row.id}
          columns={ownConnectorCols}
          onCellClick={(params: GridCellParams) => {
            onTableCellClick(params)
          }}
        />
      </div>
      <div className="connector-table-container">
        <PageLoadingTable<ConnectorResponseBody, {}>
          toolbarVariant="premium"
          title={t('content.edcconnector.managedtabletitle')}
          loadLabel={t('global.actions.more')}
          fetchHook={useFetchManagedConnectorsQuery}
          fetchHookRefresh={refresh}
          getRowId={(row: { [key: string]: string }) => row.id}
          columns={managedConnectorCols}
          noRowsMsg={t('content.edcconnector.noConnectorsMessage')}
          onCellClick={(params: GridCellParams) => {
            onTableCellClick(params)
          }}
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
