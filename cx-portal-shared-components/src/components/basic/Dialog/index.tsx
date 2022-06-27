import MuiDialog, { DialogProps as MuiDialogProps } from '@mui/material/Dialog'

interface AddtionalDialogProps {
  modalBorderRadius?: number
}

export type DialogProps = Pick<
  MuiDialogProps,
  'children' | 'open' | 'scroll' | 'sx'
>

export const Dialog = ({
  scroll = 'body',
  modalBorderRadius,
  ...props
}: DialogProps & AddtionalDialogProps) => {
  const radius =
    modalBorderRadius && modalBorderRadius !== 0 ? modalBorderRadius : 10
  return (
    <MuiDialog
      {...props}
      scroll={scroll}
      sx={{
        '.MuiPaper-root': {
          borderRadius: `${radius}px !important`,
        },
      }}
    />
  )
}
