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

import CardWithText from './CardWithText'
import { CardDetailsProps } from '../StaticTypes'
import { Box } from '@mui/material'

export default function CardWithImage({
  detail,
  grid = 3,
}: {
  detail: CardDetailsProps
  grid: number
}) {
  const cardStyle = {
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: '96px',
    maxWidth: '33%',
  }
  return (
    <Box
      key={detail.id}
      sx={{
        ...cardStyle,
      }}
      style={{
        backgroundColor: detail.backgroundColor,
        padding: '40px',
        width: `${100 / grid}%`,
      }}
    >
      <img
        style={{
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
        src={detail.imageUrl}
        width="100%"
        alt={'alt tag info'}
      />
      <CardWithText card={detail} isImage={true} />
    </Box>
  )
}
