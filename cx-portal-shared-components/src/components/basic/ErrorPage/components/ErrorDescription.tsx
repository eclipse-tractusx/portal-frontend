import { Box, Typography } from '@mui/material'
import { ErrorPageProps } from '../index'

export const ErrorDescription = ({
  header,
  title,
  description,
  additionalDescription,
}: ErrorPageProps) => {
  return (
    <Box
      sx={{
        width: 'max-content',
        margin: 'auto',
      }}
    >
      {header && (
        <Typography
          sx={{
            fontFamily: 'LibreFranklin-Light',
            fontWeight: '600',
            marginBottom: '10px !important',
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
            paddingTop: '20px !important',
          }}
          variant="body1"
        >
          {description} <span style={{ borderBottom: '1px solid gray' }}>{additionalDescription}</span>
        </Typography>
      )}
    </Box>
  )
}
