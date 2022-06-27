import { Box } from '@mui/material'
import { mainNavigationHeight } from '../../MainNavigation'
import { MainHeaderTitle } from './Components/MainHeaderTitle'

export interface MainHeaderProps {
  children?: React.ReactNode
  title?: string
  subTitle?: string
  subTitleWidth?: number
  headerHeight?: number
  background?: 'LinearGradient1' | 'LinearGradient2' | 'LinearGradient3' | 'LinearGradient4'
  imagePath?: string
}

export const MainHeader = ({
  children,
  title,
  subTitle,
  subTitleWidth,
  headerHeight = 645,
  background = 'LinearGradient1',
  imagePath,
}: MainHeaderProps) => {
  const backgroundstyle = () => {
    if (background === 'LinearGradient1') {
      return {
        direction: 152.33,
        colorFrom: '#adb9c7 4.24%',
        colorTo: '#e4ebf3 72.17%',
      }
    } else if (background === 'LinearGradient3') {
      return {
        direction: 292.62,
        colorFrom: '#FF782C -16.38%',
        colorTo: '#FFB326 82.22%',
      }
    } else if (background === 'LinearGradient4') {
      return {
        direction: 111.81,
        colorFrom: '#9EABA9 41.97%',
        colorTo: '#B6A763 72.9%',
      }
    } else {
      return {
        direction: 145.91,
        colorFrom: '#F0F2F5 18.42%',
        colorTo: '#B4BBC3 79.14%',
      }
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: `${headerHeight}px`,
        marginTop: `${-mainNavigationHeight}px`,
        position: 'relative',
        background: `linear-gradient(${backgroundstyle().direction}deg, ${
          backgroundstyle().colorFrom
        }, ${backgroundstyle().colorTo})`,
      }}
    >
      {imagePath && (
        <Box
          sx={{
            height: '100%',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <img
            src={imagePath}
            alt="home stage"
            className="object-fit x-left-40"
            style={{
              bottom: 0,
              height: '100%',
              left: 0,
              objectFit: 'cover',
              right: 0,
              top: 0,
              visibility: 'visible',
              width: '100%',
            }}
          />
        </Box>
      )}

      <Box
        sx={{
          maxWidth: '1200px',
          padding: '0px 100px',
          margin: '0px',
          paddingTop: '150px',
          zIndex: 1,
          position: 'absolute',
          top: '0px',
        }}
      >
        <MainHeaderTitle
          title={title}
          subTitle={subTitle}
          subTitleWidth={subTitleWidth}
        />

        {children}
      </Box>
    </Box>
  )
}
