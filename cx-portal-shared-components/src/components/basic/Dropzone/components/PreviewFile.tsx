/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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

import { Box, IconButton, useTheme } from '@mui/material'
import React from 'react'
import { DropZonePreviewTranslations, UploadFile } from '../types'
import { FileIcon } from '../../CustomIcons/FileIcon'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

export const formatBytes = (b: number) => {
  const units = ['bytes', 'KB', 'MB']
  let l = 0
  let n = b

  while (n >= 1024) {
    n /= 1024
    l += 1
  }

  return `${n.toFixed(n >= 10 || l < 1 ? 0 : 1)} ${units[l]}`
}

export interface PreviewFileProps {
  uploadFile: UploadFile
  onDelete?: () => void
  translations: DropZonePreviewTranslations
}

export const PreviewFile = ({
  uploadFile,
  translations,
  onDelete,
}: PreviewFileProps) => {
  const theme = useTheme()

  const isUploading = !!uploadFile.progressPercent

  let tagLabel

  switch (uploadFile.status) {
    case 'upload_success':
      tagLabel = translations.uploadSuccess
      break
    case 'upload_error':
      tagLabel = translations.uploadError
      break
  }

  return (
    <Box
      sx={{
        marginBottom: 1,
        borderRadius: '8px',
        overflow: 'hidden',
        typography: 'label3',
        paddingX: 2,
        paddingY: 1,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        '&:before': {
          zIndex: -2,
          content: "''",
          position: 'absolute',
          inset: 0,
          backgroundColor: 'selected.hover',
        },
        '&:after': {
          zIndex: -1,
          content: "''",
          pointerEvents: 'none',
          position: 'absolute',
          inset: 0,
          width: isUploading ? `${uploadFile.progressPercent}%` : 0,
          backgroundColor: 'primary.main',
        },
      }}
    >
      <Box
        sx={{
          flex: '0 0 auto',
          height: '56px',
          width: '56px',
          backgroundColor: isUploading
            ? 'background.background12'
            : 'selected.focus',
          borderRadius: '8px',
          marginRight: 4.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isUploading ? 'primary.contrastText' : 'icon.icon03',
        }}
      >
        <FileIcon fillColor="currentColor" size={22} />
      </Box>
      <Box
        sx={{
          flex: '1 1 auto',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          color: isUploading ? 'primary.contrastText' : 'text.primary',
          textShadow: isUploading
            ? `0 0 7px ${theme.palette.primary.main}`
            : 'none',
        }}
      >
        <Box>{uploadFile.fileName}</Box>
        <Box
          sx={{
            marginTop: 0.5,
            typography: 'label4',
            color: isUploading ? 'inherit' : 'textField.placeholderText',
          }}
        >
          {formatBytes(uploadFile.fileSize)}
        </Box>
      </Box>
      {tagLabel && (
        <Box>
          <Box
            sx={{
              marginLeft: 3,
              paddingX: 1.5,
              paddingY: 0.5,
              borderRadius: '14px',
              height: '28px',
              border: '2px solid currentColor',
              typography: 'label4',
              color:
                uploadFile.status === 'upload_error'
                  ? 'support.error'
                  : 'support.success',
            }}
          >
            {tagLabel}
          </Box>
        </Box>
      )}
      <Box sx={{ flex: '0 0 auto', marginLeft: 3 }}>
        <IconButton onClick={() => onDelete?.()}>
          <DeleteOutlineIcon sx={{ color: 'primary.main' }} />
        </IconButton>
      </Box>
    </Box>
  )
}
