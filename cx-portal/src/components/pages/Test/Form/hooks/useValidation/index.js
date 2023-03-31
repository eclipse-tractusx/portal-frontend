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

import { useState, useEffect, useCallback } from 'react'
import { ValidationError } from 'yup'

const useValidation = (values, schema) => {
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)

  const validate = useCallback(async () => {
    try {
      await schema.validate(values, { abortEarly: false })
      setErrors({})
      setIsValid(true)
    } catch (e) {
      if (e instanceof ValidationError) {
        const errors = {}
        e.inner.forEach((key) => {
          errors[key.path] = key.message
        })
        setErrors(errors)
        setIsValid(false)
      }
    }
  }, [schema, values])

  useEffect(() => {
    validate()
  }, [validate])

  return { errors, isValid }
}

export default useValidation
