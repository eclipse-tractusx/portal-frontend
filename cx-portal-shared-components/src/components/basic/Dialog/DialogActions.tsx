import { Box, useTheme } from '@mui/material'
import MuiDialogActions, {
  DialogActionsProps as MuiDialogActionsProps,
} from '@mui/material/DialogActions'

export interface DialogActionProps extends MuiDialogActionsProps {
  helperText?: string
}

export const DialogActions = ({
  children,
  helperText,
  ...props
}: DialogActionProps) => {
  const { spacing } = useTheme()

  return (
    <Box
      sx={{
        padding: spacing(7, 14),
        backgroundColor: 'background.background09',
      }}
    >
      {helperText && (
        <Box
          sx={{ paddingBottom: 4, typography: 'body3', textAlign: 'center' }}
        >
          {helperText}
        </Box>
      )}
      <MuiDialogActions {...props}>{children}</MuiDialogActions>
    </Box>
  )
}
