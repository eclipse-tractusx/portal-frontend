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

import { Box } from '@mui/material'
import { PropsWithChildren } from 'react'
import * as React from 'react'

export const PageSnackbarStack = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        marginTop: 1,
        '& > *': {
          marginTop: 2,
          position: 'relative !important',
          top: 'auto !important',
          bottom: 'auto !important',
        },
      }}
    >
      {children}
    </Box>
  )
}
