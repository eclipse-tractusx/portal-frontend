import { Children } from 'react'
import { Box } from '@mui/material'
import { theme } from '../../../theme'
import { MenuProps } from '../../basic/Menu'
import { Navigation } from '../../content/Navigation'

export interface MainNavigationProps extends MenuProps {
  children?: React.ReactNode
}

export const MainNavigation = ({
  children,
  items,
  component,
}: MainNavigationProps) => {
  const arrayChildren = Children.toArray(children)

  return (
    <Box
      sx={{
        height: '85px',

        display: 'flex',
        padding: '22px 30px'
      }}
    >
      
      {arrayChildren.length &&
        <Box sx={{ width: '170px' }}>
          {arrayChildren[0]}
        </Box>
      }

      <Box
        sx={{
          marginRight: 'auto',
          marginLeft: 'auto',
        }}
      >
        <Navigation
          items={items}
          component={component}
        />
      </Box>

      {arrayChildren.length &&
        <Box sx={{ width: '122px' }}>
          {arrayChildren[1]}
        </Box>
      }
    </Box>
  )
}
