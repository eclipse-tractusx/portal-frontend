/********************************************************************************
 * Copyright (c) 2023 Mercedes-Benz Group AG and BMW Group AG
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
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

import CardWithText from './CardWithText'
import type { CardDetailsProps } from '../StaticTypes'
import { Box } from '@mui/material'
import { Image } from '@arena2036/portal-shared-components-construct-x'
import '../style.scss'

export default function CardWithImage({
  detail,
  grid = 3,
  baseUrl,
}: {
  detail: CardDetailsProps
  grid: number
  baseUrl: string
}) {
  return (
    <Box
      key={detail.id}
      className={'cardStyle'}
      sx={{
        backgroundColor: detail.backgroundColor,
        width: `${100 / grid}%`,
      }}
    >
      <Image
        src={baseUrl + detail.imagePath}
        style={{
          width: '100%',
          marginBottom: '24px',
          objectFit: 'cover',
          borderRadius: '8px',
          padding:
            detail.imageShape && detail.imageShape === 'circle'
              ? '0px 90px'
              : '0px', // provide extra padding if the image shape is circle.
          maxHeight:
            detail.imageShape && detail.imageShape === 'circle'
              ? '100%'
              : '156px', // Do not specify any height if the image shape is circle as it might crop some part in it
        }}
      />
      <CardWithText card={detail} isImage={true} />
    </Box>
  )
}
