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

import { StatusTag, Typography } from '@catena-x/portal-shared-components'
import { Box } from '@mui/material'
import { type ProgressButtonsType } from 'features/admin/applicationRequestApiSlice'

export const ProgressVerificationButton = ({
  ...props
}: ProgressButtonsType) => {
  return (
    <Box
      sx={{
        display: 'flex',
        placeItems: 'center',
        flexDirection: 'row',
        margin: '0px 0px 20px 0px',
        width: '100%',
        height: '60px',
        padding: '12px 8px',
        borderRadius: '6px',
        backgroundColor: props?.backgroundColor ?? '#fff',
        color: '#111',
        fontSize: '14px',
        outlined: 'none',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: '100%',
        }}
      >
        <Box
          sx={{
            paddingLeft: '5px',
            display: 'flex',
            placeItems: 'center',
            flexDirection: 'row',
          }}
        >
          {props.icon}
          <Typography
            sx={{
              paddingLeft: '15px',
            }}
            variant="h4"
          >
            {' '}
            {props.label}
          </Typography>
        </Box>
        <Box>
          <StatusTag color={props.statusTag} label={props.statusLabel} />
        </Box>
      </Box>
    </Box>
  )
}
