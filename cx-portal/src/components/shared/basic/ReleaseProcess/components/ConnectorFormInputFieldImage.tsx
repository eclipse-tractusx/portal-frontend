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
import { ConnectorFormInputField } from './ConnectorFormInputField'
import { InputLabel } from '@mui/material'

export default function ConnectorFormInputFieldImage({
  control,
  trigger,
  errors,
  label,
  note,
  requiredText,
  noteDescription,
  name = 'uploadImage.leadPictureUri',
  acceptFormat = {
    'image/png': [],
    'image/jpeg': [],
  },
  handleDownload,
}: any) {
  return (
    <div className="form-field">
      <InputLabel sx={{ mb: 3, mt: 3 }}>{label}</InputLabel>
      <ConnectorFormInputField
        {...{
          control,
          trigger,
          errors,
          name: name,
          type: 'dropzone',
          acceptFormat: acceptFormat,
          maxFilesToUpload: 1,
          maxFileSize: 819200,
          rules: {
            required: {
              value: true,
            },
          },
          handleDownload: handleDownload,
        }}
      />
      {errors?.uploadImage?.leadPictureUri?.type === 'required' && (
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
