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

import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import { isFirstName, isID, isLastName, isMail } from 'types/Patterns'
import { ValidatingInput } from '../CXValidatingOverlay/ValidatingInput'

export const SingleUserContent = ({
  withUserId = false,
  setValue,
}: {
  withUserId?: boolean
  setValue: (key: string, value: string) => void
}) => {
  const InputDefinitions = {
    userId: {
      key: 'userId',
      i18n: 'global.field.userid',
      validate: isID,
    },
    firstName: {
      key: 'firstName',
      i18n: 'global.field.first',
      validate: isFirstName,
    },
    lastName: {
      key: 'lastName',
      i18n: 'global.field.last',
      validate: isLastName,
    },
    email: {
      key: 'email',
      i18n: 'global.field.email',
      validate: isMail,
    },
  }
  const { t } = useTranslation()

  return (
    <Box sx={{ margin: '0 0 30px 0' }}>
      {Object.values(
        withUserId
          ? InputDefinitions
          : {
              firstName: InputDefinitions.firstName,
              lastName: InputDefinitions.lastName,
              email: InputDefinitions.email,
            }
      ).map(({ key, i18n, validate }) => (
        <ValidatingInput
          name={key}
          key={key}
          label={t(i18n)}
          placeholder={t(i18n)}
          helperText={t(i18n)}
          validate={validate}
          onValid={(key, value) => setValue(key, value ?? '')}
        />
      ))}
    </Box>
  )
}
