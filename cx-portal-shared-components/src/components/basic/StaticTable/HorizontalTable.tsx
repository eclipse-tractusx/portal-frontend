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

import { Typography } from '@mui/material'
import { TableType } from './types'

export const HorizontalTable = ({ data }: { data: TableType }) => (
  <table
    style={{
      width: '100%',
      borderCollapse: 'collapse',
      border: '1px solid #e0e1e2',
    }}
  >
    <tbody>
      {data.head.map((col, c) => (
        <tr key={c}>
          <th
            style={{
              backgroundColor: '#ecf0f4',
              textAlign: 'left',
              padding: '10px 15px',
              width: '160px',
              borderBottom: '1px solid #e0e1e2',
            }}
          >
            <Typography variant="label3">{col}</Typography>
          </th>
          {data.body[c].map((row, r) => (
            <td
              key={r}
              style={{
                borderBottom: '1px solid #e0e1e2',
                padding: '10px 15px',
                whiteSpace: 'normal',
                wordBreak: 'break-all',
                width: '50%',
              }}
            >
              <Typography variant="body3">{row}</Typography>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)
