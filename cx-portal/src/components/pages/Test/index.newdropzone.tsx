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

import Box from '@mui/material/Box'
import { Dropzone, DropzoneFile } from 'components/shared/basic/Dropzone'
import { Button, DropArea, UploadFileStatus } from 'cx-portal-shared-components'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function NewDropzoneTest() {
  const { handleSubmit, control, setValue, getValues } = useForm({
    defaultValues: {
      myUploadFiles: [],
    },
    mode: 'onChange',
  })

  const onSubmit = async (values: any) => {
    const { myUploadFiles } = values

    console.log('Uploading', myUploadFiles)

    const setFileStatus = (fileIndex: number, status: UploadFileStatus) => {
      const nextFiles = [...getValues().myUploadFiles] as any[]
      nextFiles[fileIndex] = {
        name: myUploadFiles[fileIndex].name,
        size: myUploadFiles[fileIndex].size,
        status,
      }
      setValue('myUploadFiles', nextFiles as any)
    }

    for (let fileIndex = 0; fileIndex < myUploadFiles.length; fileIndex++) {
      setFileStatus(fileIndex, 'uploading')

      try {
        await fetch('https://httpbin.org/post', { method: 'POST' })
        setFileStatus(fileIndex, 'upload_success')
      } catch (e) {
        // TODO: it should display an error notification snackbar
        setFileStatus(fileIndex, 'upload_error')
      }
    }
  }

  return (
    <div>
      <Controller
        name="myUploadFiles"
        control={control}
        render={({ field: { value, onChange: reactHookFormOnChange } }) => {
          const uploadStarted = value.some(
            (uploadFile: DropzoneFile) => !!uploadFile.status
          )

          return (
            <Dropzone
              files={value}
              onChange={(files, addedFiles, deletedFiles) => {
                console.log('Files changed', files, addedFiles, deletedFiles)
                reactHookFormOnChange(files)
              }}
              acceptFormat={{ 'image/png': [], 'image/jpeg': [] }}
              maxFilesToUpload={3}
              maxFileSize={819200}
              DropArea={(props) => (
                <DropArea
                  {...props}
                  disabled={props.disabled || uploadStarted}
                  size="small"
                />
              )}
            />
          )
        }}
      />
      <Box sx={{ mt: 3 }}>
        <Button onClick={handleSubmit(onSubmit)}>Upload</Button>
      </Box>
    </div>
  )
}
