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
import { Typography } from '../../basic/Typography'
import StarRateIcon from '@mui/icons-material/StarRate'

export interface CardRatingProps {
  rating: number
}

export const CardRating = ({ rating }: CardRatingProps) => {
  const { palette } = useTheme()

  return (
    <Typography variant="caption3">
      <Box
        component="span"
        sx={{ display: 'inline-block', verticalAlign: 'sub', marginRight: 0.5 }}
      >
        <StarRateIcon sx={{ fill: palette.accent.accent09 }} />
      </Box>
      {rating}
    </Typography>
  )
}
