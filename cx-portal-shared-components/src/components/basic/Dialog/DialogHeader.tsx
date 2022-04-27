import React from 'react'
import { Box, useTheme } from '@mui/material'
import MuiDialogTitle from '@mui/material/DialogTitle'
import { Typography } from '../Typography'
import { IconButton } from '../IconButton'
import CloseIcon from '@mui/icons-material/Close'

export interface DialogHeaderProps {
  title: string
  intro?: string
  closeWithIcon?: boolean
  onCloseWithIcon?: (event: React.MouseEvent) => void
}

export const DialogHeader = ({
  title,
  intro,
  closeWithIcon,
  onCloseWithIcon,
}: DialogHeaderProps) => {
  const { spacing, palette } = useTheme()

  return (
    <Box sx={{ padding: spacing(7, 14), textAlign: 'center' }}>
      <MuiDialogTitle>
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
