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

import { Typography } from 'cx-portal-shared-components'
import { Controller } from 'react-hook-form'
import { InputLabel } from '@mui/material'
import { Dropzone } from 'components/shared/basic/Dropzone'

export default function ConnectorFormInputFieldMultipleImages({
  control,
  trigger,
  errors,
  label,
  uploadImages,
  maxFilesToUpload,
  requiredText,
  noteDescription,
  note,
}: any) {
  return (
    <div className="form-field">
      <InputLabel sx={{ mb: 3, mt: 3 }}>{label}</InputLabel>
      <Controller
        name="images"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange: reactHookFormOnChange, value } }) => {
          return (
            <Dropzone
              files={value}
              onChange={(files, addedFiles, deletedFiles) => {
                if (deletedFiles?.length) {
                  //to do: to call 'useDeleteDocumentMutation' on delete
                  console.log('deletedFile', deletedFiles)
                }
                reactHookFormOnChange(files)
                trigger('images')
                addedFiles && uploadImages(files)
              }}
              acceptFormat={{
                'image/png': [],
                'image/jpeg': [],
              }}
              maxFilesToUpload={maxFilesToUpload}
              maxFileSize={819200}
            />
          )
        }}
      />
      {errors?.images?.type === 'required' && (
        <Typography variant="body2" className="file-error-msg">
          {requiredText}
        </Typography>
      )}
      <Typography variant="body2" mt={3} sx={{ fontWeight: 'bold' }}>
        {note}
      </Typography>
      <Typography variant="body2" mb={3}>
        {noteDescription}
      </Typography>
    </div>
  )
}
