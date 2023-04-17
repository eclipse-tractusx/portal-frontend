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
import { Card, CardProps } from './Card'
import uniqueId from 'lodash/uniqueId'
import { CardAddService } from './CardAddService'

export type CardItems = Omit<
  CardProps,
  'variant' | 'imageSize' | 'imageShape' | 'buttonText' | 'status'
>

export type SubItems = {
  label: string
  value: string
}

interface CardsProps {
  items: CardItems[]
  buttonText: CardProps['buttonText']
  variant?: CardProps['variant']
  expandOnHover?: CardProps['expandOnHover']
  filledBackground?: CardProps['filledBackground']
  imageSize?: CardProps['imageSize']
  imageShape?: CardProps['imageShape']
  imageLoader?: CardProps['imageLoader']
  columns?: number
  readMoreText?: CardProps['readMoreText']
  readMoreLink?: CardProps['readMoreLink']
  addButtonClicked?: boolean
  showAddNewCard?: boolean
  newButtonText?: string
  onNewCardButton?: any
  onCardClick?: any
  subMenu?: boolean
  submenuOptions?: SubItems[]
  submenuClick?: any
  tooltipText?: string
  showStatus?: boolean
}

export const Cards = ({
  items,
  buttonText,
  readMoreText,
  readMoreLink,
  variant,
  imageSize,
  imageShape,
  imageLoader,
  columns = 6,
  expandOnHover,
  filledBackground,
  addButtonClicked = false,
  showAddNewCard = false,
  newButtonText,
  onNewCardButton,
  onCardClick = () => {},
  subMenu = false,
  submenuOptions = [],
  submenuClick = () => {},
  tooltipText,
  showStatus = true,
}: CardsProps) => {
  const settings = {
    variant,
    buttonText,
    readMoreText,
    readMoreLink,
    imageSize,
    imageShape,
    imageLoader,
    expandOnHover,
    filledBackground,
    addButtonClicked,
    subMenu,
    submenuOptions,
    submenuClick,
    tooltipText,
    showStatus,
  }

  return (
    <Box
      sx={{
        display: 'flex',
        '-ms-flex-wrap': 'wrap',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginRight: '-10px',
        marginLeft: '-10px',
      }}
    >
      {showAddNewCard && (
        <CardAddService
          backgroundColor={'common.white'}
          onButtonClick={onNewCardButton}
          title={newButtonText}
        />
      )}
      {items?.map((item) => (
        <Card
          {...settings}
          {...item}
          key={uniqueId('Cards')}
          onClick={() => {
            onCardClick(item)
          }}
        />
      ))}
    </Box>
  )
}
