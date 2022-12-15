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

import { Box } from '@mui/material'
import { DropZonePreviewTranslations, UploadFile } from '../types'
import { PreviewFile } from './PreviewFile'

export interface PreviewProps {
  uploadFiles: UploadFile[]
  onDelete?: (deleteIndex: number) => void
  translations: DropZonePreviewTranslations
}

export const DropPreview = ({
  uploadFiles,
  translations,
  onDelete,
}: PreviewProps) => {
  const isFinished = (file: UploadFile) =>
    file.status === 'upload_success' || file.status === 'upload_error'

  const filesCount = uploadFiles.length

  const finishedFilesCount = uploadFiles.filter(isFinished).length

  const uploadProgress = translations.uploadProgess
    .replace('%', finishedFilesCount.toString())
    .replace('%', filesCount.toString())

  return (
    <Box sx={{ marginTop: 4 }}>
      <Box sx={{ typography: 'label2' }}>
        {filesCount ? uploadProgress : translations.placeholder}
      </Box>
      {finishedFilesCount > 0 && (
        <Box sx={{ marginTop: 4 }}>
          {uploadFiles.map(
            (file, index) =>
              isFinished(file) && (
                <PreviewFile
                  key={index}
                  uploadFile={file}
                  translations={translations}
                  onDelete={() => onDelete?.(index)}
                />
              )
          )}
        </Box>
      )}
      {filesCount - finishedFilesCount > 0 && (
        <Box sx={{ marginTop: 4 }}>
          {uploadFiles.map(
            (file, index) =>
              !isFinished(file) && (
                <PreviewFile
                  key={index}
                  uploadFile={file}
                  translations={translations}
                  onDelete={() => onDelete?.(index)}
                />
              )
          )}
        </Box>
      )}
    </Box>
  )
}
