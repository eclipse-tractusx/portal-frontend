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

import { useTranslation } from 'react-i18next'
import { Input } from 'cx-portal-shared-components'
import { Box } from '@mui/material'
import Patterns from 'types/Patterns'

export const SingleUserContent = ({
  withUserId = false,
  setValue,
}: {
  withUserId?: boolean
  setValue: (key: string, value: string) => void
}) => {
  const InputDefinitions = {
    userid: {
      key: 'userid',
      i18n: 'global.field.userid',
      helperText: '',
      pattern: Patterns.ID,
      value: '',
      valid: false,
    },
    firstname: {
      key: 'firstname',
      i18n: 'global.field.first',
      helperText: '',
      pattern: Patterns.NAME,
      value: '',
      valid: false,
    },
    lastname: {
      key: 'lastname',
      i18n: 'global.field.last',
      helperText: '',
      pattern: Patterns.NAME,
      value: '',
      valid: false,
    },
    email: {
      key: 'email',
      i18n: 'global.field.email',
      helperText: '',
      pattern: Patterns.MAIL,
      value: '',
      valid: false,
    },
  }
  const { t } = useTranslation()

  return (
    <Box sx={{ marginTop: '30px' }}>
      {Object.values(
        withUserId
          ? InputDefinitions
          : {
              firstName: InputDefinitions.firstname,
              lastName: InputDefinitions.lastname,
              email: InputDefinitions.email,
            }
      ).map(({ key, i18n, helperText }) => (
        <Input
          sx={{ marginBottom: '30px' }}
          key={key}
          label={t(i18n)}
          placeholder={t(i18n)}
          helperText={helperText}
          onChange={(e) => setValue(key, e.target.value)}
        />
      ))}
    </Box>
  )
}
