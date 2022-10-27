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

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  Button,
  DialogActions,
  DialogHeader,
} from 'cx-portal-shared-components'
import ConnectorTypeSelection from './components/ConnectorTypeSelection'
import ConnectorInsertForm from './components/ConnectorInsertForm'
import { useForm } from 'react-hook-form'

interface AddCollectorOverlayProps {
  openDialog?: boolean
  connectorStep: number
  handleOverlayClose: React.MouseEventHandler
  handleConfirmClick: React.MouseEventHandler
  onFormConfirmClick: (data: FormFieldsType) => void
}

export type FormFieldsType = {
  ConnectorName: string
  ConnectorURL: string
}

const formFields = {
  ConnectorName: '',
  ConnectorURL: '',
}

const AddConnectorOverlay = ({
  openDialog = false,
  connectorStep,
  handleOverlayClose,
  handleConfirmClick,
  onFormConfirmClick,
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

  const [selected, setSelected] = useState<any>(undefined)

  const onFormSubmit = async () => {
    const validateFields = await trigger(['ConnectorName', 'ConnectorURL'])
    if (validateFields) {
      onFormConfirmClick(getValues() as FormFieldsType)
    }
  }

  const onSelect = (selected: any) => {
    setSelected(selected)
  }

  return (
    <div>
      <Dialog
        open={openDialog}
        sx={{
          '.MuiDialog-paper': {
            maxWidth: '45%',
          },
        }}
      >
        <DialogHeader
          title={t('content.edcconnector.modal.title')}
          intro={t('content.edcconnector.modal.intro')}
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
                {...{ handleSubmit, control, errors, trigger }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={(e) => {
              setSelected(undefined)
              handleOverlayClose(e)
              reset(formFields)
            }}
          >
            {`${t('global.actions.cancel')}`}
          </Button>
          <Button
            variant="contained"
            disabled={!selected}
            onClick={(e) =>
              connectorStep === 0 ? handleConfirmClick(e) : onFormSubmit()
            }
          >
            {`${t('global.actions.confirm')}`}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddConnectorOverlay
