/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
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

import { TableType } from './types'

export const VerticalTable = ({ data }: { data: TableType }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    <thead>
      <tr>
        {data.head.map((col, c) => (
          <th
            key={c}
            style={{
              backgroundColor: '#ecf0f4',
              textAlign: 'left',
              padding: '10px 15px',
            }}
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.body.map((row, r) => (
        <tr key={r}>
          {row.map((CustomComp, c) => {
            const isStringTypeProp = typeof CustomComp === 'string'
            return (
              <td
                key={c}
                style={{
                  padding: '10px 15px',
                  borderBottom: '1px solid #f1f1f1',
                }}
              >
                {isStringTypeProp ? CustomComp : <CustomComp />}
              </td>
            )
          })}
        </tr>
      ))}
    </tbody>
  </table>
)
