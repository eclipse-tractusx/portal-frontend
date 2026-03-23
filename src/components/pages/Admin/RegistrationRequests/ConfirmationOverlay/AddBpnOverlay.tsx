/********************************************************************************
 * Copyright (c) 2023 Mercedes-Benz Group AG and BMW Group AG
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
import {
  Dialog,
  DialogContent,
  Button,
  DialogActions,
  DialogHeader,
  Typography,
  Input,
  CircleProgress,
} from '@arena2036/portal-shared-components-construct-x'
import { isBPN } from 'types/Patterns'
interface AddBpnOveralyProps {
  openDialog?: boolean
  handleOverlayClose: React.MouseEventHandler
  handleConfirmClick: (data: string) => void
  isLoading: boolean
}

const AddBpnOveraly = ({
  openDialog = false,
  handleOverlayClose,
  handleConfirmClick,
  isLoading,
}: AddBpnOveralyProps) => {
  const { t } = useTranslation()
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
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
          title={t('content.admin.registration-requests.enterBpn')}
        />
        <DialogContent>
          <div className="form-input">
            <Input
              sx={{
                paddingTop: '10px',
              }}
              placeholder={t(
                'content.edcconnector.modal.insertform.bpn.placeholder'
              )}
              onChange={(
                e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => {
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
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={(e) => {
              handleOverlayClose(e)
            }}
          >
            {t('global.actions.cancel')}
          </Button>
          {isLoading && (
            <span
              style={{
                marginLeft: '25px',
                width: '116px',
                textAlign: 'center',
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
            </span>
          )}
          {!isLoading && (
            <Button
              variant="contained"
              disabled={error || value === ''}
              onClick={() => {
                handleConfirmClick(value)
                setValue('')
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

export default AddBpnOveraly
