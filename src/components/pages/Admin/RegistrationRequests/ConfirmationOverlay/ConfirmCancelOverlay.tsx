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
  Input,
  Typography,
  CircleProgress,
} from '@arena2036/portal-shared-components-construct-x'
import { isValidCancelInput } from 'types/Patterns'
import { useDeclineChecklistMutation } from 'features/admin/applicationRequestApiSlice'
interface ConfirmationOverlayProps {
  openDialog: boolean
  companyName?: string
  selectedRequestId?: string
  handleOverlayClose: React.MouseEventHandler
  handleConfirmClick: (text: string) => void
}

const ConfirmaCancelOverlay = ({
  openDialog = false,
  companyName,
  handleOverlayClose,
  handleConfirmClick,
  selectedRequestId,
}: ConfirmationOverlayProps) => {
  const { t } = useTranslation()
  const [text, setText] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [declineRequest] = useDeclineChecklistMutation()

  const onChangeText = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setText(e.target.value)
    const validateExpr = isValidCancelInput(e.target.value)
    if (validateExpr) {
      setError(false)
    } else {
      setError(true)
    }
  }

  const onDecline = async (text: string) => {
    setLoading(true)
    await declineRequest({
      applicationId: selectedRequestId ?? '',
      comment: text ?? '',
    })
      .unwrap()
      .then(() => {
        handleConfirmClick('')
      })
      .catch((error) => {
        handleConfirmClick(error.data.title)
      })
    setLoading(false)
  }

  return (
    <div>
      {companyName && (
        <Dialog
          open={openDialog}
          sx={{
            '.MuiDialog-paper': {
              maxWidth: '45%',
              textAlign: 'center',
            },
          }}
        >
          <DialogHeader
            title={t(
              'content.admin.registration-requests.confirmCancelModal.title'
            ).replace('{companyName}', companyName)}
          />
          <DialogContent>
            <div style={{ textAlign: 'center' }}>
              <Typography variant="body1">
                {t(
                  'content.admin.registration-requests.confirmCancelModal.description'
                ).replace('{companyName}', companyName)}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  paddingTop: '20px',
                }}
              >
                {t(
                  'content.admin.registration-requests.confirmCancelModal.details'
                )}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  paddingTop: '20px',
                }}
              >
                {t(
                  'content.admin.registration-requests.confirmCancelModal.note'
                )}
              </Typography>
              <div
                style={{
                  paddingTop: '20px',
                }}
              >
                <Input
                  label={t(
                    'content.admin.registration-requests.confirmCancelModal.inputLabel'
                  )}
                  sx={{
                    paddingTop: '10px',
                  }}
                  multiline
                  rows={2}
                  maxRows={4}
                  placeholder={''}
                  onChange={(
                    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                  ) => {
                    onChangeText(e)
                  }}
                  value={text}
                />
                {error && (
                  <Typography
                    sx={{
                      textAlign: 'left',
                    }}
                    variant="body2"
                    color="error"
                  >
                    {t(
                      'content.admin.registration-requests.confirmCancelModal.error'
                    )}
                  </Typography>
                )}
              </div>
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
            {loading && (
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
            {!loading && (
              <Button variant="contained" onClick={() => onDecline(text)}>
                {t('global.actions.confirm')}
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}
    </div>
  )
}

export default ConfirmaCancelOverlay
