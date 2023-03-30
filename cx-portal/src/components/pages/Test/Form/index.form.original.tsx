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

import { ValidatingInput } from 'components/overlays/CXValidatingOverlay/ValidatingInput'
import { Button } from 'cx-portal-shared-components'
import { useState } from 'react'
import { IHashMap } from 'types/MainTypes'
import { isBPN, isFirstName, isMail, isURL } from 'types/Patterns'

const MyForm = ({
  onValid,
}: {
  onValid: (form: IHashMap<string> | undefined) => void
}) => {
  const [formData, setFormData] = useState<IHashMap<string>>()
  const [mailValue, setMailValue] = useState<string>('')

  const checkData = (key: string, value: string | undefined) => {
    const current = { ...formData }
    current[key] = value || ''
    setFormData(current)
    const formValid =
      !!current.name && !!current.mail && !!current.url && !!current.bpn
    onValid(formValid ? current : undefined)
  }

  return (
    <div>
      <Button
        sx={{ mr: 1 }}
        onClick={() => {
          setMailValue('')
        }}
      >
        Clear
      </Button>
      <Button
        sx={{ mr: 1 }}
        onClick={() => {
          setMailValue('valid@mail.com')
        }}
      >
        Set valid
      </Button>
      <Button
        sx={{ mr: 1 }}
        onClick={() => {
          setMailValue('invalid*mail.com')
        }}
      >
        Set invalid
      </Button>
      <ValidatingInput
        name={'name'}
        label={'name'}
        validate={isFirstName}
        onValid={checkData}
      />
      <ValidatingInput
        name={'mail'}
        label={'mail'}
        value={mailValue}
        validate={isMail}
        onValid={checkData}
      />
      <ValidatingInput
        name={'url'}
        label={'url'}
        value={''}
        validate={isURL}
        onValid={checkData}
      />
      <ValidatingInput
        name={'bpn'}
        label={'bpn'}
        validate={isBPN}
        onValid={checkData}
      />
    </div>
  )
}

function FormTest() {
  const [data, setData] = useState<IHashMap<string> | undefined>(undefined)

  return (
    <div>
      <MyForm onValid={setData} />
      <pre
        style={{ width: '600px', height: '160px', backgroundColor: '#eeeeee' }}
      >
        {data ? JSON.stringify(data, null, 2) : ''}
      </pre>
      <Button disabled={!data}>Submit</Button>
    </div>
  )
}

export default FormTest
