/********************************************************************************
 * Copyright (c) 2021, 2023 Mercedes-Benz Group AG and BMW Group AG
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
  Typography,
  DropArea,
} from 'cx-portal-shared-components'
import Box from '@mui/material/Box'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import './EdcComponentStyles.scss'
import { Dropzone } from '../../../../shared/basic/Dropzone'

interface CreateDapsRegistrationProps {
  openDialog?: boolean
  handleOverlayClose: React.MouseEventHandler
  handleConfirmClick: (data: any) => {}
  loading: boolean
}

const CreateDapsRegistration = ({
  openDialog = false,
  handleOverlayClose,
  handleConfirmClick,
  loading,
}: CreateDapsRegistrationProps) => {
  const { t } = useTranslation()
  const [error, setError] = useState(false)
  const [file, setFile] = useState<File>()
  const dropzoneProps = {
    accept: {
      'application/x-pem-file': [],
      'application/x-x509-ca-cert': [],
    },
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
          title={t('content.edcconnector.modal.daps.title')}
          intro={t('content.edcconnector.modal.daps.intro')}
        />
        <DialogContent
          sx={{
            padding: '0px 120px 40px 120px',
          }}
        >
          <Dropzone
            acceptFormat={dropzoneProps.accept}
            maxFilesToUpload={1}
            onChange={([file]) => {
              setFile(file)
              setError(false)
            }}
            DropStatusHeader={false}
            DropArea={(props) => <DropArea {...props} size="small" />}
          />
          {error && (
            <div className="errorContainer">
              <ErrorOutlineOutlinedIcon
                sx={{
                  color: 'red',
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  paddingLeft: '10px',
                }}
              >
                {t('content.edcconnector.modal.daps.error')}
              </Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={(e) => {
              handleOverlayClose(e)
            }}
          >
            {`${t('global.actions.cancel')}`}
          </Button>
          {!loading && (
            <Button
              variant="contained"
              disabled={!file}
              onClick={(e) => handleConfirmClick(file)}
            >
              {`${t('global.actions.confirm')}`}
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

export default CreateDapsRegistration
