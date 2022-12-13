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
import { UploadFile } from '../types'
import { PreviewFile } from './PreviewFile'

export interface PreviewProps {
  uploadFiles: UploadFile[]
  onDelete?: (index: number) => void
}

export const Preview = ({ uploadFiles, onDelete }: PreviewProps) => {
  const numUploaded = uploadFiles.filter(
    (file) => file.status === 'upload_success'
  ).length

  const isUploading = (file: UploadFile) => file.status === 'uploading'

  return (
    <Box sx={{ marginTop: 4 }}>
      <Box sx={{ typography: 'label2' }}>
        Uploaded {numUploaded} of {uploadFiles.length} files
      </Box>
      <Box sx={{ marginTop: 4 }}>
        {uploadFiles.map(
          (file, index) =>
            !isUploading(file) && (
              <PreviewFile
                key={index}
                uploadFile={file}
                onDelete={() => onDelete?.(index)}
              />
            )
        )}
      </Box>
      <Box sx={{ marginTop: 4 }}>
        {uploadFiles.map(
          (file, index) =>
            isUploading(file) && (
              <PreviewFile
                key={index}
                uploadFile={file}
                onDelete={() => onDelete?.(index)}
              />
            )
        )}
      </Box>
    </Box>
  )
}
