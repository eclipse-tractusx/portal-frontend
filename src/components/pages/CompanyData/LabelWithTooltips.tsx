/********************************************************************************
 * Copyright (c) 2021, 2024 Contributors to the Eclipse Foundation
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

import { Tooltips } from '@arena2036/portal-shared-components-construct-x'
import { Box, Typography } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

export default function LabelWithTooltips({
  tooltipMsg,
  label,
  value,
}: {
  readonly tooltipMsg?: string
  readonly label: string
  readonly value: string | undefined
}) {
  return (
    <Box
      sx={{
        marginBottom: '30px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          marginTop: '3px',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: '16px',
            color: '#111111',
            fontWeight: '400',
            paddingRight: '10px',
          }}
        >
          {label}
        </Typography>
        {tooltipMsg && (
          <Tooltips
            additionalStyles={{
              cursor: 'pointer',
              marginTop: '30px !important',
            }}
            tooltipPlacement="top-start"
            tooltipText={tooltipMsg}
            children={
              <span>
                <HelpOutlineIcon sx={{ color: '#B6B6B6' }} fontSize={'small'} />
              </span>
            }
          />
        )}
      </Box>
      <Typography
        variant="body1"
        sx={{
          fontSize: '16px',
          color: '#111111',
          fontWeight: '400',
          paddingRight: '10px',
        }}
      >
        {value}
      </Typography>
    </Box>
  )
}
