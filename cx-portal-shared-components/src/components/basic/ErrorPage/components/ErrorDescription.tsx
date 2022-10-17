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

import { Box, Typography } from '@mui/material'
import { ErrorPageProps } from '../index'

export const ErrorDescription = ({
  header,
  title,
  description,
  additionalDescription,
}: ErrorPageProps) => {
  return (
    <Box
      sx={{
        width: 'max-content',
        margin: 'auto',
      }}
    >
      {header && (
        <Typography
          sx={{
            fontFamily: 'LibreFranklin-Light',
            fontWeight: '600',
            marginBottom: '10px !important',
          }}
          variant="h2"
        >
          {header}
        </Typography>
      )}

      {title && (
        <Typography
          sx={{
            fontFamily: 'LibreFranklin-Light',
          }}
          variant="body1"
        >
          {title}
        </Typography>
      )}

      {title && description && (
        <Typography
          sx={{
            fontFamily: 'LibreFranklin-Light',
            width: '640px',
            paddingTop: '20px !important',
          }}
          variant="body1"
        >
          {description}{' '}
          <span style={{ borderBottom: '1px solid gray' }}>
            {additionalDescription}
          </span>
        </Typography>
      )}
    </Box>
  )
}
