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

import {
  type DropAreaProps,
  type DropPreviewProps,
  type DropPreviewFileProps,
  type DropStatusHeaderProps,
  type UploadFile,
  type DeleteConfirmOverlayTranslation,
  DropArea as DefaultDropArea,
  DropPreview as DefaultDropPreview,
  UploadStatus,
} from '@arena2036/portal-shared-components-construct-x'
import { type FunctionComponent, useCallback, useState } from 'react'
import { type Accept, useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next'
import { CONVERT_TO_MB } from 'types/Constants'

export type DropzoneFile = File & Partial<UploadFile>

export interface DropzoneProps {
  onChange: (
    allFiles: DropzoneFile[],
    addedFiles: DropzoneFile[] | undefined,
    deletedFiles: DropzoneFile[] | undefined
  ) => void
  files?: DropzoneFile[]
  acceptFormat?: Accept
  maxFilesToUpload?: number
  maxFileSize?: number

  DropArea?: FunctionComponent<DropAreaProps> | false
  DropStatusHeader?: FunctionComponent<DropStatusHeaderProps> | false
  DropPreview?: FunctionComponent<DropPreviewProps> | false
  DropPreviewFile?: FunctionComponent<DropPreviewFileProps> | false
  enableDeleteIcon?: boolean
  enableDeleteOverlay?: boolean
  deleteOverlayTranslation?: DeleteConfirmOverlayTranslation
  handleDownload?: () => void
  handleDelete?: (documentId: string) => void
  errorText?: string
}

export const Dropzone = ({
  onChange,
  files,
  acceptFormat,
  maxFilesToUpload,
  maxFileSize,
  DropArea,
  DropStatusHeader,
  DropPreview,
  DropPreviewFile,
  enableDeleteIcon = true,
  enableDeleteOverlay = false,
  deleteOverlayTranslation,
  handleDownload,
  handleDelete,
  errorText,
}: DropzoneProps) => {
  const { t } = useTranslation()

  const [dropped, setDropped] = useState<DropzoneFile[]>([])

  const currentFiles = files ?? dropped

  const isSingleUpload = maxFilesToUpload === 1

  const isDisabled = currentFiles.length === maxFilesToUpload

  const onDropAccepted = useCallback(
    (droppedFiles: File[]) => {
      const nextFiles = isSingleUpload
        ? droppedFiles
        : [...dropped, ...droppedFiles]

      setDropped(nextFiles)
      onChange(nextFiles, droppedFiles, undefined)
    },
    [dropped, isSingleUpload, onChange]
  )

  const handleFEDelete = useCallback(
    (deleteIndex: number, documentId: string) => {
      const nextFiles = [...currentFiles]
      const deletedFiles = nextFiles.splice(deleteIndex, 1)

      setDropped(nextFiles)
      onChange(nextFiles, undefined, deletedFiles)
      if (handleDelete) {
        handleDelete(documentId)
      }
    },
    [currentFiles, onChange, handleDelete]
  )

  const handleFileSizeValidator = (file: File) => {
    if (!maxFileSize) return null
    const formatFileSize = (bytes: number): string => {
      const sizeInMB = bytes / CONVERT_TO_MB
      return Number.isInteger(sizeInMB)
        ? sizeInMB.toString()
        : sizeInMB.toFixed(1)
    }

    return file.size > maxFileSize
      ? {
          code: 'size-too-large',
          message: `${t('shared.dropzone.error.fileTooLarge')} ${formatFileSize(maxFileSize)} MB`,
        }
      : null
  }

  const {
    getRootProps,
    getInputProps,
    fileRejections,
    isDragReject,
    isDragActive,
  } = useDropzone({
    onDropAccepted,
    disabled: isDisabled,
    maxFiles: isSingleUpload ? 0 : maxFilesToUpload,
    accept: acceptFormat,
    multiple: !isSingleUpload,
    validator: handleFileSizeValidator,
  })

  let DropAreaComponent = DefaultDropArea
  if (DropArea) {
    DropAreaComponent = DropArea
  } else if (DropArea === false) {
    DropAreaComponent = () => null
  }

  let DropPreviewComponent = DefaultDropPreview
  if (DropPreview) {
    DropPreviewComponent = DropPreview
  } else if (DropPreview === false) {
    DropPreviewComponent = () => null
  }

  // TODO: read react-dropzone errorCode instead of message and localize
  const errorObj = fileRejections?.[0]?.errors?.[0]
  const fileTypeError =
    errorObj && fileRejections?.[0]?.errors?.[0].code === 'file-invalid-type'
  const errorMessage =
    !isDragActive && errorObj && !fileTypeError && errorText
      ? errorText
      : errorObj?.message

  const uploadFiles: UploadFile[] = currentFiles.map((file) => ({
    id: file.id,
    name: file.name,
    size: file.size,
    status: file.status ?? UploadStatus.NEW,
    progressPercent: file.progressPercent,
  }))

  return (
    <div>
      <div {...getRootProps()}>
        <DropAreaComponent
          disabled={isDisabled}
          error={errorMessage || isDragReject}
          translations={{
            title: t('shared.dropzone.title'),
            subTitle: t('shared.dropzone.subTitle'),
            errorTitle: t('shared.dropzone.errorTitle'),
          }}
        >
          <input {...getInputProps()} />
        </DropAreaComponent>
      </div>

      <DropPreviewComponent
        uploadFiles={uploadFiles}
        onDelete={handleFEDelete}
        onDownload={handleDownload}
        DropStatusHeader={DropStatusHeader}
        DropPreviewFile={DropPreviewFile}
        translations={{
          placeholder: t('shared.dropzone.placeholder'),
          uploadError: t('shared.dropzone.uploadError'),
          uploadSuccess: t('shared.dropzone.uploadSuccess'),
          uploadProgress: t('shared.dropzone.uploadProgess'),
        }}
        enableDeleteIcon={enableDeleteIcon}
        enableDeleteOverlay={enableDeleteOverlay}
        deleteOverlayTranslation={deleteOverlayTranslation}
      />
    </div>
  )
}
