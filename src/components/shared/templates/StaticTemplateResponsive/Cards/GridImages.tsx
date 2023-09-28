/********************************************************************************
 * Copyright (c) 2021, 2023 Mercedes-Benz Group AG and BMW Group AG
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

import type { ProviderProps } from '../StaticTypes'
import '../StaticTemplate.scss'
import RenderImage from './RenderImage'
import { Box } from '@mui/material'

export default function GridImages({
  provider,
  baseUrl,
  grid = 3,
}: {
  provider: ProviderProps
  baseUrl: string
  grid: number
}) {
  return (
    <Box
      className="grid"
      sx={{
        gridTemplateColumns: `repeat(${grid}, 1fr)`,
      }}
    >
      {provider.images &&
        provider.images.map((path) => (
          <RenderImage key={path} height="250px" url={baseUrl + path || ''} />
        ))}
    </Box>
  )
}
