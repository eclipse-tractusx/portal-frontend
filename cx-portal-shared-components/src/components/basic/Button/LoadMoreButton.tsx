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

import { ButtonProps as MuiButtonProps } from '@mui/material/Button/Button'
import { Button } from '../Button'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

export interface LoadMoreButtonProps
  extends Omit<MuiButtonProps, 'color' | 'variant' | 'size'> {
  label: string | JSX.Element
  color?: 'primary' | 'secondary'
  background?: 'transparent' | 'secondary'
  onClick?: React.MouseEventHandler
}

export const LoadMoreButton = ({
  label,
  color,
  background,
  onClick,
  ...props
}: LoadMoreButtonProps) => {
  return (
    <Button
      {...props}
      onClick={onClick}
      color="primary"
      variant="outlined"
      size="small"
      sx={{
        ...props?.sx,
        color: color === 'secondary' ? 'secondary.main' : 'primary.main',
        borderColor: 'currentColor',
        backgroundColor: background,
        '&:hover': {
          color: color === 'secondary' ? 'secondary.dark' : 'primary.dark',
          borderColor: 'currentColor',
          backgroundColor: background,
        },
      }}
    >
      <AddCircleOutlineIcon sx={{ marginRight: 1 }} /> {label}
    </Button>
  )
}
