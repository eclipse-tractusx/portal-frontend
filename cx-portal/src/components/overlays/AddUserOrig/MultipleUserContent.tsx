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

import { Trans, useTranslation } from 'react-i18next'
import { Typography } from 'cx-portal-shared-components'
import { Box } from '@mui/material'
import { Dropzone } from '../../shared/basic/Dropzone'

export const MultipleUserContent = () => {
  const { t } = useTranslation('', { keyPrefix: 'content.addUser' })

  return (
    <Box sx={{ marginBottom: '30px' }}>
      <Typography
        sx={{ margin: '30px 0 10px', textAlign: 'center' }}
        variant="h5"
      >
        {t('multipleUserHeadline')}
      </Typography>
      <Typography
        sx={{ marginBottom: '30px', textAlign: 'center' }}
        variant="body2"
      >
        <Trans i18nKey="multipleUserSubheadline">
          Please use this <a href="/">upload Template</a> to add multiple users
          by file
        </Trans>
      </Typography>
      <Dropzone
        acceptFormat="*"
        maxFilesToUpload={1}
        onChange={([file]) => {
          /* TODO: implement actual upload */
          console.log(file.name)
        }}
      />
    </Box>
  )
}
