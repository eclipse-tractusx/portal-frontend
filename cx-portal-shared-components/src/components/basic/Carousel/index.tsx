import Slider from 'react-slick'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IconButton } from '../IconButton'
import { Box } from '@mui/material'
import { Typography } from '../Typography'
import { useState, Children } from 'react'
import { theme } from '../../../theme'
import uniqueId from 'lodash/uniqueId'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export interface CarouselProps {
  children?: React.ReactNode,
  title?: string,
  dots?: boolean,
  infinite?: boolean,
  slidesToShow?: number, 
  itemWidth?: number,
  itemHeight?: number,
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
  title,
  dots,
  infinite,
  slidesToShow,
  itemWidth,
  itemHeight,
}: CarouselProps) => {
  const [showArrows, setShowArrows] = useState(false)
  const onMouseEnter = () => setShowArrows(true)
  const onMouseLeave = () => setShowArrows(false)
  const arrayChildren = Children.toArray(children);

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
    <div>
      { title && 
        <Box>
          <Typography
            sx={{
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: '20px',
              width: 'max-content',
              fontFamily: 'LibreFranklin-Light'
            }}
            variant="h3">
            {title}
          </Typography>    

          <Box
            sx={{
              width: '60px',
              marginLeft: 'auto',
              marginRight: 'auto',
              border: `2px solid ${theme.palette.text.secondary}`
            }}/>
        </Box>
      }

      <Box
        sx={{ 
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
            ':before': {
              content: 'none',
            },
          },
          '.slick-next': {
            ':before': {
              content: 'none',
            },
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
                <Box
                  sx={{
                    width: `${itemWidth}px`,
                    height: `${itemHeight}px`,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: '50px',
                    marginBottom: '50px',
                  }}
                >
                  {child}
                </Box>
              </div>
            )
          })
          }
        </Slider>
      </Box>
    </div>
  )
}
