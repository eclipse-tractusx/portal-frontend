import { Box } from '@mui/material'
import { HeaderTitle } from './Components/HeaderTitle'
import { HeaderSubtractOption1 } from './Components/HeaderSubtractOption1'
import { HeaderSubtractOption2 } from './Components/HeaderSubtractOption2'
import { HeaderSubtractOption3 } from './Components/HeaderSubtractOption3'

export interface PageHeaderProps {
  children?: React.ReactNode
  title?: string
  topPage?: boolean
  headerHeight?: number
  hasSubtract?: boolean
  subtractOption?: 'Option1' | 'Option2' | 'Option3'
  background?: 'LinearGradient1' | 'LinearGradient2'
}

export const PageHeader = ({
  children,
  title,
  topPage = false,
  headerHeight = 314,
  hasSubtract = true,
  subtractOption = 'Option1',
  background = 'LinearGradient1',
}: PageHeaderProps) => {
  const top = topPage ? -49 : 36
  const spacingTop = topPage ? -85 : 0

  const backgroundstyle = () => {
    if (background === 'LinearGradient1') {
      return {
        direction: 152.33,
        colorFrom: '#adb9c7 4.24%',
        colorTo: '#e4ebf3 72.17%',
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
        marginTop: `${spacingTop}px`,
        position: 'relative',
        background: `linear-gradient(${backgroundstyle().direction}deg, ${
          backgroundstyle().colorFrom
        }, ${backgroundstyle().colorTo})`,
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
        <HeaderTitle title={title} />
      </Box>
      {subtractOption === 'Option1' && (
        <HeaderSubtractOption1 hasSubtract={hasSubtract} />
      )}
      {subtractOption === 'Option2' && (
        <HeaderSubtractOption2 hasSubtract={hasSubtract} />
      )}
      {subtractOption === 'Option3' && (
        <HeaderSubtractOption3 hasSubtract={hasSubtract} />
      )}
    </Box>
  )
}
