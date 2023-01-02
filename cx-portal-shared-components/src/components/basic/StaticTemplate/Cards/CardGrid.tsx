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

import CardWithImage from './CardWithImage'
import CardWithoutImage from './CardWithoutImage'
import { ProviderProps, CardDetailsProps } from '../StaticTypes'
import { Box } from '@mui/material'

export default function CardGrid({
  provider,
  grid = 3,
  align = 'left',
}: {
  provider: ProviderProps
  grid: number
  align?: string
}) {
  const isCenter = align === 'center'
  const gridStyle = {
    display: 'flex',
    gap: '30px',
    placeContent: 'center',
    gridTemplateColumns: `repeat(${grid}, 1fr)`,
  }
  return (
    <>
      {provider.detailsWithImageRow1 &&
        provider.detailsWithImageRow1.length > 0 && (
          <Box
            sx={{
              ...gridStyle,
              marginTop: isCenter ? '84px' : '96px',
              textAlign: isCenter ? 'center' : 'left',
            }}
          >
            {provider.detailsWithImageRow1.map((card: CardDetailsProps) => {
              return (
                <CardWithImage key={card.title} detail={card} grid={grid} />
              )
            })}
          </Box>
        )}
      {provider.detailsWithImageRow2 &&
        provider.detailsWithImageRow2.length > 0 && (
          <Box
            sx={{
              ...gridStyle,
              textAlign: isCenter ? 'center' : 'left',
            }}
          >
            {provider.detailsWithImageRow2.map((card: CardDetailsProps) => {
              return (
                <CardWithImage key={card.title} detail={card} grid={grid} />
              )
            })}
          </Box>
        )}
      {provider.detailsWithoutImageRow1 &&
        provider.detailsWithoutImageRow1.length > 0 && (
          <Box
            sx={{
              ...gridStyle,
              marginBottom:
                provider.detailsWithoutImageRow2 &&
                provider.detailsWithoutImageRow2.length > 0
                  ? '0px'
                  : '180px',
            }}
          >
            {provider.detailsWithoutImageRow1.map((card: CardDetailsProps) => {
              return (
                <CardWithoutImage key={card.title} detail={card} grid={grid} />
              )
            })}
          </Box>
        )}
      {provider.detailsWithoutImageRow2 &&
        provider.detailsWithoutImageRow2.length > 0 && (
          <Box
            sx={{
              ...gridStyle,
              marginBottom: '180px',
            }}
          >
            {provider.detailsWithoutImageRow2.map((card: CardDetailsProps) => {
              return (
                <CardWithoutImage key={card.title} detail={card} grid={grid} />
              )
            })}
          </Box>
        )}
    </>
  )
}
