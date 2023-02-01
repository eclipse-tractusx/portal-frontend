/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
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

import { useTheme } from '@mui/material'
import MuiChip from '@mui/material/Chip'
import { useEffect, useState } from 'react'

export enum StatusVariants {
  release = 'release',
  active = 'active',
  inactive = 'inactive',
  created = 'created',
  inReview = 'in_review',
}

export type Variants =
  | StatusVariants.release
  | StatusVariants.active
  | StatusVariants.inactive
  | StatusVariants.created
  | StatusVariants.inReview

export interface CardChipProps {
  status?: Variants
  statusText?: string
}

export const CardChip = ({ status, statusText }: CardChipProps) => {
  const theme = useTheme()
  const [chipColor, setChipColor] = useState('')
  const [chipBackground, setChipBackground] = useState('')

  useEffect(() => {
    switch (status?.toLowerCase()) {
      case StatusVariants.release:
        setChipColor(theme.palette.chip.release)
        setChipBackground(theme.palette.chip.bgRelease)
        break
      case StatusVariants.active:
        setChipColor(theme.palette.chip.active)
        setChipBackground(theme.palette.chip.bgActive)
        break
      case StatusVariants.inactive:
        setChipColor(theme.palette.chip.inactive)
        setChipBackground(theme.palette.chip.bgInactive)
        break
      case StatusVariants.created:
        setChipColor(theme.palette.chip.created)
        setChipBackground(theme.palette.chip.bgCreated)
        break
      case StatusVariants.inReview:
        setChipColor(theme.palette.chip.inReview)
        setChipBackground(theme.palette.chip.bgInReview)
        break
      default:
        setChipColor(theme.palette.chip.default)
        setChipBackground(theme.palette.chip.bgDefault)
    }
  }, [status, theme])

  return (
    <MuiChip
      label={statusText}
      variant="outlined"
      sx={{
        color: chipColor,
        backgroundColor: chipBackground,
        borderRadius: '200px',
        border: 'none',
        height: '28px',
      }}
    />
  )
}
