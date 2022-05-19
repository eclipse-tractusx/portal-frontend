import MuiAlert from '@mui/material/Alert'

interface AlertProps {
  severity?: 'error' | 'warning' | 'info' | 'success'
  children?: JSX.Element
}

export const Alert = ({ severity = 'info', children }: AlertProps) => (
  <MuiAlert severity={severity}>{children}</MuiAlert>
)
