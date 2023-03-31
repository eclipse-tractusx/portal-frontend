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

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { debounce } from '../Debounce'

function Input({ error, label, onChange, ...rest }) {
  const [touched, setTouched] = useState(false)
  const inputRef = useRef(null)
  const debounceInput = useCallback(debounce(onChange, 500), [debounce])
  const blurInput = useCallback(() => setTouched(true), [setTouched])

  useEffect(() => {
    const ref = inputRef.current
    ref.addEventListener('input', debounceInput)
    ref.addEventListener('blur', blurInput)

    return () => {
      ref.removeEventListener('input', debounceInput)
      ref.removeEventListener('blur', blurInput)
    }
  }, [blurInput, debounceInput, inputRef])

  return (
    <>
      <label htmlFor={rest.name}>{label}</label>
      <input className="form-control" {...rest} ref={inputRef} />
      <span className="text-danger">{touched && error}</span>
    </>
  )
}
export default Input
