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

import type React from 'react'
import { useState } from 'react'
import debounce from 'lodash.debounce'

type Errors = Record<string, boolean>

type Valids = Record<string, boolean>

interface FormField {
  key: string
  pattern?: RegExp
}

export const useFormValidation = (formFields: FormField[]) => {
  const validate = (field: FormField | undefined, value = ''): boolean => {
    const pattern = field?.pattern
    return !pattern || pattern.test(value)
  }

  const [errors, setErrors] = useState<Errors>({})
  const [valids, setValids] = useState<Valids>(
    formFields.reduce<Valids>((values, field) => {
      return {
        ...values,
        [field.key]: validate(field),
      }
    }, {})
  )

  const handleChange = (key: string) => {
    return debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      const field = formFields.find((item) => item.key === key)
      const isValid = validate(field, value)

      setValids({
        ...valids,
        [key]: isValid,
      })

      setErrors({
        ...errors,
        [key]: !isValid,
      })
    }, 300)
  }

  const valid = Object.values(valids).every((value) => value)

  return { handleChange, errors, valid }
}
