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

import { useState, Children, useEffect } from 'react'
import Slider from 'react-slick'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IconButton } from '../IconButton'
import { Box } from '@mui/material'
import uniqueId from 'lodash/uniqueId'
import { Typography } from '../Typography'
import { theme } from '../../../theme'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export interface CarouselProps {
  children?: React.ReactNode
  title: string
  dots?: boolean
  itemWidth?: number
  itemHeight?: number
  backgroundColor?: string
  hasBorder?: boolean
  borderRadius?: number
}

function NavArrows(props: any) {
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

export const CarouselBox = ({
  children,
  title,
  dots = true,
  itemWidth = 266,
  itemHeight = 235,
  backgroundColor = '#fff',
  hasBorder = true,
  borderRadius = 20,
}: CarouselProps) => {
  const [showArrows, setShowArrows] = useState(false)
  const onMouseEnter = () => setShowArrows(true)
  const onMouseLeave = () => setShowArrows(false)
  const arrayChildren = Children.toArray(children)
  const itemsCount = arrayChildren.length > 2
  const dotsBottom = itemsCount ? `0px` : '-25px'
  const arrowsTopMultiRow = itemHeight ? itemHeight + 35 : 0
  const arrowsTopSingleRow = itemHeight ? itemHeight / 2 : 0
  const arrowsTop = itemsCount ? arrowsTopMultiRow : arrowsTopSingleRow

  // check if more than tow items:
  const [carouselHeight, setCarouselHeight] = useState(700)
  const [sliderHeight, setSliderHeight] = useState(508)
  const [carouselWidth, setCarouselWidth] = useState(690)

  useEffect(() => {
    if (itemsCount) {
      const height = 2 * itemHeight + 172
      setCarouselHeight(height)

      const width = 2 * itemWidth + 180
      setCarouselWidth(width)

      setSliderHeight(2 * itemHeight + 100)
    } else {
      setCarouselHeight(382)
      setSliderHeight(itemHeight + 100)

      const width = 2 * itemWidth + 180
      setCarouselWidth(width)
    }
  }, [itemHeight, itemWidth, itemsCount])

  const settings = {
    dots: dots && itemsCount,
    infinite: itemsCount,
    slidesToShow: itemsCount ? 2 : 1,
    slidesToScroll: 2,
    swipeToSlide: false,
    rows: itemsCount ? 2 : 1,
    nextArrow: itemsCount ? (
      <NavArrows show={showArrows} isNext={true} />
    ) : (
      <></>
    ),
    prevArrow: itemsCount ? (
      <NavArrows show={showArrows} isNext={false} />
    ) : (
      <></>
    ),
  }

  return (
    <Box
      sx={{
        backgroundColor: backgroundColor,
        border: hasBorder ? `1px solid ${theme.palette.border.border02}` : '',
        borderRadius: `${borderRadius}px`,
        height: `${carouselHeight}px`,
        width: `${carouselWidth}px`,
        position: 'relative',
        left: '15px',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: '0px 10px 20px rgba(80, 80, 80, 0.3)',
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
        '.slick-list': {
          paddingBottom: '50px',
          paddingLeft: '5px',
        },
        '.slick-prev': {
          top: `${arrowsTop}px`,
          left: '-8px',
          ':before': {
            content: 'none',
          },
        },
        '.slick-next': {
          top: `${arrowsTop}px`,
          right: '5px',
          ':before': {
            content: 'none',
          },
        },
        '.slick-slider': {
          paddingLeft: '32px',
          paddingRight: '32px',
          marginLeft: '32px',
          marginRight: '32px',
          height: `${sliderHeight}px`,
        },
        '.slick-slide': {
          width: 'max-content !important',
        },
        '.slick-dots': {
          marginLeft: '-32px',
          bottom: dotsBottom,
        },
        img: {
          display: 'initial',
        },
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Typography
        variant="h4"
        sx={{
          margin: '0 auto',
          paddingTop: '20px',
          width: 'fit-content',
          height: '50px',
        }}
      >
        {title}
      </Typography>
      <Slider {...settings}>
        {Children.map(arrayChildren, (child) => {
          return (
            <div key={uniqueId('box-carousel')}>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: '12px' }}></Box>
                <Box
                  sx={{
                    width: `${itemWidth}px`,
                    height: `${itemHeight}px`,
                    marginTop: `20px`,
                  }}
                >
                  {child}
                </Box>
                <Box sx={{ width: '12px' }}></Box>
              </Box>
            </div>
          )
        })}
      </Slider>
    </Box>
  )
}
