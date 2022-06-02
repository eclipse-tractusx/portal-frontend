import React from 'react'
import { Box, useTheme } from '@mui/material'
import MuiDialogTitle from '@mui/material/DialogTitle'
import { Typography } from '../Typography'
import { IconButton } from '../IconButton'
import CloseIcon from '@mui/icons-material/Close'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'

export interface DialogHeaderProps {
  title: string
  intro?: string
  icon?: boolean
  closeWithIcon?: boolean
  onCloseWithIcon?: (event: React.MouseEvent) => void
}

export const DialogHeader = ({
  title,
  intro,
  icon,
  closeWithIcon,
  onCloseWithIcon,
}: DialogHeaderProps) => {
  const { spacing, palette } = useTheme()

  return (
    <Box sx={{ padding: spacing(7, 14), textAlign: 'center' }}>
      <MuiDialogTitle>
        { icon && (
          <Box><CheckCircleOutlineOutlinedIcon sx={{ fontSize: 60 }} color="success" /></Box>
        )}
        {title}
        {closeWithIcon && (
          <IconButton
            aria-label="close"
            onClick={onCloseWithIcon}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              color: palette.action.active,
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </MuiDialogTitle>
      {intro && (
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          {intro}
        </Typography>
      )}
    </Box>
  )
}
