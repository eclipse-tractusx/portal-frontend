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

import { type SyntheticEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ConnectorTableColumns } from 'components/pages/EdcConnector/edcConnectorTableColumns'
import type { GridCellParams, GridColDef } from '@mui/x-data-grid'
import UserService from 'services/UserService'
import {
  Typography,
  PageSnackbar,
  PageLoadingTable,
  Button,
  IconButton,
  Tabs,
  Tab,
  TabPanel,
} from '@catena-x/portal-shared-components'
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
  type ConnectorDetailsType,
} from 'features/connector/connectorApiSlice'
import { ServerResponseOverlay } from 'components/overlays/ServerResponse'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { SuccessErrorType } from 'features/admin/appuserApiSlice'
import { ManagedConnectorTableColumns } from './edcManagedConnectorTableColumns'
import { OwnConnectorTableColumns } from './edcOwnConnectorTableColumns'
import ConfigurationDetailsOverlay from './ConfigurationDetailsOverlay'
import {
  ServiceAccountType,
  useAddServiceAccountMutation,
  useFetchServiceAccountRolesQuery,
} from 'features/admin/serviceApiSlice'
import ConnectorDetailsOverlay from './ConnectorDetailsOverlay'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Box } from '@mui/material'

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
      location: '',
      type: '',
      providerCompanyName: '',
      selfDescriptionDocumentId: '',
      status: '',
      technicalUser: {
        id: '',
        name: '',
        clientId: '',
        description: '',
      },
    })
  const token = UserService.getToken()
  const [selectedService, setSelectedService] = useState<ConnectorType>({})
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
  const [addServiceAccount] = useAddServiceAccountMutation()
  const roles = useFetchServiceAccountRolesQuery().data
  const [role, setRole] = useState('')
  const [newUserLoading, setNewUserLoading] = useState<boolean>(false)
  const [newUserSuccess, setNewUserSuccess] = useState<boolean>(false)
  const [serviceAccId, setServiceAccId] = useState('')
  const [openDetailsOverlay, setOpenDetailsOverlay] = useState(false)
  const [overlayData, setOverlayData] = useState<ConnectorDetailsType>()
  const [activeTab, setActiveTab] = useState<number>(0)

  useEffect(() => {
    if (roles && roles.length > 0)
      setRole(
        roles?.filter((i) => i.roleName === 'Identity Wallet Management')[0]
          .roleId
      )
  }, [roles])

  const onStepChange = () => {
    setAddConnectorOverlayCurrentStep(0)
  }

  const onDelete = (row: ConnectorContentAPIResponse) => {
    setSelectedConnector(row)
    setDeleteConnectorConfirmModalOpen(true)
  }

  const swap = (arry: Array<GridColDef>, from: number, to: number) => {
    const swapValue = arry[from]
    arry[from] = arry[to]
    arry[to] = swapValue
    return arry
  }

  const rawColumns = ConnectorTableColumns(onDelete) // Common col values for own and managed connectors
  let ownConnectorCols = OwnConnectorTableColumns() // unique col values from own connectors
  let managedConnectorCols = ManagedConnectorTableColumns() // unique col values from managed connectors
  ownConnectorCols.push(...rawColumns)
  ownConnectorCols = swap(ownConnectorCols, 2, 0) //swap position according to the design
  managedConnectorCols.push(...rawColumns)
  managedConnectorCols = swap(managedConnectorCols, 2, 0) //swap position according to the design

  const closeAndResetModalState = () => {
    setAddConnectorOverlayCurrentStep(0)
    setAddConnectorOverlayOpen(false)
  }

  const onTableCellClick = (params: GridCellParams, title: string) => {
    // Show overlay only when detail field clicked
    if (
      params.field === 'details' &&
      title === t('content.edcconnector.tabletitle')
    ) {
      setOpenDetailsOverlay(true)
      setOverlayData(params.row)
    }

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
      body.append(
        'TechnicalUserId',
        serviceAccId === '' ? data.ConnectorTechnicalUser : serviceAccId
      )
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
          !setNewUserSuccess && showOverlay(false)
        })
    }
  }

  const onSubmitClick = async (data: FormFieldsType) => {
    const body = new FormData()
    body.append('name', data.TechnicalUserName)
    body.append('description', data.TechnicalUserDescription)
    body.append('authenticationType', ServiceAccountType.SECRET)
    body.append('roleIds', role)
    setNewUserLoading(true)
    await addServiceAccount({
      name: data.TechnicalUserName,
      description: data.TechnicalUserDescription,
      authenticationType: ServiceAccountType.SECRET,
      roleIds: [role],
    })
      .unwrap()
      .then((res) => {
        setServiceAccId(res[0].serviceAccountId)
        setNewUserSuccess(true)
      })
      .catch(() => {
        showOverlay(false)
      })
    setNewUserLoading(false)
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
  }, [])

  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setActiveTab(newValue)
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
      <ConnectorDetailsOverlay
        openDialog={openDetailsOverlay}
        handleOverlayClose={() => {
          setOpenDetailsOverlay(false)
        }}
        overlayData={overlayData}
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
        onSubmitClick={(data) => void onSubmitClick(data)}
        loading={loading}
        newUserLoading={newUserLoading}
        newUserSuccess={newUserSuccess}
        onStepChange={onStepChange}
      />
      <ConfigurationDetailsOverlay
        openDialog={viewConfigurationDetailsOverlayOpen}
        handleOverlayClose={() => {
          setViewConfigurationDetailsOverlayOpen(false)
        }}
      />
      <section>
        <div className="edc-connector-header">
          <Typography variant="h2" className="edc-connector-title">
            {t('content.edcconnector.headertitle')}
          </Typography>
          <Typography variant="body2" className="edc-connector-desc">
            {t('content.edcconnector.desc')}
          </Typography>
          <Box
            sx={{
              position: 'relative',
              height: '100%',
              width: '90%',
              background: '#F4FBFD',
              margin: 'auto',
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body3">
                {t('content.edcconnector.subDesc1')}
              </Typography>
              <Typography variant="body3">
                {t('content.edcconnector.subDesc2')}
              </Typography>
              <Typography variant="body3">
                {t('content.edcconnector.subDesc3')}
              </Typography>
              <Typography variant="body3">
                {' '}
                {t('content.edcconnector.subDesc4')}{' '}
              </Typography>
            </Box>
            <IconButton
              aria-label="close"
              onClick={() => {
                setViewConfigurationDetailsOverlayOpen(true)
              }}
              sx={{
                right: '0',
                position: 'absolute',
                top: '50%',
                msTransform: 'translateY(-50%)',
                transform: 'translateY(-50%)',
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Box>

          <div>
            <Button
              size="small"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => {
                setAddConnectorOverlayOpen(true)
              }}
              className="add-idp-btn"
            >
              {t('content.edcconnector.addconnectorbutton')}
            </Button>
          </div>
        </div>
      </section>

      <Box>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          className="connector-table-container"
          sx={{ mb: 1 }}
        >
          <Tab
            sx={{
              width: '100%',
              maxWidth: '550px',
              '&.Mui-selected': {
                borderBottom: '3px solid #0f71cb',
              },
              textTransform: 'none',
              display: 'inline-flex',
            }}
            label={t('content.edcconnector.tabletitle')}
            id={`simple-tab-${activeTab}`}
            aria-controls={`simple-tabpanel-${activeTab}`}
          />
          <Tab
            sx={{
              width: '100%',
              maxWidth: '550px',
              '&.Mui-selected': {
                borderBottom: '3px solid #0f71cb',
              },
              textTransform: 'none',
              display: 'inline-flex',
            }}
            label={t('content.edcconnector.managedtabletitle')}
            id={`simple-tab-${activeTab}`}
            aria-controls={`simple-tabpanel-${activeTab}`}
          />
        </Tabs>
        <TabPanel value={activeTab} index={0}>
          <div className="connector-table-container">
            <PageLoadingTable<ConnectorResponseBody, unknown>
              toolbarVariant="premium"
              title={t('content.edcconnector.tabletitle')}
              loadLabel={t('global.actions.more')}
              fetchHook={useFetchConnectorsQuery}
              fetchHookRefresh={refresh}
              getRowId={(row: { [key: string]: string }) => row.id}
              columns={ownConnectorCols}
              onCellClick={(params: GridCellParams) => {
                onTableCellClick(params, t('content.edcconnector.tabletitle'))
              }}
            />
          </div>
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <div className="connector-table-container">
            <PageLoadingTable<ConnectorResponseBody, unknown>
              toolbarVariant="premium"
              title={t('content.edcconnector.managedtabletitle')}
              loadLabel={t('global.actions.more')}
              fetchHook={useFetchManagedConnectorsQuery}
              fetchHookRefresh={refresh}
              getRowId={(row: { [key: string]: string }) => row.id}
              columns={managedConnectorCols}
              noRowsMsg={t('content.edcconnector.noConnectorsMessage')}
              onCellClick={(params: GridCellParams) => {
                onTableCellClick(
                  params,
                  t('content.edcconnector.managedtabletitle')
                )
              }}
            />
          </div>
        </TabPanel>
      </Box>
      {response && (
        <ServerResponseOverlay
          title={getSuccessTitle()}
          intro={getSuccessIntro()}
          dialogOpen={true}
          handleCallback={() => {
            // do nothing
          }}
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
          handleCallback={() => {
            // do nothing
          }}
        >
          <Typography variant="body2"></Typography>
        </ServerResponseOverlay>
      )}
    </main>
  )
}

export default EdcConnector
