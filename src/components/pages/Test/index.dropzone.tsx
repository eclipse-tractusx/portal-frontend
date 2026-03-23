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

import { Dropzone } from 'components/shared/basic/Dropzone'
import { Cards } from '@arena2036/portal-shared-components-construct-x'
import { appToCard } from 'features/apps/mapper'
import { isString } from 'lodash'
import { useState } from 'react'
import ItemProcessor from './ItemProcessor'

export default function Test() {
  // Add an ESLint exception until there is a solution
  // eslint-disable-next-line
  const [items, setItems] = useState<any[]>([])

  const techUserRowToJson = (row: string) =>
    ((cols: string[]) =>
      cols.length === 3 && {
        name: cols[1],
        authenticationType: 'SECRET',
        description: cols[2],
        roleIds: [cols[0]],
      })(row.split(','))

  const csvPreview = (files: File[]) => {
    files
      .filter((file: File) => file.type === 'text/csv')
      .forEach((file: File) => {
        const reader = new FileReader()
        reader.onabort = () => {
          console.log('file reading was aborted')
        }
        reader.onerror = () => {
          console.log('file reading has failed')
        }
        reader.onload = () => {
          const str = reader.result
          if (!isString(str)) return
          const techusers = str.split('\n').map(techUserRowToJson)
          setItems([...new Set([...items, ...techusers])])
        }
        reader.readAsText(file)
      })
  }

  const appPreview = (files: File[]) => {
    files
      .filter((file: File) => file.type === 'application/json')
      .forEach((file: File) => {
        const reader = new FileReader()
        reader.onabort = () => {
          console.log('file reading was aborted')
        }
        reader.onerror = () => {
          console.log('file reading has failed')
        }
        reader.onload = () => {
          const str = reader.result
          if (!isString(str)) return
          const dropItems = JSON.parse(str)
          setItems([...new Set([...items, ...dropItems])])
        }
        reader.readAsText(file)
      })
  }

  return (
    <main>
      <section>
        <Dropzone
          onChange={csvPreview}
          acceptFormat={{ 'application/json': [] }}
          maxFilesToUpload={20}
        />
        <ItemProcessor items={items} process={console.log} autostart={true} />
      </section>
      <section>
        <Dropzone onChange={appPreview} />
        <Cards columns={4} buttonText={'click'} items={items.map(appToCard)} />
      </section>
    </main>
  )
}
