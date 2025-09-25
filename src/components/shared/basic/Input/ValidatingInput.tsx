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

import debounce from 'lodash.debounce'
import { useCallback, useEffect, useMemo, useState } from 'react'
import BasicInput, {
  type BasicInputProps,
  Colors,
  InputType,
} from './BasicInput'

export type ValidatingInputProps = BasicInputProps & {
  name: string
  debounceTime?: number
  validate: (expr: string) => boolean
  onValid?: (name: string, value: string) => void
  onInvalid?: (name: string, value: string) => void
  skipInitialValidation?: boolean
  required?: boolean
  onValue?: (data: { value: string; isValChanged: boolean }) => void
}

const ValidatingInput = ({
  name = '',
  label = '',
  hint = '',
  placeholder = '',
  value = '',
  onValue,
  type = InputType.text,
  disabled = false,
  toggleHide = false,
  errorMessage,
  style,
  debounceTime = 250,
  validate,
  required,
  onValid,
  onInvalid,
  skipInitialValidation = false,
}: ValidatingInputProps) => {
  const [color, setColor] = useState<Colors>(Colors.secondary)
  const [valid, setValid] = useState<boolean>(true)
  const immediateValidate = useCallback(
    (expr: string) => {
      const isValid = validate(expr)
      setColor(
        isValid
          ? !required && expr === ''
            ? Colors.secondary
            : Colors.success
          : Colors.error
      )
      setValid(isValid)
      if (isValid && onValid) onValid(name, expr)
      else if (!isValid && onInvalid) onInvalid(name, expr)
    },
    [name, onValid, onInvalid, validate]
  )

  const debouncedValidate = useMemo(
    () => debounce(immediateValidate, debounceTime),
    [immediateValidate, debounceTime]
  )

  useEffect(() => {
    if (!skipInitialValidation) debouncedValidate(value)
  }, [value])
  const handleInput = (data: { value: string; isValChanged: boolean }) => {
    // Run validation on value
    const isValid = validate(data.value)
    if (isValid) onValid?.(name, data.value)
    else onInvalid?.(name, data.value)

    // Pass full object up
    onValue?.(data)
  }
  return (
    <BasicInput
      {...{
        name,
        label,
        hint,
        placeholder,
        value,
        onValue,
        type,
        disabled,
        toggleHide,
        errorMessage,
        required,
      }}
      {...(color === Colors.error ? { errorMessage } : {})}
      style={{
        ...style,
        borderBottom: `2px solid ${color}`,
      }}
      valid={valid}
      onValue={handleInput}
    />
  )
}

export default ValidatingInput
