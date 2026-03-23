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

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  Button,
  DialogActions,
  DialogHeader,
  CircleProgress,
  Checkbox,
  StaticTable,
} from '@arena2036/portal-shared-components-construct-x'
import Box from '@mui/material/Box'

interface DeleteConfirmationOverlayProps {
  openDialog?: boolean
  handleOverlayClose: React.MouseEventHandler
  handleConfirmClick: (status: boolean) => void
  loading?: boolean
  techUser?: {
    id: string
    name: string
    clientId: string
    description: string
  }
}

const DeleteConfirmationOverlay = ({
  openDialog = false,
  handleOverlayClose,
  handleConfirmClick,
  loading,
  techUser,
}: DeleteConfirmationOverlayProps) => {
  const { t } = useTranslation()
  const [checkBoxSelected, setCheckBoxSelected] = useState<boolean>(false)
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
        <DialogHeader title={t('content.edcconnector.deletemodal.title')} />
        <DialogContent
          sx={{
            textAlign: 'center',
            marginBottom: '25px',
            padding: '0px 80px 20px 80px',
          }}
        >
          {!techUser
            ? t('content.edcconnector.deletemodal.description')
            : t('content.edcconnector.deletemodal.techUserdescription')}
          {techUser && (
            <Box
              sx={{
                marginTop: '50px',
              }}
            >
              <StaticTable
                data={{
                  head: [
                    t('content.edcconnector.deletemodal.techDetails.title'),
                    ' ',
                  ],
                  body: [
                    [
                      t('content.edcconnector.deletemodal.techDetails.name'),
                      techUser?.name || '',
                    ],
                    [
                      t(
                        'content.edcconnector.deletemodal.techDetails.clientId'
                      ),
                      techUser?.clientId || '',
                    ],
                    [
                      t(
                        'content.edcconnector.deletemodal.techDetails.description'
                      ),
                      techUser?.description || '',
                    ],
                  ],
                }}
                horizontal={false}
              />
              <Box
                sx={{
                  marginTop: '50px',
                }}
              >
                <Checkbox
                  label={t(
                    'content.edcconnector.deletemodal.techUserCheckBoxLabel'
                  )}
                  checked={checkBoxSelected}
                  onClick={() => {
                    setCheckBoxSelected(!checkBoxSelected)
                  }}
                />
              </Box>
            </Box>
          )}
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
          {!loading && (
            <Button
              variant="contained"
              onClick={() => {
                handleConfirmClick(checkBoxSelected)
              }}
            >
              {t('global.actions.confirm')}
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

export default DeleteConfirmationOverlay
