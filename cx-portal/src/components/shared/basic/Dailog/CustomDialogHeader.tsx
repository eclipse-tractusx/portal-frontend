/********************************************************************************
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

import { Box, useTheme } from '@mui/material'
import MuiDialogTitle from '@mui/material/DialogTitle'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import { Typography } from '@catena-x/portal-shared-components'

export interface DialogHeaderProps {
  title?: string
  subtitle?: string
  icon?: boolean
  iconComponent?: JSX.Element
  children?: JSX.Element
  additionalContainerStyles?: any
  additionalTitleStyles?: any
  intro?: string
}

export const CustomDialogHeader = ({
  title,
  subtitle,
  icon,
  iconComponent = (
    <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 60 }} color="success" />
  ),
  additionalContainerStyles,
  additionalTitleStyles,
  intro,
}: DialogHeaderProps) => {
  const { spacing } = useTheme()

  return (
    <Box
      sx={{
        padding: spacing(5, 10, 2, 10),
        textAlign: 'center',
      }}
    >
      {title && (
        <MuiDialogTitle
          sx={{
            fontSize: '24px',
            ...additionalContainerStyles,
          }}
        >
          {icon && <>{iconComponent}</>}
          {title && (
            <Typography sx={{ ...additionalTitleStyles }} variant="h2">
              {title}
            </Typography>
          )}
        </MuiDialogTitle>
      )}
      {subtitle && (
        <Box sx={{ textAlign: 'left', margin: '20px 10px' }}>
          <Typography variant="label2">{subtitle}</Typography>
        </Box>
      )}
    </Box>
  )
}
