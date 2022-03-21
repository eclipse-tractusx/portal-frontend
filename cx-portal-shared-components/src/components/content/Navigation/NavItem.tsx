import { Box, Link, useTheme } from '@mui/material'
import { useState } from 'react'
import classNames from 'classnames'
import { Menu } from '../../basic/Menu'
import { MenuItemProps } from '../../basic/Menu/MenuItem'

interface NavItemProps extends MenuItemProps {
  isActive?: boolean
  unstyled?: boolean
}

export const NavItem = ({
  title,
  children,
  component = Link,
  isActive = false,
  unstyled = false,
  ...props
}: NavItemProps) => {
  const { spacing, shadows } = useTheme()
  const [open, setOpen] = useState(false)

  const onMouseEnter = () => setOpen(true)

  const onMouseLeave = () => setOpen(false)

  return (
    <Box
      sx={{ position: 'relative' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link
        className={classNames({ active: isActive })}
        component={component}
        sx={{
          display: 'block',
          typography: 'body3',
          margin: spacing(0, 1),
          ':hover, &.active': {
            color: 'primary.dark',
          },
          ...(!unstyled && {
            typography: 'label3',
            color: 'text.tertiary',
            padding: spacing(1, 0),
            margin: spacing(0, 2),
            '&.active': {
              color: 'primary.main',
              borderBottom: '2px solid',
              marginBottom: '-2px',
            },
          }),
        }}
        {...props}
      >
        {title}
      </Link>
      {children && open && (
        <Menu
          items={children}
          component={component}
          sx={{
            position: 'absolute',
            top: spacing(4.5),
            left: spacing(-1),
            width: 256,
            padding: spacing(2, 0),
            borderRadius: 4,
            backgroundColor: 'background.background01',
            boxShadow: shadows['20'],
            '.MuiBox-root': {
              left: 256,
              top: spacing(-2),
            },
          }}
        />
      )}
    </Box>
  )
}
