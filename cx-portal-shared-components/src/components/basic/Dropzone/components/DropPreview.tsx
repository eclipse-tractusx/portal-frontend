/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
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

import { Box } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import {
  DropZonePreviewTranslations,
  UploadFile,
  deleteConfirmOverlayTranslation,
  UploadStatus,
} from '../types'
import { DeleteConfirmOverlay } from './DeleteConfirmOverlay'
import {
  DropPreviewFile as DefaultDropPreviewFile,
  DropPreviewFileProps,
} from './DropPreviewFile'

export interface DropPreviewProps {
  uploadFiles: UploadFile[]
  onDelete?: (deleteIndex: number) => void
  onDownload?: (name: string, id: string) => void
  translations: DropZonePreviewTranslations

  DropStatusHeader?: FunctionComponent<DropStatusHeaderProps> | false
  DropPreviewFile?: FunctionComponent<DropPreviewFileProps> | false
  enableDeleteIcon?: boolean
  enableDeleteOverlay?: boolean
  deleteOverlayTranslation?: deleteConfirmOverlayTranslation
}

export interface DropStatusHeaderProps {
  numUploaded: number
  numTotal: number
}

export const DropPreview: FunctionComponent<DropPreviewProps> = ({
  uploadFiles,
  translations,
  onDelete,
  onDownload,
  DropStatusHeader,
  DropPreviewFile,
  enableDeleteIcon = true,
  enableDeleteOverlay = false,
  deleteOverlayTranslation,
}) => {
  const [deletestatus, setDeleteStatus] = useState({ index: 0, state: false })

  const isFinished = (file: UploadFile) =>
    file.status === UploadStatus.UPLOAD_SUCCESS ||
    file.status === UploadStatus.UPLOAD_ERROR

  const filesCount = uploadFiles.length

  const finishedFilesCount = uploadFiles.filter(isFinished).length
  const uploadedFilesCount = uploadFiles.filter(
    (file) => file.status === UploadStatus.UPLOAD_SUCCESS
  ).length

  const DefaultDropStatusHeader: typeof DropStatusHeader = ({
    numUploaded,
    numTotal,
  }) => {
    const uploadProgress = translations.uploadProgess
      .replace('%', numUploaded.toString())
      .replace('%', numTotal.toString())

    return (
      <Box sx={{ typography: 'label2' }}>
        {filesCount ? uploadProgress : translations.placeholder}
      </Box>
    )
  }

  let DropStatusHeaderComponent = DefaultDropStatusHeader
  if (DropStatusHeader) {
    DropStatusHeaderComponent = DropStatusHeader
  } else if (DropStatusHeader === false) {
    DropStatusHeaderComponent = () => null
  }

  let DropPreviewFileComponent = DefaultDropPreviewFile
  if (DropPreviewFile) {
    DropPreviewFileComponent = DropPreviewFile
  } else if (DropPreviewFile === false) {
    DropPreviewFileComponent = () => null
  }

  const onCallback = (closeOverlay: boolean) => {
    if (closeOverlay) {
      onDelete?.(deletestatus.index)
    }
    setDeleteStatus({ index: 0, state: false })
  }

  return (
    <>
      <DeleteConfirmOverlay
        onCallback={(closeOverlay) => onCallback(closeOverlay)}
        deleteOverlay={deletestatus.state}
        deleteOverlayTranslation={deleteOverlayTranslation}
      />
      <Box sx={{ marginTop: 4 }}>
        <DropStatusHeaderComponent
          numUploaded={uploadedFilesCount}
          numTotal={filesCount}
        />
        {finishedFilesCount > 0 && (
          <Box sx={{ marginTop: 4 }}>
            {uploadFiles
              .filter((file) => isFinished(file))
              .map((file, index) => (
                <DropPreviewFileComponent
                  key={index}
                  uploadFile={file}
                  translations={translations}
                  onDelete={() =>
                    enableDeleteOverlay
                      ? setDeleteStatus({ index: index, state: true })
                      : onDelete?.(index)
                  }
                  enableDeleteIcon={enableDeleteIcon}
                  onDownload={() => file.id && onDownload?.(file.name, file.id)}
                />
              ))}
          </Box>
        )}
        {filesCount - finishedFilesCount > 0 && (
          <Box sx={{ marginTop: 4 }}>
            {uploadFiles
              .filter((file) => !isFinished(file))
              .map((file, index) => (
                <DropPreviewFileComponent
                  key={index}
                  uploadFile={file}
                  translations={translations}
                  onDelete={() =>
                    enableDeleteOverlay
                      ? setDeleteStatus({ index: index, state: true })
                      : onDelete?.(index)
                  }
                />
              ))}
          </Box>
        )}
      </Box>
    </>
  )
}
