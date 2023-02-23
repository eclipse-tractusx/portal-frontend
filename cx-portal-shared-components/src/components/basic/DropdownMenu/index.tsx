import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { useTheme } from '@mui/material'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import { Theme } from '@mui/material/styles'
import { SxProps } from '@mui/system'
import * as React from 'react'
import { PropsWithChildren, useRef, useState } from 'react'

export interface DropdownMenuProps {
  buttonText: string | JSX.Element
  buttonSx?: SxProps<Theme>
  menuSx?: SxProps<Theme>
}

export const DropdownMenu = ({
  buttonText,
  children,
  buttonSx,
  menuSx,
}: PropsWithChildren<DropdownMenuProps>) => {
  const theme = useTheme()

  const [open, setOpen] = useState(false)

  const anchorElRef = useRef(null)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="outlined"
        disableElevation
        onClick={handleOpen}
        ref={anchorElRef}
        endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        sx={{
          paddingY: 2,
          paddingX: 3,
          borderRadius: '8px',
          typography: 'label2',
          transition: theme.transitions.create('all'),
          color: open ? 'primary.hover' : 'text.secondary',
          backgroundColor: open ? 'selected.hover' : 'background.background01',
          '&:hover': {
            backgroundColor: 'selected.hover',
          },
          '&, &:hover, &:focus': {
            border: 'none',
            boxShadow: '0px 10px 20px 0px rgba(80, 80, 80, 0.3)',
          },
          '.MuiSvgIcon-root': {
            color: open ? 'inherit' : 'icon.icon02',
          },
          ...buttonSx,
        }}
      >
        {buttonText}
      </Button>
      <Menu
        anchorEl={anchorElRef.current}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        elevation={0}
        sx={{
          marginTop: 3,
          '.MuiPaper-root': {
            boxShadow: '0px 10px 20px 0px #5050504D',
            borderRadius: '8px',
            overflowX: 'visible',
            overflowY: 'visible',
            paddingX: 1,
          },
          '.MuiMenuItem-root': {
            paddingX: 2,
            paddingY: 2,
            minWidth: '220px',
            typography: 'label3',
            transition: theme.transitions.create('background-color'),
            '&:hover': {
              backgroundColor: 'background.background12',
            },
            '&:active': {
              backgroundColor: 'selected.focus',
            },
            '&:focus': {
              boxShadow: 'none',
            },
            '& .MuiSvgIcon-root': {
              color: 'icon.icon03',
              marginRight: 1.5,
            },
          },
          ...menuSx,
        }}
      >
        {children}
      </Menu>
    </div>
  )
}
