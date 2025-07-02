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

import { useState, Children, useEffect, useCallback } from 'react'
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
  itemWidth = 266,
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

  useEffect(() => {
    window.addEventListener('resize', updateWindowSize)

    return () => {
      window.removeEventListener('resize', updateWindowSize)
    }
  })

  slidesToShow = slidesToShow && slidesToShow > 0 ? slidesToShow : 1
  slidesToShow =
    slidesToShow && slidesToShow > arrayChildren.length
      ? arrayChildren.length
      : slidesToShow
  gapToArrows = gapToArrows && gapToArrows > 0 ? gapToArrows : 1
  gapBetweenSlides =
    gapBetweenSlides && gapBetweenSlides > 0 ? gapBetweenSlides : 1

  const dotsBottom = expandOnHover ? `${gapBetweenSlides}px` : '-25px'
  const slidsInnerGap = gapBetweenSlides ? `${gapBetweenSlides / 2}px` : 0
  const outerGapToArrow = gapToArrows ? `${gapToArrows}px` : 0
  const innerGapToArrow = gapToArrows ? `${gapToArrows / 2}px` : 0
  const outerGapToDots = gapToDots && dots ? `${gapToDots}px` : 'auto'

  const getCarouselWidth = useCallback(
    (slides: number) =>
      slides && itemWidth && gapBetweenSlides && gapToArrows
        ? slides * itemWidth + slides * gapBetweenSlides + 3 * gapToArrows
        : 0,
    [itemWidth, gapBetweenSlides, gapToArrows]
  )

  const getCarouselLeft = () => {
    return gapBetweenSlides ? `-${2 * gapBetweenSlides}px` : 0
  }

  const [responsiveSlides, setResponsiveSlides] = useState(slidesToShow)
  const [responsiveWidth, setResponsiveWidth] = useState(
    getCarouselWidth(slidesToShow)
  )
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCarouselLeft] = useState(getCarouselLeft())

  const updateWindowSize = () => {
    const appId = document.getElementById('app')
    if (appId?.clientWidth) {
      if (appId.clientWidth >= theme.breakpoints.values.lg) {
        setResponsiveSlides(slidesToShow)
        setCarouselLeft(getCarouselLeft)
      }
      if (
        appId.clientWidth <= theme.breakpoints.values.lg &&
        appId.clientWidth > theme.breakpoints.values.md
      ) {
        setResponsiveSlides(2)
        setCarouselLeft(0)
      }
      if (appId.clientWidth <= theme.breakpoints.values.md) {
        setResponsiveSlides(1)
        setCarouselLeft(0)
      }

      setResponsiveWidth(getCarouselWidth(responsiveSlides))
    } else {
      setCarouselLeft(0)
    }
  }

  useEffect(() => {
    setResponsiveSlides(slidesToShow)
    setResponsiveWidth(getCarouselWidth(slidesToShow))
  }, [slidesToShow, getCarouselWidth])

  const showDotAndArrow = responsiveSlides >= arrayChildren.length

  const settings = {
    dots: !showDotAndArrow,
    infinite,
    slidesToShow: responsiveSlides,
    slidesToScroll: responsiveSlides,
    nextArrow: <NavArrows show={showArrows} isNext={true} />,
    prevArrow: <NavArrows show={showArrows} isNext={false} />,
    arrows: !showDotAndArrow,
  }

  return (
    <Box
      key={slidesToShow}
      sx={{
        width: 'max-content',
        maxWidth: `${responsiveWidth}px`,
        position: `${position}`,
        marginLeft: 'auto',
        marginRight: 'auto',
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
          marginTop: '-10px',
          left: '-33px',
          ':before': {
            content: 'none',
          },
        },
        '.slick-next': {
          top: '50% !important',
          marginTop: '-10px',
          ':before': {
            content: 'none',
          },
        },
        '.slick-slider': {
          paddingLeft: innerGapToArrow,
          paddingRight: innerGapToArrow,
          marginLeft: outerGapToArrow,
          marginRight: outerGapToArrow,
        },
        '.slick-slide': {
          width: 'max-content !important',
        },
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
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: slidsInnerGap }}></Box>
                <Box
                  sx={{
                    width: `${itemWidth}px`,
                    height: itemHeight ? `${itemHeight}px` : '100%',
                    marginTop: `${gapCarouselTop}px`,
                    marginBottom: outerGapToDots,
                  }}
                >
                  {child}
                </Box>
                <Box sx={{ width: slidsInnerGap }}></Box>
              </Box>
            </div>
          )
        })}
      </Slider>
    </Box>
  )
}
