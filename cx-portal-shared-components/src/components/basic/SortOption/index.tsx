/********************************************************************************
 * Copyright (c) 2021, 2023 Mercedes-Benz Group AG and BMW Group AG
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

import { useState } from 'react'
import { Typography } from '../Typography'

export const SortOption = ({
  sortOptions,
  setSortOption,
  selectedOption,
  show,
  singleMenu,
}: {
  sortOptions: any
  setSortOption?: any
  selectedOption: any
  show: boolean
  singleMenu?: boolean
}) => {
  const handleSortSelection = (e: any, value: string) => {
    e.stopPropagation()
    setSortOption(value)
  }

  const [submenuHover, setSubmenuHover] = useState(false)

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
              onClick={(e) => handleSortSelection(e, entry.value)}
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
                ...(singleMenu && submenuHover
                  ? { backgroundColor: 'rgb(176 206 235 / 40%)' }
                  : null),
              }}
              onMouseOver={() => setSubmenuHover(true)}
              onMouseLeave={() => setSubmenuHover(false)}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  color:
                    selectedOption === entry.value ||
                    (singleMenu && submenuHover)
                      ? '#0D55AF'
                      : '#000',
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
