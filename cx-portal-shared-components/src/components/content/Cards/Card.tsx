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

import { Box, Link, useTheme } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { CardButtons, CardButtonsProps } from './CardButtons'
import { CardChip, CardChipProps } from './CardChip'
import { CardContent, CardContentProps } from './CardContent'
import { CardImage, CardImageProps } from './CardImage'

type Variants =
  | 'minimal'
  | 'compact'
  | 'expanded'
  | 'preview'
  | 'text-only'
  | 'text-details'

export interface CardProps
  extends CardContentProps,
    CardButtonsProps,
    CardImageProps,
    CardChipProps {
  variant?: Exclude<Variants, 'preview'>
  filledBackground?: boolean
  backgroundColor?: string
  expandOnHover?: boolean
  readMoreText?: string
  readMoreLink?: string
  onClick?: React.MouseEventHandler
  addButtonClicked?: boolean
}

export const Card = ({
  variant: variantProp = 'minimal',
  expandOnHover = false,
  filledBackground,
  backgroundColor,
  title,
  subtitle,
  rating,
  price,
  description,
  image,
  imageSize,
  imageShape,
  buttonText,
  onClick,
  onButtonClick,
  onSecondaryButtonClick,
  readMoreText,
  readMoreLink,
  addButtonClicked,
  status,
  statusText,
}: CardProps) => {
  const { shape, shadows, spacing } = useTheme()
  const [variant, setVariant] = useState(variantProp as Variants)
  const [content, setContent] = useState({
    title,
    subtitle,
  } as CardContentProps)
  const boxRef = useRef<HTMLDivElement>(null)
  const [showButton, setShowButton] = useState(false)
  const [boxHeight, setBoxHeight] = useState<number | undefined>()

  useEffect(() => {
    setVariant(variantProp)
  }, [variantProp])

  useEffect(() => {
    switch (variant) {
      case 'compact':
        setContent({ title, subtitle, rating, price })
        break
      case 'text-only':
        setContent({ title, description })
        break
      case 'expanded':
      case 'preview':
        setContent({ title, subtitle, rating, price, description })
        break
      case 'text-details':
        setContent({ title, subtitle, description })
        break
      default:
        setContent({ title, subtitle })
    }
  }, [variant, description, price, rating, subtitle, title])

  useEffect(() => {
    setShowButton(['expanded', 'preview'].includes(variant))
  }, [variant])

  useEffect(() => {
    // Set initial box height to prevent flicker on hover
    // TODO: Had to add 37px in height to fit inner content, investigation required
    setBoxHeight(boxRef.current?.getBoundingClientRect().height)
  }, [])

  const onMouseEnter = () => {
    if (expandOnHover) setVariant('preview')
  }
  const onMouseLeave = () => setVariant(variantProp)

  const customBackgroundColor = () => {
    return backgroundColor ? backgroundColor : 'background.background02'
  }

  return (
    <div
      ref={boxRef}
      style={{
        position: 'relative',
        height: boxHeight ? `${boxHeight + 37}px` : '',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <Box
        sx={{
          backgroundColor: 'common.white',
          borderRadius: shape.borderRadius,
          border: '1px solid',
          borderColor: 'border.border01',
          ':hover': {
            boxShadow: shadows['20'],
          },
          ...(filledBackground === true && {
            backgroundColor: customBackgroundColor,
            border: 'none',
          }),
          ...(variant === 'preview' && {
            position: 'absolute',
            width: 'calc(100% - 2px)',
            zIndex: 100,
          }),
          ...(variant === 'text-only' && {
            border: 'none',
            ':hover': {
              boxShadow: 'none',
            },
          }),
          ...(onClick && { cursor: 'pointer' }),
        }}
        className="card"
      >
        <Box>
          {statusText && (
            <Box
              sx={{
                position: 'absolute',
                right: '0',
                marginRight: '17px',
                marginTop: '21px',
              }}
            >
              <CardChip status={status} statusText={statusText} />
            </Box>
          )}
          <CardImage
            image={image}
            imageSize={imageSize}
            imageShape={imageShape}
            preview={variant === 'preview'}
          />
        </Box>
        <Box
          sx={{
            padding: 3,
            ...(variant === 'text-only' && {
              padding: spacing(3, 0),
            }),
          }}
        >
          <CardContent {...content} />
          {showButton && (
            <CardButtons
              buttonText={buttonText}
              onButtonClick={onButtonClick}
              onSecondaryButtonClick={onSecondaryButtonClick}
              addButtonClicked={addButtonClicked}
            />
          )}
          {variant === 'text-only' && readMoreLink && readMoreText && (
            <Link
              sx={{
                display: 'block',
                marginTop: '10px',
                textDecoration: 'underline',
                fontSize: 'typography.h4.fontSize',
              }}
              href={readMoreLink}
            >
              {readMoreText}
            </Link>
          )}
        </Box>
      </Box>
    </div>
  )
}
