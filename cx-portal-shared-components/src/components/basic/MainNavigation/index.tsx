import { Children } from 'react'
import { Box } from '@mui/material'
import { theme } from '../../../theme'
import { MenuProps } from '../../basic/Menu'
import { Navigation } from '../../content/Navigation'

export interface MainNavigationProps extends MenuProps {
  children?: React.ReactNode
}

export const mainNavigationHieght = 85

export const MainNavigation = ({
  children,
  items,
  component,
}: MainNavigationProps) => {
  const arrayChildren = Children.toArray(children)

  return (
    <Box
      sx={{
        height: `${mainNavigationHieght}px`,
        display: 'flex',
        padding: '0px 30px',
        backgroundImage:
          'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXc3NyBAeViAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==)',
        backgroundRepeat: 'repeat-x',
        backgroundPosition: '0 bottom',
      }}
    >
      {arrayChildren.length && (
        <Box
          sx={{
            width: '170px',
            paddingTop: '22px',
            paddingBottom: '22px',
          }}
        >
          {arrayChildren[0]}
        </Box>
      )}

      <Box
        sx={{
          marginRight: 'auto',
          marginLeft: 'auto',
          paddingTop: '22px',
          paddingBottom: '22px',
        }}
      >
        <Navigation items={items} component={component} />
      </Box>

      {arrayChildren.length && (
        <Box
          sx={{
            width: '122px',
            paddingTop: '22px',
            paddingBottom: '22px',
          }}
        >
          {arrayChildren[1]}
        </Box>
      )}
    </Box>
  )
}
