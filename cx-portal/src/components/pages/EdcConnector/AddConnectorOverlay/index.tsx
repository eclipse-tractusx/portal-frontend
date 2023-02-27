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

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  Button,
  DialogActions,
  DialogHeader,
  CircleProgress,
} from 'cx-portal-shared-components'
import ConnectorTypeSelection from './components/ConnectorTypeSelection'
import ConnectorInsertForm from './components/ConnectorInsertForm'
import { useForm } from 'react-hook-form'
import { ConnectorType } from 'features/connector/connectorApiSlice'
import Box from '@mui/material/Box'

interface AddCollectorOverlayProps {
  openDialog?: boolean
  connectorStep: number
  handleOverlayClose: () => void
  handleConfirmClick: (data: ConnectorType) => void
  onFormConfirmClick: (data: FormFieldsType) => void
  loading?: boolean
  onStepChange: () => void
}

export type FormFieldsType = {
  ConnectorName: string
  ConnectorURL: string
  ConnectorBPN: string
  ConnectorLocation: string
  ConnectorDoc: any
}

const formFields = {
  ConnectorName: '',
  ConnectorURL: '',
  ConnectorBPN: '',
  ConnectorLocation: '',
  ConnectorDoc: '',
}

const AddConnectorOverlay = ({
  openDialog = false,
  connectorStep,
  handleOverlayClose,
  handleConfirmClick,
  onFormConfirmClick,
  loading,
  onStepChange,
}: AddCollectorOverlayProps) => {
  const { t } = useTranslation()

  const {
    handleSubmit,
    getValues,
    control,
    trigger,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: formFields,
    mode: 'onChange',
  })

  const [selected, setSelected] = useState<ConnectorType>({})

  const onFormSubmit = async () => {
    const validateFields = await trigger([
      'ConnectorName',
      'ConnectorURL',
      'ConnectorBPN',
      'ConnectorDoc',
    ])
    if (validateFields) {
      onFormConfirmClick(getValues() as FormFieldsType)
    }
  }

  const onSelect = (service: ConnectorType) => {
    setSelected(service)
  }

  return (
    <div>
      <Dialog
        open={openDialog}
        additionalModalRootStyles={{
          width: '45%',
        }}
      >
        <DialogHeader
          title={
            connectorStep === 1 && selected.type === 'MANAGED_CONNECTOR'
              ? t('content.edcconnector.modal.managed.title')
              : t('content.edcconnector.modal.company.title')
          }
          intro={
            connectorStep === 1 && selected.type === 'MANAGED_CONNECTOR'
              ? t('content.edcconnector.modal.managed.intro')
              : t('content.edcconnector.modal.company.intro')
          }
          closeWithIcon={true}
          onCloseWithIcon={() => {
            setSelected({})
            handleOverlayClose()
            reset(formFields)
          }}
        />
        <DialogContent
          sx={{
            padding: '0px 120px 40px 120px',
          }}
        >
          {connectorStep === 0 ? (
            <>
              <ConnectorTypeSelection selectedServiceCallback={onSelect} />
            </>
          ) : (
            <>
              <ConnectorInsertForm
                selectedService={selected}
                {...{ handleSubmit, control, errors, trigger }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              if (connectorStep === 1) {
                onStepChange()
              } else {
                setSelected({})
                handleOverlayClose()
                reset(formFields)
              }
            }}
          >
            {connectorStep === 0
              ? `${t('global.actions.cancel')}`
              : `${t('global.actions.back')}`}
          </Button>
          {!loading && (
            <Button
              variant="contained"
              disabled={selected && selected.id ? false : true}
              onClick={(e) =>
                connectorStep === 0 && selected && selected.id
                  ? handleConfirmClick(selected)
                  : onFormSubmit()
              }
            >
              {connectorStep === 0
                ? `${t('global.actions.next')}`
                : `${t('global.actions.confirm')}`}
            </Button>
          )}
          {loading && (
            <Box
              sx={{
                width: '110px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <CircleProgress
                size={40}
                step={1}
                interval={0.1}
                colorVariant={'primary'}
                variant={'indeterminate'}
                thickness={8}
              />
            </Box>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddConnectorOverlay
