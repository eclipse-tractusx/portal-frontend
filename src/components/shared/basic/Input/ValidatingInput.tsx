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

import debounce from 'lodash.debounce'
import { useCallback, useMemo, useState } from 'react'
import BasicInput, { BasicInputProps, Colors, InputType } from './BasicInput'

export type ValidatingInputProps = BasicInputProps & {
  name: string
  debounceTime?: number
  validate?: (expr: string) => boolean
  onValid?: (name: string, value: string) => void
}

const ValidatingInput = ({
  name = '',
  label = '',
  hint = '',
  value = '',
  onValue,
  type = InputType.text,
  toggleHide = false,
  errorMessage,
  style,
  debounceTime = 250,
  validate,
  onValid,
}: ValidatingInputProps) => {
  const [color, setColor] = useState<Colors>(Colors.secondary)

  const immediateValidate = useCallback(
    (expr: string) => {
      const isValid = validate ? validate(expr) : true
      setColor(isValid ? Colors.success : Colors.error)
      isValid && onValid && onValid(name, expr)
    },
    [name, onValid, validate]
  )

  const debouncedValidate = useMemo(
    () => debounce(immediateValidate, debounceTime),
    [immediateValidate, debounceTime]
  )

  const doValidate = useCallback(
    (expr: string) => {
      if (debounceTime === 0) immediateValidate(expr)
      else debouncedValidate(expr)
    },
    [debounceTime, debouncedValidate, immediateValidate]
  )

  return (
    <BasicInput
      {...{ name, label, hint, value, onValue, type, toggleHide, errorMessage }}
      {...(color === Colors.error ? { errorMessage: hint } : {})}
      style={{
        ...style,
        borderBottom: `2px solid ${color}`,
      }}
      onValue={doValidate}
    />
  )
}

export default ValidatingInput
