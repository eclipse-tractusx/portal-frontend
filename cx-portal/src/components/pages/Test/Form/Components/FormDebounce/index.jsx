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

import React, { useState } from 'react'
import Input from './Input'
import { FormValidations } from './index.validations'
import useValidation from './../../hooks/useValidation'

const initialFormState = {
  name: '',
  email: '',
  password: '',
}

function UserForm() {
  const [form, setForm] = useState(initialFormState)
  const { errors, isValid } = useValidation(form, FormValidations)

  const setInput = (newValue) => {
    setForm((form) => ({ ...form, ...newValue }))
  }

  return (
    <>
      <h3>Form Debounce</h3>
      <form>
        <button
          type="button"
          onClick={() => {
            const mail = document.getElementById('password')
            mail.value = ''
            setInput({ password: mail.value })
          }}
        >
          clear
        </button>
        <button
          type="button"
          onClick={() => {
            const mail = document.getElementById('password')
            mail.value = 'valid@email.is'
            setInput({ password: mail.value })
          }}
        >
          valid
        </button>
        <button
          type="button"
          onClick={() => {
            const mail = document.getElementById('password')
            mail.value = 'invalid'
            setInput({ password: mail.value })
          }}
        >
          invalid
        </button>
        <div className="form-group">
          <Input
            name="name"
            onChange={(e) => setInput({ name: e.target.value })}
            label="Name"
            error={errors.name}
            defaultValue={form.name}
          />
        </div>
        <div className="form-group">
          <Input
            id="email"
            name="email"
            onChange={(e) => setInput({ email: e.target.value })}
            label="E-mail"
            error={errors.email}
            defaultValue={form.email}
          />
        </div>
        <div className="form-group">
          <Input
            id="password"
            name="password"
            onChange={(e) => setInput({ password: e.target.value })}
            label="Password"
            error={errors.password}
            defaultValue={form.password}
          />
        </div>

        <div className="form-group">
          <button type="button" className="btn btn-primary" disabled={!isValid}>
            Submit
          </button>
        </div>
      </form>
    </>
  )
}

export default UserForm
