import { ArrowForward } from '@mui/icons-material'
import { BoxProps, Divider, Link, ListItem, useTheme } from '@mui/material'
import { useState } from 'react'
import { MenuType } from '.'
import { Chip } from '../Chip'

type LinkItem = Partial<Record<'href' | 'to', string>>

export interface MenuItemProps extends LinkItem {
  title: string
  hint?: string
  children?: MenuItemProps[]
  component?: React.ElementType
  divider?: boolean
  menuProps?: BoxProps
  onClick?: React.MouseEventHandler
  Menu?: MenuType
}

export const MenuItem = ({
  title,
  hint,
  children,
  divider,
  component = Link,
  menuProps,
  onClick,
  Menu,
  ...props
}: MenuItemProps) => {
  const { spacing } = useTheme()
  const [open, setOpen] = useState(false)

  const onMouseEnter = () => setOpen(true)

  const onMouseLeave = () => setOpen(false)

  return (
    <ListItem
      sx={{
        display: 'block',
        position: 'relative',
        padding: spacing(0, 1),
        ...(onClick && { cursor: 'pointer' }),
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <Link
        component={component}
        sx={{
          color: 'text.primary',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: spacing(1.5, 2),
          borderRadius: 3,
          typography: 'label3',
          textDecoration: 'none',
          ':hover': {
            backgroundColor: 'selected.hover',
            color: 'primary.dark',
            '.MuiSvgIcon-root': {
              color: 'primary.dark',
            },
          },
        }}
        {...props}
      >
        {title}
        {hint && <Chip label={hint} type="plain" sx={{ height: 'auto' }} />}
        {children && (
          <ArrowForward fontSize="small" sx={{ color: 'icon.icon02' }} />
        )}
      </Link>
      {Menu && children && open && <Menu items={children} {...menuProps} />}
      {divider && <Divider />}
    </ListItem>
  )
}
