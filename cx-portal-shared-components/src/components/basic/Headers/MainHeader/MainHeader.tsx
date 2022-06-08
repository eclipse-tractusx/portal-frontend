import { Box } from '@mui/material'
import { MainHeaderTitle } from './Components/MainHeaderTitle'

export interface MainHeaderProps {
  children?: React.ReactNode
  title?: string
  topPage?: boolean,
  headerHeight?: number
  background?: 'LinearGradient1' | 'LinearGradient2'
}

export const MainHeader = ({
  children,
  title,
  topPage = false,
  headerHeight = 645,
  background = 'LinearGradient1',
}: MainHeaderProps) => {
  const top = topPage ? -49 : 36
  const spacingTop = topPage ? -85 : 0

  const backgroundstyle = () => {
    if (background === 'LinearGradient1') {
      return {
        direction: 152.33,
        colorFrom: '#adb9c7 4.24%',
        colorTo:'#e4ebf3 72.17%',
      }
    } else {
      return {
        direction: 145.91,
        colorFrom: '#F0F2F5 18.42%',
        colorTo:'#B4BBC3 79.14%',
      }
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: `${headerHeight}px`,
        marginTop: `${spacingTop}px`,
        position: 'relative',
        background: `linear-gradient(${backgroundstyle().direction}deg, ${backgroundstyle().colorFrom}, ${backgroundstyle().colorTo})`,
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          padding: '0px 20px',
          margin: '0px auto',
          paddingTop: `${top}px`,
        }}
      >
        {children}
        <MainHeaderTitle title={title} />
      </Box>
    </Box>
  )
}
