import { Box } from '@mui/material'
import { Typography } from '../../Typography'
import { PageNotificationsProps } from '.'

interface NotificationContentProps {
  titleColor?: string
}

export const NotificationContent = ({
  title,
  description,
  contactText,
  contactLinks,
  contactNewTab,
  titleColor,
}: NotificationContentProps & PageNotificationsProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {title && (
        <Typography
          variant="h5"
          sx={{ marginRight: '10px', color: titleColor, width: 'max-content' }}
        >
          {title}
        </Typography>
      )}
      {description && (
        <Typography variant="body1">
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
        </Typography>
      )}
    </Box>
  )
}
