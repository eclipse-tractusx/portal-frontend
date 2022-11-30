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

import { Box } from '@mui/material'
import { Typography } from '../../Typography'
import { CloudUploadIcon } from '../../CustomIcons/CloudUploadIcon'

export const DropArea = ({
  title = 'Drop files to upload',
  subtitle = 'or click to select files',
  children,
  disabled = false,
}: {
  title?: string
  subtitle?: string
  children?: JSX.Element | JSX.Element[]
  disabled?: boolean
}) => (
  <Box
    sx={{
      position: 'relative',
      backgroundColor: 'background.background01',
      borderRadius: '40px',
      border: 'none',
      backgroundImage:
        'url(data:image/svg+xml,%3csvg width="100%25" height="100%25" xmlns="http://www.w3.org/2000/svg"%3e%3crect width="100%25" height="100%25" fill="none" rx="40" ry="40" stroke="%23B6B6B6FF" stroke-width="2" stroke-dasharray="16" stroke-dashoffset="0" stroke-linecap="square"/%3e%3c/svg%3e)',
      textAlign: 'center',
      minHeight: 274,
      label: {
        padding: '48px 0',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        cursor: disabled ? 'default' : 'pointer',
      },
    }}
  >
    <label>
      <CloudUploadIcon fillColor={'#939393'} size={64} />
      <Typography
        variant="h4"
        sx={{
          display: 'block',
          fontFamily: 'LibreFranklin-Light',
          marginTop: '24px',
        }}
      >
        {title}
      </Typography>
      <Typography variant="body1" sx={{ display: 'block' }}>
        {subtitle}
      </Typography>
    </label>
    {children}
  </Box>
)
