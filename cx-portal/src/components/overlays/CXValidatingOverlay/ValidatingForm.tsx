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

import { Input } from 'cx-portal-shared-components'
import debounce from 'lodash.debounce'
import { useState, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { IHashMap } from 'types/MainTypes'
import Box from '@mui/material/Box'

export type ValidatingInputProps = {
  sx?: any
  name: string
  label?: string
  helperText?: string
  placeholder?: string
  tooltipMessage?: string
  autofocus?: boolean
  value?: string
  debounceTime?: number
  validate: (data: string) => boolean
  onValid: (name: string, data: string | undefined) => void
}

export const ValidatingInput = ({
  sx,
  name,
  label = '',
  helperText = '',
  placeholder = '',
  tooltipMessage = undefined,
  autofocus = false,
  value = '',
  debounceTime = 300,
  validate,
  onValid,
}: ValidatingInputProps) => {
  const [data, setData] = useState<string>(value)
  const [valid, setValid] = useState<boolean>(validate(value))
  const [show, setShow] = useState<number>(0)

  const debouncedValidation = useMemo(
    () =>
      debounce((expr: string, counter: number) => {
        const isValid = validate(expr)
        setValid(isValid)
        setShow(counter)
        const validValue = isValid ? expr : undefined
        onValid(name, validValue)
      }, debounceTime),
    [onValid, setValid, validate, setShow, name, debounceTime]
  )

  const doValidate = useCallback(
    (expr: string) => {
      setData(expr)
      debouncedValidation(expr, show + 1)
    },
    [debouncedValidation, setData, show]
  )

  return (
    <Input
      sx={sx}
      name={name}
      label={label}
      helperText={helperText}
      placeholder={placeholder}
      tooltipMessage={tooltipMessage}
      value={data}
      error={!valid && show > 0}
      autoFocus={autofocus}
      onChange={(e) => doValidate(e.currentTarget.value)}
      onBlur={(e) => doValidate(e.currentTarget.value)}
    />
  )
}

export type ValidationField = {
  key: string
  value?: string
  label?: string
  valid: (expr: string) => boolean
  sx?: any
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
      let initialState: IHashMap<FormValidationStateItem> = {}
      return fields.reduce((val, field) => {
        val[field.key] = {
          key: field.key,
          value: field.value || '',
          valid: field.valid(field.value || ''),
        }
        return val
      }, initialState)
    })()
  )
  const onInputValid = (key: string, value: string | undefined) => {
    const newValue = value || ''
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
              data[current.key] = current.value || ''
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
            label={label || t(`global.field.${key}`)}
            validate={valid}
            onValid={onInputValid}
          />
        </Box>
      ))}
    </form>
  )
}
