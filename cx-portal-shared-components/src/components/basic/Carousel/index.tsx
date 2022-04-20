import Slider from 'react-slick'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IconButton } from '../IconButton'
import { Box } from '@mui/material'
import { Typography } from '../Typography'
import { useState, Children } from 'react'
import { theme } from '../../../theme'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export interface CarouselProps {
  children: ChildNode,
  title: string,
  dots?: boolean,
  infinite?: boolean,
  slidesToShow?: number, 
  itemWidth?: number,
  itemHeight?: number,
  border?: boolean,
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
  border,
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
  const arrowTop = itemHeight ? `${itemHeight / 2}px` : '50%'
  return (
    <div>
      { title && 
        <Box sx={{ marginBottom: '60px' }}>
          <Typography
            sx={{
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: '20px',
              width: 'max-content'
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
          padding: '0px 25px 25px 25px',
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
            top: arrowTop
          },
          '.slick-next': {
            top: arrowTop
          },
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Slider {...settings}>
        {Children.map(arrayChildren, (child) => {
          return (
            <div>
              <Box
                sx={{
                  width: `${itemWidth}px`,
                  height: `${itemHeight}px`,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginBottom: '30px',
                  borderRadius: '20px',
                  border: border ? `1px solid ${theme.palette.border.border01}` : 'none',
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
