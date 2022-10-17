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

import MuiChip, { ChipProps } from '@mui/material/Chip'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { theme } from '../../../theme'

interface ChipCustomProps extends ChipProps {
  type?: 'decline' | 'confirm' | 'plain'
  withIcon?: true | false
}

export const Chip = ({
  variant = 'filled',
  color = 'label',
  type = 'decline',
  withIcon = true,
  onDelete = () => null, // To avoid default delete icon appear
  ...props
}: ChipCustomProps) => {
  let icon, hoverBgColor, hoverTextColor

  switch (type) {
    case 'decline':
      icon = <HighlightOffIcon />
      hoverBgColor = theme.palette.declined.main
      hoverTextColor = theme.palette.declined.contrastText
      break
    case 'confirm':
      icon = <CheckCircleOutlineIcon />
      hoverBgColor = theme.palette.confirmed.main
      hoverTextColor = theme.palette.confirmed.contrastText
      break
  }

  return (
    <MuiChip
      variant={variant}
      color={color}
      icon={withIcon ? icon : undefined}
      sx={{
        borderRadius: '36px',
        ':hover': {
          backgroundColor: type !== 'plain' ? hoverBgColor : undefined,
          color: type !== 'plain' ? hoverTextColor : undefined,
        },
      }}
      {...props}
    />
  )
}
