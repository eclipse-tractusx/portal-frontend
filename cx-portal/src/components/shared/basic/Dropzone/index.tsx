/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
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

import { DropArea } from 'cx-portal-shared-components'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { IHashMap } from 'types/MainTypes'
import { Preview } from './components/Preview'

export const Dropzone = ({
  onFileDrop,
  showPreviewAlone = false,
  preview = (files) => (
    <Preview files={files} showPreviewAlone={showPreviewAlone} />
  ),
  children,
  acceptFormat = { 'image/*': [] },
  maxFilesToUpload = 1,
  previewFiles,
  maxFileSize,
}: {
  onFileDrop: (files: File[]) => void
  showPreviewAlone?: boolean
  preview?: (files: File[]) => JSX.Element
  children?: JSX.Element[] | JSX.Element
  acceptFormat?: any
  maxFilesToUpload?: number
  previewFiles?: any
  maxFileSize?: number
}) => {
  const [dropped, setDropped] = useState<IHashMap<File>>({})

  const onDrop = useCallback(
    (files: File[]) => {
      setDropped(
        files.reduce(
          (map: any, file: File) => {
            map[file.name] = file
            return map
          },
          { ...dropped }
        )
      )
      onFileDrop(files)
    },
    [dropped, onFileDrop]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    disabled:
      maxFilesToUpload === Object.keys(dropped)?.length || showPreviewAlone,
    maxFiles: maxFilesToUpload,
    accept: acceptFormat,
    multiple: false,
    maxSize: maxFileSize,
  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {!showPreviewAlone && (
        <DropArea
          disabled={maxFilesToUpload === Object.keys(dropped)?.length}
        />
      )}
      {(previewFiles &&
        Object.keys(previewFiles)?.length > 0 &&
        preview(Object.values(previewFiles))) ||
        preview(Object.values(dropped))}
      {children}
    </div>
  )
}
