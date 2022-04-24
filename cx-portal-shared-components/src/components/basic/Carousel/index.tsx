import { useState, useEffect , Children } from 'react'
import Slider from 'react-slick'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IconButton } from '../IconButton'
import { Box } from '@mui/material'
import { theme } from '../../../theme'
import uniqueId from 'lodash/uniqueId'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
export interface CarouselProps {
  children?: React.ReactNode,
  dots?: boolean,
  infinite?: boolean,
  slidesToShow?: number, 
  itemWidth?: number,
  itemHeight?: number,
  gapBetweenSlides?: number,
  gapToDots?: number,
  gapToArrows?: number,
}

function NavArrows(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style}}
    >
      { props.show &&
        <IconButton
          color="secondary"
          size="small"
          onClick={onClick}
        >
          { props.isNext &&
            <ArrowForwardIcon />
          }

          { !props.isNext &&
            <ArrowBackIcon />
          }
        </IconButton>
      }
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
}: CarouselProps) => {
  const [showArrows, setShowArrows] = useState(false)
  const onMouseEnter = () => setShowArrows(true)
  const onMouseLeave = () => setShowArrows(false)
  const arrayChildren = Children.toArray(children)

  slidesToShow = slidesToShow && slidesToShow > 0 ? slidesToShow : 1
  slidesToShow = slidesToShow && slidesToShow > arrayChildren.length ? arrayChildren.length : slidesToShow
  gapToArrows = gapToArrows && gapToArrows > 0 ? gapToArrows : 1
  gapBetweenSlides = gapBetweenSlides && gapBetweenSlides > 0 ? gapBetweenSlides : 1

  const carouselLeft = gapBetweenSlides ? `-${2 * gapBetweenSlides}px` : 0
  const slidsInnerGap = gapBetweenSlides ? `${gapBetweenSlides / 2}px` : 0
  const outerGapToArrow = gapToArrows ? `${gapToArrows}px` : 0;
  const innerGapToArrow = gapToArrows ? `${gapToArrows / 2}px` : 0;
  const outerGapToDots = gapToDots && dots ? `${gapToDots}px` : 'auto'
  const carouselWidth = slidesToShow && itemWidth && gapBetweenSlides && gapToArrows ? 
    slidesToShow * itemWidth + (slidesToShow * gapBetweenSlides) + 3 * gapToArrows : 
    'auto'

    const settings = {
    dots: dots,
    infinite: infinite,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    swipeToSlide: false,
    nextArrow: <NavArrows show={showArrows} isNext={true} />,
    prevArrow: <NavArrows show={showArrows} isNext={false} />,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
  };

  return (
    <Box
      sx={{
        width: carouselWidth,
        position: 'relative',
        left: carouselLeft,
        marginLeft: 'auto',
        marginRight: 'auto',
        li: {
          margin: 0,
          button: {
            ':before': {
              opacity: '.9',
              fontSize: 8,
            }
          },
          '&.slick-active': {
            button: {
              ':before': {
                opacity: '.9',
                fontSize: 12,
              }
            },
          }
        },
        '.slick-prev': {
          left: '-33px',
          ':before': {
            content: 'none',
          },
        },
        '.slick-next': {
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
          marginLeft: '-20px'
        },
        'img': {
          display: 'initial',
        }
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Slider {...settings}>
        {Children.map(arrayChildren, (child) => {
          return (
            <div key={uniqueId('cax-carousel')}>
              <Box sx={{display:"flex"}}>
                <Box sx={{width: slidsInnerGap}}></Box>
                <Box
                  sx={{
                    width: `${itemWidth}px`,
                    height: `${itemHeight}px`,
                    marginTop: outerGapToDots,
                    marginBottom: outerGapToDots,
                  }}
                >
                  {child}
                </Box>
                <Box sx={{width: slidsInnerGap}}></Box>
              </Box>
            </div>
          )
        })
        }
      </Slider>
    </Box>
  )
}
