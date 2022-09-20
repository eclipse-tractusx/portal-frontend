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

import { Box, useTheme } from '@mui/material'
import { Typography } from '../../Typography'
import { TagSizeType } from '..'
import { useEffect, useState } from 'react'

interface SelectedTagProps {
  title: string
  size?: TagSizeType
}

export const SelectedTag = ({ title, size }: SelectedTagProps) => {
  const theme = useTheme()
  const [tagStyle, setTagStyle] = useState({
    padding: '10px 18px',
    fontSize: '14px',
  })

  useEffect(() => {
    switch (size) {
      case 'small':
        setTagStyle({ padding: '10px 18px', fontSize: '14px' })
        break
      case 'medium':
        setTagStyle({ padding: '14px', fontSize: '18px' })
        break
      case 'large':
        setTagStyle({ padding: '16px 28px', fontSize: '18px' })
    }
  }, [size])

  return (
    <Box>
      <Typography
        sx={{
          width: 'fit-content',
          padding: tagStyle.padding,
          marginRight: '10px',
          marginBottom: '10px',
          borderRadius: '10px',
          fontWeight: 'bold',
          fontSize: tagStyle.fontSize,
          color: theme.palette.accent.accent03,
          backgroundColor: theme.palette.accent.accent02,
        }}
      >
        {title}
      </Typography>
    </Box>
  )
}
