/********************************************************************************
 * Copyright (c) 2023 T-Systems International GmbH and BMW Group AG
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

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Input,
  theme,
  CircleProgress,
} from '@arena2036/portal-shared-components-construct-x'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { usePostSemanticModelMutation } from 'features/semanticModels/apiSlice'
import { Status } from 'features/semanticModels/types'
import {
  InputLabel,
  Box,
  MenuItem,
  FormControl,
  Select,
  type SelectChangeEvent,
} from '@mui/material'

interface ModelDetailDialogProps {
  show: boolean
  onClose: () => void
}

const ModelImportDialog = ({ show, onClose }: ModelDetailDialogProps) => {
  const [
    postSemanticModel,
    { data: uploadedModel, error: uploadError, isLoading: uploading },
  ] = usePostSemanticModelMutation()
  const { t } = useTranslation()
  const [inputText, setInputText] = useState<string>('')
  const [inputStatus, setInputStatus] = useState<
    Status.Draft | Status.Released
  >(Status.Draft)

  // Add an ESLint exception because of uncertainty about the exact structure of error data
  // eslint-disable-next-line
  const renderError = (error: any) => {
    if (error && 'data' in error) {
      if (error.data?.error?.message) {
        return <Typography color="error">{error.data.error.message}</Typography>
      } else if (error.status && error.data?.detail) {
        return (
          <Typography color="error">
            {`${error.data?.title} - ${error.data?.detail}`}
          </Typography>
        )
      }
    }
  }

  useEffect(() => {
    if (show) {
      setInputText('')
      setInputStatus(Status.Draft)
    }
  }, [show])

  useEffect(() => {
    if (uploadedModel !== null) {
      onClose()
    }
  }, [uploadedModel])

  const uploadModel = () => {
    postSemanticModel({
      model: inputText,
      type: 'BAMM',
      status: inputStatus,
    })
  }

  const onSelectChange = (e: SelectChangeEvent) => {
    setInputStatus(e.target.value as Status)
  }

  return (
    <Dialog open={show}>
      <DialogHeader
        title={t('content.semantichub.importDialog.title')}
        closeWithIcon
        onCloseWithIcon={onClose}
      />
      <DialogContent sx={{ pt: 1 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="import-model-status-label">Status</InputLabel>
          <Select
            labelId="import-model-status-label"
            id="import-model-status"
            value={inputStatus}
            label="Status"
            onChange={onSelectChange}
            disabled={uploading}
          >
            {Object.values(Status).map((status) => (
              <MenuItem value={status} key={`status_${status}`}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Input
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value)
          }}
          multiline
          minRows={4}
          maxRows={18}
          disabled={uploading}
        />
        {uploadError && renderError(uploadError)}
        {uploading && (
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <CircleProgress
              variant="indeterminate"
              colorVariant="primary"
              size={35}
              sx={{
                color: theme.palette.primary.main,
              }}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={uploading}>
          {t('content.semantichub.importDialog.buttonCancel')}
        </Button>
        <Button onClick={uploadModel} disabled={uploading}>
          {t('content.semantichub.importDialog.buttonConfirm')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModelImportDialog
