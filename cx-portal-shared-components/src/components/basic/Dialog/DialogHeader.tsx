import { Box, useTheme } from '@mui/material'
import MuiDialogTitle from '@mui/material/DialogTitle'
import { Typography } from '../Typography'

export interface DialogHeaderProps {
  title: string
  intro?: string
}

export const DialogHeader = ({ title, intro }: DialogHeaderProps) => {
  const { spacing } = useTheme()

  return (
    <Box sx={{ padding: spacing(7, 14), textAlign: 'center' }}>
      <MuiDialogTitle>{title}</MuiDialogTitle>
      {intro && (
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          {intro}
        </Typography>
      )}
    </Box>
  )
}
