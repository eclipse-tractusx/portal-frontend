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
  Typography,
} from 'cx-portal-shared-components'
import { isBPN } from 'types/Patterns'
import { Input } from 'cx-portal-shared-components'

interface ConfirmationOverlayProps {
  openDialog?: boolean
  handleOverlayClose: React.MouseEventHandler
  handleConfirmClick: React.MouseEventHandler
  enableBpnInput?: boolean
  title?: string
}

const ConfirmationOverlay = ({
  openDialog = false,
  handleOverlayClose,
  handleConfirmClick,
  enableBpnInput,
  title,
}: ConfirmationOverlayProps) => {
  const { t } = useTranslation()
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const onChange = (e: any) => {
    setValue(e.target.value)
    const validateExpr = isBPN(e.target.value)
    if (validateExpr) {
      setError(false)
    } else {
      setError(true)
    }
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
          title={
            title
              ? title
              : t('content.admin.registration-requests.confirmmodal.title')
          }
        />
        <DialogContent>
          {enableBpnInput ? (
            <div className="form-input">
              <Input
                sx={{
                  paddingTop: '10px',
                }}
                placeholder={t(
                  'content.edcconnector.modal.insertform.bpn.placeholder'
                )}
                onChange={(e: any) => {
                  onChange(e)
                }}
                value={value}
              />
              {error && (
                <Typography variant="h6" color="error">
                  {t('content.admin.registration-requests.bpnError')}
                </Typography>
              )}
            </div>
          ) : (
            t('content.admin.registration-requests.confirmmodal.description')
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={(e) => handleOverlayClose(e)}>
            {t('global.actions.cancel')}
          </Button>
          {!enableBpnInput && (
            <Button variant="contained" onClick={(e) => handleConfirmClick(e)}>
              {t('global.actions.confirm')}
            </Button>
          )}
          {enableBpnInput && (
            <Button
              variant="contained"
              disabled={error || value === ''}
              onClick={(e) => {
                //TO-DO api integration and callback method to the component
                console.log('API needs to be added')
              }}
            >
              {t('global.actions.confirm')}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ConfirmationOverlay
