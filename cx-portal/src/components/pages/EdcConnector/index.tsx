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

import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { ConnectorTableColumns } from 'components/pages/EdcConnector/edcConnectorTableColumns'
import { GridCellParams } from '@mui/x-data-grid'
import UserService from 'services/UserService'
import {
  Button,
  Table,
  PageHeader,
  PageSnackbar,
} from 'cx-portal-shared-components'
import connectorSlice, { connectorSelector } from 'features/connector/slice'
import {
  createConnector,
  deleteConnector,
  fetchConnectors,
} from 'features/connector/actions'
import SubHeaderTitle from 'components/shared/frame/SubHeaderTitle'
import PictureWithText from 'components/shared/frame/PictureWithText'
import AddConnectorOverlay from './AddConnectorOverlay'
import { FormFieldsType } from 'components/pages/EdcConnector/AddConnectorOverlay'
import './EdcConnector.scss'
import { ConnectorContentAPIResponse } from 'features/connector/types'
import DeleteConfirmationOverlay from './DeleteConfirmationOverlay/DeleteConfirmationOverlay'
import uniqueId from 'lodash/uniqueId'

const EdcConnector = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const columns = ConnectorTableColumns(useTranslation)
  const [addConnectorOverlayOpen, setAddConnectorOverlayOpen] =
    useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [addConnectorOverlayCurrentStep, setAddConnectorOverlayCurrentStep] =
    useState<number>(0)
  const [pageSize] = useState<number>(15)
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false)
  const [notificationType, setNotificationType] = useState<
    'error' | 'warning' | 'info' | 'success'
  >('success')
  const [notificationMessage, setNotificationMessage] = useState<string>(
    t('content.edcconnector.snackbar.successmessage')
  )
  const [deleteConnectorConfirmModalOpen, setDeleteConnectorConfirmModalOpen] =
    useState<boolean>(false)
  const [selectedConnector, setSelectedConnector] =
    useState<ConnectorContentAPIResponse>({
      id: '',
      name: '',
      type: '',
    })

  const token = UserService.getToken()
  const { connectorList, loading, paginationData, error } =
    useSelector(connectorSelector)

  useEffect(() => {
    if (token) {
      const params = { size: pageSize, page: currentPage }
      dispatch(fetchConnectors({ params, token }))
    }

    if (error) {
      setNotificationType('error')
      setNotificationMessage(t('content.edcconnector.snackbar.errormessage'))
      setNotificationOpen(true)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, pageSize, currentPage, error])

  // Reset store data when page init
  useEffect(() => {
    dispatch(connectorSlice.actions.resetConnectorState())
  }, [dispatch])

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

  const onConfirmClick = () => {
    setAddConnectorOverlayCurrentStep((prevState) => {
      return prevState < 1 ? 1 : prevState
    })
  }

  const onFormSubmit = async (data: FormFieldsType) => {
    closeAndResetModalState()
    await dispatch(
      createConnector({
        body: {
          name: data.ConnectorName,
          connectorUrl: data.ConnectorURL,
          type: 'COMPANY_CONNECTOR',
        },
      })
    )
    // After create new connector, current page should reset to initial page
    await dispatch(connectorSlice.actions.resetConnectorState())

    const params = { size: pageSize, page: 0 }
    dispatch(fetchConnectors({ params, token }))
  }

  const handleSnackbarClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setNotificationOpen(false)
  }

  const deleteSelectedConnector = async () => {
    await dispatch(deleteConnector({ connectorID: selectedConnector.id || '' }))
    // After create new connector, current page should reset to initial page
    dispatch(connectorSlice.actions.resetConnectorState())
    const params = { size: pageSize, page: 0 }
    dispatch(fetchConnectors({ params, token }))
    closeAndResetModalState()
    setDeleteConnectorConfirmModalOpen(false)
  }

  return (
    <main className="connector-page-container">
      <PageSnackbar
        description={notificationMessage}
        vertical="bottom"
        horizontal="right"
        onCloseNotification={handleSnackbarClose}
        severity={notificationType}
        open={notificationOpen}
      />
      <DeleteConfirmationOverlay
        openDialog={deleteConnectorConfirmModalOpen}
        handleOverlayClose={() => setDeleteConnectorConfirmModalOpen(false)}
        handleConfirmClick={() => deleteSelectedConnector()}
      />
      <AddConnectorOverlay
        openDialog={addConnectorOverlayOpen}
        handleOverlayClose={closeAndResetModalState}
        connectorStep={addConnectorOverlayCurrentStep}
        handleConfirmClick={onConfirmClick}
        onFormConfirmClick={onFormSubmit}
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
        <Table
          {...{
            rows: connectorList,
            rowsCount: paginationData.totalElements,
            columns: columns,
            title: t('content.edcconnector.tabletitle'),
            rowHeight: 100,
            hideFooter: true,
            disableColumnFilter: true,
            disableColumnMenu: true,
            disableColumnSelector: true,
            disableDensitySelector: true,
            disableSelectionOnClick: true,
            toolbarVariant: 'basic',
            onCellClick: (params: GridCellParams) => onTableCellClick(params),
            loading,
          }}
          getRowId={(row) => uniqueId(row.id)}
        />
      </div>
      <div className="load-more-button-container">
        {paginationData.totalElements > pageSize * (currentPage + 1) &&
          paginationData.totalElements! > pageSize && (
            <Button
              size="medium"
              onClick={() => setCurrentPage((prevState) => prevState + 1)}
            >
              {t('content.partnernetwork.loadmore')}
            </Button>
          )}
      </div>
    </main>
  )
}

export default EdcConnector
