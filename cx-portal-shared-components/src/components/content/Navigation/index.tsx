import { Box } from '@mui/material'
import uniqueId from 'lodash/uniqueId'
import { MenuProps } from '../../basic/Menu'
import { NavItem } from './NavItem'

export interface NavigationProps extends MenuProps {
  active?: string
  unstyled?: boolean
}

export const Navigation = ({
  items,
  component,
  active = '',
  unstyled = false,
}: NavigationProps) => {
  return (
    <Box component="nav" sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {items?.map((link) => {
        const isActive = link.href === active || link.to === active

        return (
          <NavItem
            {...link}
            isActive={isActive}
            component={component}
            unstyled={unstyled}
            key={uniqueId('Navigation')}
          />
        )
      })}
    </Box>
  )
}
