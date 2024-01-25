/********************************************************************************
 * Copyright (c) 2021, 2024 BMW Group AG
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

import { TextField } from '@mui/material'
import { Dropzone } from 'components/shared/basic/Dropzone'
import { isString } from 'lodash'
import { useState } from 'react'

export default function TestEncoding() {
  const [text, setText] = useState<string>('')
  return (
    <section>
      <div style={{ margin: 100 }}>
        <Dropzone
          onChange={(files: File[]) => {
            console.log(files)
            files.forEach((file: File) => {
              console.log(file)
              const reader = new FileReader()
              reader.onabort = () => {
                console.log('file reading was aborted')
              }
              reader.onerror = () => {
                console.log('file reading has failed')
              }
              reader.onload = () => {
                const str = reader.result
                console.log(str)
                if (!isString(str)) return
                setText(str)
              }
              reader.readAsText(file)
            })
          }}
          acceptFormat={{ 'text/txt': ['.txt'] }}
          maxFilesToUpload={10}
          enableDeleteOverlay={false}
        />
        <pre>{text}</pre>
      </div>
    </section>
  )
}
