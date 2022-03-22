import { useTheme } from '@mui/material'
import MuiDialogContent, {
  DialogContentProps as MuiDialogContentProps,
} from '@mui/material/DialogContent'

export type DialogContentProps = MuiDialogContentProps

export const DialogContent = (props: DialogContentProps) => {
  const { spacing } = useTheme()

  return <MuiDialogContent sx={{ padding: spacing(0, 14, 7) }} {...props} />
}
