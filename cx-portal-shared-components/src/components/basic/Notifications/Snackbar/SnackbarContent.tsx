import { Box } from '@mui/material'
import { Typography } from '../../Typography'
import { PageNotificationsProps } from '../PageNotification'

interface SnackbarContentProps {
  children?: React.ReactNode
  titleColor?: string
}

export const SnackbarContent = ({
  children,
  title,
  description,
  contactText,
  contactLinks,
  contactNewTab,
  showIcon,
  titleColor,
}: SnackbarContentProps & PageNotificationsProps) => {
  const descriptionPadding = showIcon ? '20px' : '0px'
  return (
    <Box>
      <Box sx={{display: 'flex'}}>
        <Box sx={{paddingRight: '12px', marginLeft: '-12px', fontSize: '22px'}}>{children}</Box>
        {title && (
          <Typography
            variant="h5"
            sx={{ marginRight: '10px', color: titleColor, width: 'max-content' }}
          >
            {title}
          </Typography>
        )}
      </Box>
      <Box sx={{paddingLeft: descriptionPadding}}>
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
    </Box>
  )
}
