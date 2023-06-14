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

// TODO:
// for developer convenience - remove in prod

import axios from 'axios'
import { useState } from 'react'
import Dropzone from './Dropzone'
import './Translator.css'

export default function Translator() {
  const [input, setInput] = useState('{"message":"good morning!"}')
  const [output, setOutput] = useState('')
  const [langFrom, setLangFrom] = useState('en')
  const [langTo, setLangTo] = useState('de')

  function doTranslate() {
    const url = `https://catenax-dev003-util.azurewebsites.net/v1/translate/${langFrom}/${langTo}`
    axios
      .post(url, input)
      .then(function (response) {
        setOutput(JSON.stringify(response.data.result, null, 4))
      })
      .catch(function (error) {
        setOutput(error)
      })
  }

  return (
    <main className="Translator">
      <h2>Translator</h2>
      <Dropzone />
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <textarea defaultValue={output} />
      <input type="button" value="translate" onClick={() => doTranslate()} />
      from{' '}
      <input
        placeholder="from"
        value={langFrom}
        onChange={(e) => setLangFrom(e.target.value)}
      />
      to{' '}
      <input
        placeholder="to"
        value={langTo}
        onChange={(e) => setLangTo(e.target.value)}
      />
    </main>
  )
}
