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

import ValidatingInput from 'components/shared/basic/Input/ValidatingInput'
import BasicInput, { InputType } from 'components/shared/basic/Input/BasicInput'
import {
  Button,
  Checkbox,
} from '@arena2036/portal-shared-components-construct-x'
import { useState } from 'react'
import { isMail } from 'types/Patterns'

const TestValueBar = ({ onValue }: { onValue: (value: string) => void }) => {
  return (
    <>
      <Button
        sx={{ mr: 1 }}
        onClick={() => {
          onValue('')
        }}
      >
        Clear
      </Button>
      <Button
        sx={{ mr: 1 }}
        onClick={() => {
          onValue('valid@mail.com')
        }}
      >
        Set valid mail
      </Button>
      <Button
        sx={{ mr: 1 }}
        onClick={() => {
          onValue('invalid*mail.com')
        }}
      >
        Set invalid mail
      </Button>
    </>
  )
}

const BasicFormTest = () => {
  const [mailValue, setMailValue] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  return (
    <div>
      <h3>BasicInput</h3>
      <TestValueBar onValue={setMailValue} />
      Error{' '}
      <Checkbox
        onClick={() => {
          setError(!error)
        }}
      ></Checkbox>
      <BasicInput
        name={'mail'}
        label={'your mail address'}
        hint={'specify a valid email address'}
        errorMessage={error ? 'invalid email address' : undefined}
        value={mailValue}
        onValue={(value?: string) => {
          setMailValue(value ?? '')
        }}
      />
      <BasicInput
        name={'password'}
        label={'your password'}
        hint={'specify your login password'}
        type={InputType.password}
        errorMessage={
          error ? 'password length must be at least 8 characters' : undefined
        }
        onValue={(value?: string) => {
          console.log(value)
        }}
      />
      <pre
        style={{
          width: '400px',
          height: '100px',
          backgroundColor: '#eeeeee',
          padding: '12px',
        }}
      >
        {mailValue}
      </pre>
    </div>
  )
}

const ValidatingFormTest = () => {
  const [mailValue, setMailValue] = useState<string>('')
  const [debounceTime, setDebounceTime] = useState<string>('250')
  const [error, setError] = useState<boolean>(false)
  return (
    <div>
      <h3>ValidatingInput</h3>
      <TestValueBar onValue={setMailValue} />
      Error{' '}
      <Checkbox
        onClick={() => {
          setError(!error)
        }}
      ></Checkbox>
      <ValidatingInput
        value={'250'}
        name={'debounceTime'}
        label={'debounce time'}
        hint={'specify the debounce time in ms'}
        errorMessage={error ? 'debounce time must be a number' : undefined}
        validate={(expr) => !Number.isNaN(Number.parseInt(expr ?? '0'))}
        onValid={(_name: string, value?: string) => {
          setDebounceTime(value ?? '0')
        }}
        debounceTime={Number.parseInt(debounceTime)}
      />
      <ValidatingInput
        name={'mail'}
        label={'your mail address'}
        hint={'specify a valid email address'}
        errorMessage={error ? 'invalid email address' : undefined}
        value={mailValue}
        validate={isMail}
        onValid={(_name: string, value?: string) => {
          setMailValue(value ?? '')
        }}
        debounceTime={Number.parseInt(debounceTime)}
      />
      <ValidatingInput
        name={'password'}
        label={'your password'}
        hint={'specify your login password'}
        type={InputType.password}
        errorMessage={
          error ? 'password length must be at least 8 characters' : undefined
        }
        validate={(expr) => expr.length >= 8}
        onValid={(_name: string, value?: string) => {
          console.log(value ?? '')
        }}
        debounceTime={Number.parseInt(debounceTime)}
      />
      <pre
        style={{
          width: '400px',
          height: '100px',
          backgroundColor: '#eeeeee',
          padding: '12px',
        }}
      >
        {mailValue}
      </pre>
    </div>
  )
}

const FormTest = () => {
  return (
    <>
      <BasicFormTest />
      <ValidatingFormTest />
    </>
  )
}

export default FormTest
