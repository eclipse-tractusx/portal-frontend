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

import Sort from '@mui/icons-material/Sort'
import { Box } from '@mui/material'

interface SortIconProps {
  onClick: React.MouseEventHandler
  selected?: boolean
}

export default function SortImage({ onClick, selected }: SortIconProps) {
  return (
    <Box
      sx={{
        marginLeft: '30px',
        cursor: 'pointer',
      }}
    >
      <Sort
        onClick={onClick}
        sx={{
          fontSize: 35,
          color: selected ? '#0D55AF' : '#939393',
          padding: '5px',
          backgroundColor: selected ? 'rgba(15, 113, 203, 0.05)' : 'white',
          ':hover': {
            color: '#0D55AF',
            backgroundColor: 'rgba(15, 113, 203, 0.05)',
          },
        }}
      />
    </Box>
  )
}
