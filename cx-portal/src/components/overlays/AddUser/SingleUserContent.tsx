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

import { useTranslation } from 'react-i18next'
import { Input } from 'cx-portal-shared-components'
import { Box } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUsersToAdd } from 'features/admin/userDeprecated/actions'
import debounce from 'lodash.debounce'
import { IHashMap, UserInput } from 'types/MainTypes'
import Patterns from 'types/Patterns'

export const SingleUserContent = ({
  checkInputValid,
}: {
  checkInputValid: (value: boolean) => void
}) => {
  const InputDefinitions = {
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
  const dispatch = useDispatch()
  const [inputValid, setInputValid] = useState<boolean>(false)
  const [userInputs, setUserInputs] =
    useState<IHashMap<UserInput>>(InputDefinitions)

  const debouncedValidation = useMemo(
    () =>
      debounce((inputs: IHashMap<UserInput>) => {
        const check = Object.values(inputs).reduce(
          (all, input) => all && input.pattern.test(input.value),
          true
        )
        setInputValid(check)
      }, 300),
    [setInputValid]
  )

  const doValidate = useCallback(
    (key: string, value: string) => {
      const inputs = { ...userInputs }
      const current = inputs[key]
      current.value = value
      current.valid = !current.pattern.test(current.value)
      checkInputValid(
        inputs.email.valid || inputs.firstname.valid || inputs.lastname.valid
      )
      setUserInputs(inputs)
      debouncedValidation(inputs)
    },
    [debouncedValidation, userInputs, checkInputValid]
  )

  useMemo(() => {
    if (
      !userInputs.email.value ||
      !userInputs.firstname.value ||
      !userInputs.lastname.value
    ) {
      checkInputValid(true)
    }
  }, [checkInputValid, userInputs])

  useEffect(() => {
    dispatch(
      setUsersToAdd(
        inputValid
          ? {
              userName: userInputs.email.value,
              email: userInputs.email.value,
              firstName: userInputs.firstname.value,
              lastName: userInputs.lastname.value,
              message: 'you have been invited to catena-x',
            }
          : {}
      )
    )
  }, [inputValid, userInputs, dispatch])

  return (
    <Box sx={{ marginTop: '30px' }}>
      {Object.values(userInputs).map(({ key, i18n, helperText }) => (
        <Input
          sx={{ marginBottom: '30px' }}
          key={key}
          label={t(i18n)}
          placeholder={t(i18n)}
          helperText={helperText}
          error={userInputs[key].valid}
          onChange={(e) => doValidate(key, e.target.value)}
        />
      ))}
    </Box>
  )
}
