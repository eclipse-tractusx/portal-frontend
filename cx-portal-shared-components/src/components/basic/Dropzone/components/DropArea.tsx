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

import { Box, Link, useTheme } from '@mui/material'
import { useState } from 'react'
import { Typography } from '../../Typography'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { DropZoneDropAreaTranslations } from '../types'

export interface DropAreaProps {
  translations: DropZoneDropAreaTranslations
  children?: JSX.Element | JSX.Element[]
  disabled?: boolean
  size?: 'normal' | 'small'
}

export const DropArea = ({
  translations,
  children,
  disabled = false,
  size = 'normal',
}: DropAreaProps) => {
  const theme = useTheme()

  const { title, subTitle } = translations

  const [isDragging, setDragging] = useState(false)

  const borderRadius = 24
  const borderColor = 'rgb(7, 73, 133)'
  const dashedBorder = `"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='${borderRadius}' ry='${borderRadius}' stroke='${borderColor}' stroke-width='2' stroke-dasharray='2%2c 6' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e"`

  let formattedSubtitle = subTitle
  if (typeof subTitle === 'string') {
    const subTitleParts = subTitle.split('%')
    if (subTitleParts.length === 3) {
      formattedSubtitle = (
        <span>
          {subTitleParts[0]}
          <Link sx={{ textDecoration: 'underline' }}>{subTitleParts[1]}</Link>
          {subTitleParts[2]}
        </span>
      )
    }
  }

  const activeBackground = isDragging ? 'selected.focus' : 'selected.hover'
  const background = disabled ? 'action.disabledBackground' : activeBackground

  return (
    <Box
      onDragEnter={() => !disabled && setDragging(true)}
      onDragLeave={() => setDragging(false)}
      onDrop={() => setDragging(false)}
      sx={{
        position: 'relative',
        backgroundColor: background,
        transition: theme.transitions.create('background-color'),
        borderRadius: `${borderRadius}px`,
        border: 'none',
        backgroundImage: disabled ? 'none' : `url(${dashedBorder})`,
        textAlign: 'center',
      }}
    >
      <Box
        component="label"
        sx={{
          padding: size === 'normal' ? 5 : 2.5,
          display: 'block',
          cursor: disabled ? 'no-drop' : 'pointer',
        }}
      >
        <Box
          sx={{
            pointerEvents: 'none',
            display: size === 'normal' ? 'block' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...(disabled && {
              '& *': {
                color: 'action.disabled',
              },
            }),
          }}
        >
          <UploadFileIcon
            sx={{ color: 'primary.main', width: '68px', height: '68px' }}
          />
          <Box>
            <Typography
              variant="h3"
              fontFamily="body1.fontFamily"
              sx={{
                marginTop: size === 'normal' ? 3 : 0,
                marginLeft: size === 'normal' ? 0 : 3,
                display: 'block',
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ marginTop: 0.5, display: 'block' }}
            >
              {formattedSubtitle}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ position: 'absolute', visibility: 'hidden' }}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
