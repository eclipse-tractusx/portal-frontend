import { Box } from '@mui/material'
import { HeaderTitle } from './Components/HeaderTitle'
import { HeaderSubtract } from './Components/HeaderSubtract'

export interface PageHeaderProps {
  children?: React.ReactNode
  title?: string
  spacingTop?: number
  headerHeight?: number
  hasSubtract?: boolean
}

export const PageHeader = ({
  children,
  title,
  spacingTop,
  headerHeight=314,
  hasSubtract=true,
}: PageHeaderProps) => {
  const top = spacingTop ? (spacingTop * -1) + 36 : 36

  return (
    <Box
      sx={{
        width: '100%',
        height: `${headerHeight}px`,
        marginTop: `${spacingTop}px`,
        background: 'linear-gradient(152.33deg, #adb9c7 4.24%, #e4ebf3 72.17%)',
        position: 'relative',
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
        <HeaderTitle title={title} spacingTop={spacingTop} />
      </Box>
      <HeaderSubtract hasSubtract={hasSubtract} />
    </Box>
  )
}
