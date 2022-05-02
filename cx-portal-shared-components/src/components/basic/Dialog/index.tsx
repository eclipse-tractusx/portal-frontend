import MuiDialog, { DialogProps as MuiDialogProps } from '@mui/material/Dialog'

export type DialogProps = Pick<
  MuiDialogProps,
  'children' | 'open' | 'scroll' | 'sx'
>

export const Dialog = ({ scroll = 'body', ...props }: DialogProps) => {
  return <MuiDialog scroll={scroll} {...props} />
}
