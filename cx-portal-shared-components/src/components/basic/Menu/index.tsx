import { Box, BoxProps, Divider, List, useTheme } from '@mui/material'
import uniqueId from 'lodash/uniqueId'
import { MenuItem, MenuItemProps } from './MenuItem'

export interface MenuProps extends BoxProps {
  items: MenuItemProps[]
  component?: React.ElementType
  divider?: boolean
}

export const Menu = ({ items, divider, component, ...props }: MenuProps) => {
  const { spacing } = useTheme()

  return (
    <Box {...props}>
      <List sx={{ padding: 0 }}>
        {items?.map((item) => (
          <MenuItem
            {...item}
            component={component}
            menuProps={props}
            Menu={Menu}
            key={uniqueId('Menu')}
          />
        ))}
      </List>
      {divider && <Divider sx={{ margin: spacing(0, 1) }} />}
    </Box>
  )
}

export type MenuType = typeof Menu
