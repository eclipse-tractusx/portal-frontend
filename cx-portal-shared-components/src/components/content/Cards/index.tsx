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

import { Box, useTheme } from '@mui/material'
import { Card, CardProps } from './Card'
import uniqueId from 'lodash/uniqueId'

export type CardItems = Omit<
  CardProps,
  'variant' | 'imageSize' | 'imageShape' | 'buttonText' | 'status'
>

interface CardsProps {
  items: CardItems[]
  buttonText: CardProps['buttonText']
  variant?: CardProps['variant']
  expandOnHover?: CardProps['expandOnHover']
  filledBackground?: CardProps['filledBackground']
  imageSize?: CardProps['imageSize']
  imageShape?: CardProps['imageShape']
  columns?: number
  readMoreText?: CardProps['readMoreText']
  readMoreLink?: CardProps['readMoreLink']
  addButtonClicked?: boolean
}

export const Cards = ({
  items,
  buttonText,
  readMoreText,
  readMoreLink,
  variant,
  imageSize,
  imageShape,
  columns = 6,
  expandOnHover,
  filledBackground,
  addButtonClicked = false,
}: CardsProps) => {
  const settings = {
    variant,
    buttonText,
    readMoreText,
    readMoreLink,
    imageSize,
    imageShape,
    expandOnHover,
    filledBackground,
    addButtonClicked,
  }
  const { spacing } = useTheme()

  return (
    <Box
      sx={{
        display: 'grid',
        gap: spacing(8, 4),
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {items?.map((item) => (
        <Card {...settings} {...item} key={uniqueId('Cards')} />
      ))}
    </Box>
  )
}
