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

import React from 'react'
import { Box, useTheme } from '@mui/material'
import MuiDialogTitle from '@mui/material/DialogTitle'
import { Typography } from '../Typography'
import { IconButton } from '../IconButton'
import CloseIcon from '@mui/icons-material/Close'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'

export interface DialogHeaderProps {
  title: string
  intro?: string
  icon?: boolean
  closeWithIcon?: boolean
  onCloseWithIcon?: (event: React.MouseEvent) => void
}

export const DialogHeader = ({
  title,
  intro,
  icon,
  closeWithIcon,
  onCloseWithIcon,
}: DialogHeaderProps) => {
  const { spacing, palette } = useTheme()

  return (
    <Box sx={{ padding: spacing(7, 14), textAlign: 'center' }}>
      <MuiDialogTitle>
        {icon && (
          <Box>
            <CheckCircleOutlineOutlinedIcon
              sx={{ fontSize: 60 }}
              color="success"
            />
          </Box>
        )}
        {title}
        {closeWithIcon && (
          <IconButton
            aria-label="close"
            onClick={onCloseWithIcon}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: palette.action.active,
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </MuiDialogTitle>
      {intro && (
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          {intro}
        </Typography>
      )}
    </Box>
  )
}
