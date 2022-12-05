/********************************************************************************
 * Copyright (c) 2021,2022 Mercedes-Benz Group AG and BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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

import { Typography } from '../Typography'

export const SortOption = ({
  sortOptions,
  setSortOption,
  selectedOption,
  show,
}: {
  sortOptions: any
  setSortOption?: any
  selectedOption: any
  show: boolean
}) => {
  return (
    <>
      {show && (
        <ul
          style={{
            padding: '8px',
          }}
        >
          {sortOptions.map((entry: any) => (
            <li
              key={entry.value}
              onClick={() => setSortOption(entry.value)}
              style={{
                backgroundColor:
                  selectedOption === entry.value
                    ? 'rgba(15, 113, 203, 0.05)'
                    : 'transparent',
                padding: '17px',
                width: '152px',
                borderRadius: '10px',
                cursor: 'pointer',
                listStyleType: 'none',
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color: selectedOption === entry.value ? '#0D55AF' : '#000',
                }}
              >
                {entry.label}
              </Typography>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
