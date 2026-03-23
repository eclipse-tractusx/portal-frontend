/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
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

import { Input } from '@arena2036/portal-shared-components-construct-x'
import debounce from 'lodash.debounce'
import { useState, useMemo, useCallback } from 'react'
import { type SxProps } from '@mui/system'

export type ValidatingInputProps = {
  sx?: SxProps
  name: string
  label?: string
  helperText?: string
  placeholder?: string
  tooltipMessage?: string
  autofocus?: boolean
  value?: string
  type?: string
  immediate?: boolean
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
  type = '',
  immediate = false,
  debounceTime = 300,
  validate,
  onValid,
}: ValidatingInputProps) => {
  const [data, setData] = useState<string>(value)
  const [valid, setValid] = useState<boolean>(validate(value))

  const immediateValidation = useCallback(
    (expr: string) => {
      const isValid = validate(expr)
      setValid(isValid)
      const validValue = isValid ? expr : undefined
      onValid(name, validValue)
    },
    [name, validate, onValid]
  )

  const debouncedValidation = useMemo(
    () => debounce(immediateValidation, debounceTime),
    [immediateValidation, debounceTime]
  )

  const doValidate = useCallback(
    (expr: string) => {
      setData(expr)
      if (immediate) immediateValidation(expr)
      else debouncedValidation(expr)
    },
    [immediate, debouncedValidation, immediateValidation, setData]
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
      type={type}
      error={!valid && data !== ''}
      autoFocus={autofocus}
      onChange={(e) => {
        doValidate(e.currentTarget.value)
      }}
      onBlur={(e) => {
        doValidate(e.currentTarget.value)
      }}
    />
  )
}
