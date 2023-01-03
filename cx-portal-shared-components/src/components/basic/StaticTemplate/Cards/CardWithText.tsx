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

import { CardDetailsProps } from '../StaticTypes'
import { Box } from '@mui/material'
import { Typography } from '../../Typography'

export default function CardWithText({
  card,
  isImage,
}: {
  card: CardDetailsProps
  isImage: boolean
}) {
  const readMoreStyle = {
    textDecoration: 'underline',
    paddingTop: '12px',
    color: '#0f71cb',
    cursor: 'pointer',
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        padding: '0px',
      }}
    >
      <Box>
        <Typography
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '1',
            WebkitBoxOrient: 'vertical',
          }}
          variant="h4"
        >
          {card.title}
        </Typography>
        <Typography
          sx={{
            paddingTop: '34px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
          }}
          variant="body2"
        >
          {card.description}
        </Typography>
      </Box>
      {card.readMore ? (
        <a
          className={'readMoreButton'}
          style={{
            fontSize: isImage ? '16px' : '14px',
            ...readMoreStyle,
          }}
          href={card.readMore}
        >
          {card.readMoreTitle}
        </a>
      ) : (
        <Box
          sx={{
            ...readMoreStyle,
          }}
        />
      )}
    </Box>
  )
}
