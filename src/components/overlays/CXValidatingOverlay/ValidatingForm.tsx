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

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { IHashMap } from 'types/MainTypes'
import Box from '@mui/material/Box'
import { ValidatingInput } from './ValidatingInput'
import { type SxProps } from '@mui/system'

export type ValidationField = {
  key: string
  value?: string
  label?: string
  valid: (expr: string) => boolean
  sx?: SxProps
}

export type FormValidationStateItem = {
  key: string
  value: string | undefined
  valid: boolean
}

export const ValidatingForm = ({
  fields,
  onValid,
}: {
  fields: Array<ValidationField>
  onValid: (data: IHashMap<string> | undefined) => void
}) => {
  const { t } = useTranslation()
  const [values, setValues] = useState<IHashMap<FormValidationStateItem>>(
    (() => {
      const initialState: IHashMap<FormValidationStateItem> = {}
      return fields.reduce((val, field) => {
        val[field.key] = {
          key: field.key,
          value: field.value ?? '',
          valid: field.valid(field.value ?? ''),
        }
        return val
      }, initialState)
    })()
  )
  const onInputValid = (key: string, value: string | undefined) => {
    const newValue = value ?? ''
    if (values[key].value === newValue) return
    const currentValues = { ...values }
    currentValues[key] = { key, value: newValue, valid: value !== undefined }
    setValues(currentValues)
    const formValid = Object.values(currentValues).reduce(
      (valid, current) => valid && current.valid,
      true
    )
    onValid(
      formValid
        ? Object.values(currentValues).reduce(
            (data: IHashMap<string>, current) => {
              data[current.key] = current.value ?? ''
              return data
            },
            {}
          )
        : undefined
    )
  }

  return (
    <form>
      {fields.map(({ key, value, label, valid, sx }) => (
        <Box key={key} sx={{ ...sx, margin: '10px 0px' }}>
          <ValidatingInput
            name={key}
            value={value}
            label={label ?? t(`global.field.${key}`)}
            validate={valid}
            onValid={onInputValid}
          />
        </Box>
      ))}
    </form>
  )
}
