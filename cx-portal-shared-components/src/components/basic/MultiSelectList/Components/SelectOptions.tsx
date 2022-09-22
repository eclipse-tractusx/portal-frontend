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

import { Box } from '@mui/material'
import { HTMLAttributes } from 'react'
import { PartsType } from '..'

interface SelectOptionsProps {
  props: HTMLAttributes<HTMLElement>
  parts: PartsType[]
}

export const SelectOptions = ({ props, parts }: SelectOptionsProps) => (
  <li
    {...props}
    style={{
      paddingBottom: '0px',
      marginLeft: '5px',
      marginRight: '5px',
      marginTop: '-1px',
    }}
  >
    <Box
      sx={{
        borderBottom: '1px solid #f2f2f2 !important',
        width: '100%',
        paddingBottom: '10px',
      }}
    >
      {parts.map((part: PartsType, index: number) => (
        <span
          key={index}
          style={{
            fontWeight: part.highlight ? 700 : 400,
          }}
        >
          {part.text}
        </span>
      ))}
    </Box>
  </li>
)
