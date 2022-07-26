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
  const dotsBottom = arrayChildren.length > 2 ? `0px` : '-25px'
  const arrowsTopMultiRow = itemHeight ? itemHeight + 20 : 0
  const arrowsTopSingleRow = itemHeight ? itemHeight / 2 : 0
  const arrowsTop =
    arrayChildren.length > 2 ? arrowsTopMultiRow : arrowsTopSingleRow

  // check if more than tow items:
  const [carouselHeight, setCarouselHeight] = useState(700)
  const [sliderHeight, setSliderHeight] = useState(508)
  const [carouselWidth, setCarouselWidth] = useState(690)

  useEffect(() => {
    if (arrayChildren.length > 2) {
      const height = 2 * itemHeight + 182
      setCarouselHeight(height)

      const width = 2 * itemWidth + 180
      setCarouselWidth(width)

      setSliderHeight(2 * itemHeight + 100)
    } else {
      setCarouselHeight(400)
    }
  }, [arrayChildren, itemHeight, itemWidth])

  const settings = {
    dots: dots,
    infinite: true,
    slidesToShow: arrayChildren.length > 1 ? 2 : 1,
    slidesToScroll: 2,
    swipeToSlide: false,
    rows: arrayChildren.length > 2 ? 2 : 1,
    nextArrow: <NavArrows show={showArrows} isNext={true} />,
    prevArrow: <NavArrows show={showArrows} isNext={false} />,
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
        },
        '.slick-prev': {
          top: `${arrowsTop}px`,
          left: '-13px',
          ':before': {
            content: 'none',
          },
        },
        '.slick-next': {
          top: `${arrowsTop}px`,
          right: '-6px',
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
          color: 'text.tertiary',
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
            <div key={uniqueId('cax-carousel')}>
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
