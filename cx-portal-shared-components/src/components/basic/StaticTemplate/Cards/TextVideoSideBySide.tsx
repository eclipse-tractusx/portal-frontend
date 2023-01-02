/********************************************************************************
 * Copyright (c) 2021,2022 Mercedes-Benz Group AG and BMW Group AG
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

import { ProviderProps } from '../StaticTypes'
import { Typography } from '../../Typography'
import { Box } from '@mui/material'

export default function TextVideoSideBySide({
  provider,
}: {
  provider: ProviderProps
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0px 20px 0px 20px',
        padding: '90px 0px',
      }}
    >
      <Box
        sx={{
          padding: '20px',
          width: '50%',
        }}
      >
        <Typography variant="h2">{provider.title}</Typography>
        <Typography
          sx={{
            paddingTop: '34px',
          }}
          variant="body1"
        >
          {provider.description}
        </Typography>
      </Box>
      <iframe
        width="482"
        height="331"
        title="Video"
        style={{
          borderRadius: '16px',
          border: '0px',
        }}
        src={provider.videoUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </Box>
  )
}
