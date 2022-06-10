import { Box, Typography } from '@mui/material'
import { ErrorPageProps } from '../index'

export const ErrorDescription = ({
  header,
  title,
  description,
}: ErrorPageProps) => {
  return (
    <Box
      sx={{
        width: 'max-content',
        margin: 'auto'
      }}
    >
      {header && (
        <Typography
          sx={{
            fontFamily: 'LibreFranklin-Light',
            fontWeight: '600',
            marginBottom: '30px !important'
          }}
          variant="h2"
        >
          {header}
        </Typography>
      )}

      {title && (
        <Typography
          sx={{
            fontFamily: 'LibreFranklin-Light',
          }}
          variant="body1"
        >
          {title}
        </Typography>
      )}

      {title && (
        <Typography
          sx={{
            fontFamily: 'LibreFranklin-Light',
            width: '640px',
          }}
          variant="body1"
        >
          {description}
        </Typography>
      )}
    </Box>
  )
}
