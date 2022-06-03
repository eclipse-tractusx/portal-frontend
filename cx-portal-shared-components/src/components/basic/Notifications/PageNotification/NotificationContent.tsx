import { Box } from '@mui/material'
import { PageNotificationsProps } from '.'

interface NotificationContentProps extends Omit<PageNotificationsProps, 'onCloseNotification' | 'open'> {
  titleColor?: string
}

export const NotificationContent = ({
  title,
  description,
  contactText,
  contactLinks,
  contactNewTab,
  titleColor,
}: NotificationContentProps) => {
  return (
    <Box>
      {title && (
        <span
          style={{ marginRight: '10px', color: titleColor, width: 'max-content', fontWeight: 'bold' }}
        >
          {title}
        </span>
      )}
      {description && (
        <span>
          {description}
          {contactText && (
            <a
              style={{ marginLeft: '10px', paddingTop: '3px' }}
              href={contactLinks}
              target={contactNewTab ? '_blank' : ''}
              rel="noreferrer"
            >
              {contactText}
            </a>
          )}
        </span>
      )}
    </Box>
  )
}
