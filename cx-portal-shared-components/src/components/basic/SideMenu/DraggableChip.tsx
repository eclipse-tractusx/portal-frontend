/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
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

import { Box, BoxProps, useTheme } from '@mui/material'
import OpenWithIcon from '@mui/icons-material/OpenWith'

interface DraggableChipProps extends BoxProps {
  isSelected?: boolean
  onClick?: () => void
  children: React.ReactNode
}

export const DraggableChip = ({
  isSelected,
  children,
  ...props
}: DraggableChipProps) => {
  const theme = useTheme()

  return (
    <Box
      {...props}
      onClick={() => props.onClick?.()}
      sx={{
        cursor: 'pointer',
        boxSizing: 'border-box',
        width: '170px',
        height: '36px',
        paddingX: 2,
        borderRadius: '4px',
        typography: 'label4',
        backgroundColor: isSelected
          ? 'rgb(255, 230, 100)'
          : 'rgb(243, 235, 208)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: theme.transitions.create(['background-color']),
        '&:hover': {
          backgroundColor: 'rgb(255, 230, 100)',
        },
        ...props.sx,
      }}
    >
      <Box sx={{ flex: '1 1 auto' }}>{children}</Box>
      <Box sx={{ flex: '0 0 auto' }}>
        <OpenWithIcon sx={{ marginLeft: 1, display: 'block' }} />
      </Box>
    </Box>
  )
}
