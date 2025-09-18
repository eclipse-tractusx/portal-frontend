/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
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

import { useState, Children } from 'react'
import Slider from 'react-slick'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { Box, useTheme } from '@mui/material'

import uniqueId from 'lodash/uniqueId'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { IconButton } from '@cofinity-x/shared-components'

export interface CarouselProps {
  children?: React.ReactNode
  dots?: boolean
  infinite?: boolean
  slidesToShow?: number
  slidesToShowXl?: number
  slidesToShowLg?: number
  slidesToShowMd?: number
  slidesToShowSm?: number
  itemWidth?: number
  itemHeight?: number
  gapBetweenSlides?: number
  gapToDots?: number
  gapToArrows?: number
  gapCarouselTop?: number
  expandOnHover?: boolean
  position?: string
}

function NavArrows(
  props: Readonly<{
    className?: string
    style?: React.CSSProperties
    onClick?: React.MouseEventHandler
    show: boolean
    isNext: boolean
  }>
) {
  const { className, style, onClick } = props
  return (
    <div className={className} style={{ ...style }}>
      {props.show && (
        <IconButton color="secondary" size="small" onClick={onClick}>
          {props.isNext && <ArrowForwardIcon />}

          {!props.isNext && <ArrowBackIcon />}
        </IconButton>
      )}
    </div>
  )
}

export const Carousel = ({
  children,
  dots = true,
  infinite = true,
  slidesToShow = 4,
  slidesToShowXl,
  slidesToShowLg,
  slidesToShowMd,
  slidesToShowSm,
  itemWidth: _itemWidth = 266,
  itemHeight = 279,
  gapBetweenSlides = 32,
  gapToDots = 40,
  gapToArrows = 32,
  gapCarouselTop = 32,
  expandOnHover = false,
  position = 'relative',
}: CarouselProps) => {
  const theme = useTheme()
  const [showArrows, setShowArrows] = useState(false)
  const onMouseEnter = () => {
    setShowArrows(true)
  }
  const onMouseLeave = () => {
    setShowArrows(false)
  }
  const arrayChildren = Children.toArray(children)
  const cardCount = arrayChildren.length

  const clampSlides = (n: number | undefined, fallback: number) => {
    const base = n && n > 0 ? n : fallback
    return base > cardCount ? cardCount : base
  }

  const slidesToShowBase = clampSlides(slidesToShow, 4)
  const slidesToShowXlValue = clampSlides(slidesToShowXl, slidesToShowBase)
  const slidesToShowLgValue = clampSlides(slidesToShowLg, slidesToShowBase)
  const slidesToShowMdValue = clampSlides(slidesToShowMd, 2)
  const slidesToShowSmValue = clampSlides(slidesToShowSm, 1)

  gapToArrows = gapToArrows && gapToArrows > 0 ? gapToArrows : 1
  gapBetweenSlides =
    gapBetweenSlides && gapBetweenSlides > 0 ? gapBetweenSlides : 1

  const dotsBottom = expandOnHover ? `${gapBetweenSlides}px` : '-25px'
  const slidsInnerGap = gapBetweenSlides ? `${gapBetweenSlides / 2}px` : 0
  const outerGapToArrow = gapToArrows ? `${gapToArrows}px` : 0
  const innerGapToArrow = gapToArrows ? `${gapToArrows / 2}px` : 0
  const outerGapToDots = gapToDots && dots ? `${gapToDots}px` : 'auto'

  const showDotAndArrow = cardCount <= slidesToShowXlValue

  const settings = {
    dots: !showDotAndArrow,
    infinite,
    slidesToShow: slidesToShowXlValue,
    slidesToScroll: slidesToShowXlValue,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.md, // below md => use sm config
        settings: {
          slidesToShow: slidesToShowSmValue,
          slidesToScroll: slidesToShowSmValue,
          dots: cardCount > slidesToShowSmValue,
          arrows: cardCount > slidesToShowSmValue,
        },
      },
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: slidesToShowMdValue,
          slidesToScroll: slidesToShowMdValue,
          dots: cardCount > slidesToShowMdValue,
          arrows: cardCount > slidesToShowMdValue,
        },
      },
      {
        breakpoint: theme.breakpoints.values.xl,
        settings: {
          slidesToShow: slidesToShowLgValue,
          slidesToScroll: slidesToShowLgValue,
          dots: cardCount > slidesToShowLgValue,
          arrows: cardCount > slidesToShowLgValue,
        },
      },
    ],
    nextArrow: <NavArrows show={showArrows} isNext={true} />,
    prevArrow: <NavArrows show={showArrows} isNext={false} />,
    arrows: !showDotAndArrow,
  }

  if (cardCount <= 1) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: itemHeight ? `${itemHeight}px` : 'auto',
          mt: `${gapCarouselTop}px`,
        }}
      >
        {children}
      </Box>
    )
  }

  return (
    <Box
      key={`${slidesToShowBase}-${arrayChildren.length}`}
      sx={{
        width: 'calc(100% - 100px)',
        position: `${position}`,
        li: {
          margin: 0,
          button: {
            ':before': {
              opacity: '.9',
              fontSize: 8,
            },
          },
          '&.slick-active': {
            button: {
              ':before': {
                opacity: '.9',
                fontSize: 12,
              },
            },
          },
        },
        '.slick-prev': {
          top: '50% !important',
          marginTop: '-66px',
          left: '-20px',
          ':before': {
            content: 'none',
          },
        },
        '.slick-next': {
          top: '50% !important',
          marginTop: '-66px',
          right: '-20px',
          ':before': {
            content: 'none',
          },
        },
        '.slick-slider': {
          width: '100%',
          paddingLeft: innerGapToArrow,
          paddingRight: innerGapToArrow,
          marginLeft: outerGapToArrow,
          marginRight: outerGapToArrow,
        },
        '.slick-slide': {},
        '.slick-dots': {
          marginLeft: '-16px',
          bottom: dotsBottom,
        },
        img: {
          display: 'initial',
        },
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Slider {...settings}>
        {Children.map(arrayChildren, (child) => {
          return (
            <div key={uniqueId('cax-carousel')}>
              <Box
                sx={{
                  width: '100%',
                  height: itemHeight ? `${itemHeight}px` : 'auto',
                  mt: `${gapCarouselTop}px`,
                  mb: outerGapToDots,
                  px: slidsInnerGap,
                }}
              >
                {child}
              </Box>
            </div>
          )
        })}
      </Slider>
    </Box>
  )
}
