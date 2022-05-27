import { useState } from 'react';
import {Alert, IconButton, Collapse} from '@mui/material'
import {
  CheckCircleOutline,
  WarningAmber,
  InfoOutlined,
  Close,
} from '@mui/icons-material'
import { NotificationContent } from './NotificationContent';
import { theme } from '../../../../theme'

export interface PageNotificationsProps {
  severity?: 'error' | 'warning' | 'info' | 'success'
  onCloseAlert?: React.MouseEventHandler
  title?: string
  description?: string
  contactText?: string
  contactLinks?: string
  contactNewTab?: boolean
  showIcon?: boolean
}

export const PageNotifications = ({
  severity = 'info',
  onCloseAlert,
  title,
  description,
  contactText,
  contactLinks,
  contactNewTab,
  showIcon,
 }: PageNotificationsProps) => {
  const [open, setOpen] = useState(true);

  const color = () => {
  switch (severity) {
    case 'info':
      return theme.palette.support.info
    case 'error':
      return theme.palette.support.error
    case 'warning':
        return theme.palette.support.warning
    case 'success':
      return theme.palette.support.success
    default:
      return ''
  }
  }

  const titleIcon = () => {
  switch (severity) {
    case 'info':
      return <InfoOutlined fontSize="inherit" sx={{color: color}} />
    case 'error':
      return <WarningAmber fontSize="inherit" sx={{color: color}} />
    case 'warning':
      return <WarningAmber fontSize="inherit" sx={{color: color}} />
    case 'success':
      return <CheckCircleOutline fontSize="inherit" sx={{color: color}} />
    default:
      return ''
  }
  }

  return (
    <Collapse in={open}>
      <Alert
        severity={severity}
        variant="outlined"
        onClose={() => onCloseAlert}
        icon={showIcon === false ? false : titleIcon()}
        sx={{borderColor: color, borderRadius: '8px', boxShadow: '0px 20px 40px rgba(80, 80, 80, 0.3)'}}
        action={
          <IconButton
            aria-label="close"
            size="small"
            onClick={() => setOpen(false)}
            sx={{color: theme.palette.icon.icon01, marginTop: '5px', marginRight: '5px' }}
          >
            <Close fontSize="inherit" />
          </IconButton>
        }
      >
        <NotificationContent
          title={title}
          description={description}
          contactText={contactText}
          contactLinks={contactLinks}
          contactNewTab={contactNewTab}
          titleColor={color()}
        />
      </Alert>
    </Collapse>
  )
}
