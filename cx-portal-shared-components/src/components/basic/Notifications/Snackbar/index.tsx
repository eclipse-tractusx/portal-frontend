import { Box, IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'
import { PageNotificationsProps, color, titleIcon } from '../PageNotification'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar'
import { SnackbarContent } from './SnackbarContent'
import { theme } from '../../../../theme'

export const PageSnackbar = ({
  severity = 'info',
  onCloseNotification,
  open,
  title,
  description,
  contactText,
  contactLinks,
  contactNewTab,
  showIcon,
}: PageNotificationsProps & SnackbarOrigin) => {
  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        key={'bottom right'}
        message={
          <SnackbarContent
            title={title}
            description={description}
            contactText={contactText}
            contactLinks={contactLinks}
            contactNewTab={contactNewTab}
            titleColor={color(severity)}
            showIcon={showIcon}
          >
            {showIcon && titleIcon(severity)}
          </SnackbarContent>
        }
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onCloseNotification}
            sx={{
              color: theme.palette.icon.icon01,
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        }
        sx={{
          '.MuiSnackbarContent-root': {
            width: '352px',
            boxShadow: '0px 20px 40px rgba(80, 80, 80, 0.3)',
            backgroundColor: '#FFFFFF !important',
            border: `1px solid ${color(severity)}`,
            borderRadius: '8px',
            padding: '16px 16px 32px 32px',
            flexDirection: 'column-reverse',
          },
          '.MuiSnackbarContent-message': {
            padding: '0px',
          },
        }}
      />
    </Box>
  )
}
