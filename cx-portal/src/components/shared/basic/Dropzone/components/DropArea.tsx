import React from 'react'
import { Box } from '@mui/material'
import { Typography, CloudUploadIcon } from 'cx-portal-shared-components'

export const DropArea = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: 'background.background01',
        borderRadius: '40px',
        border: 'none',
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='40' ry='40' stroke='%23B6B6B6FF' stroke-width='2' stroke-dasharray='16' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
        textAlign: 'center',
        minHeight: 274,
        label: {
          padding: '48px 0',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          cursor: 'pointer',
        },
      }}
    >
      <label>
        <CloudUploadIcon fillColor={'#939393'} size={64} />
        <Typography
          variant="h4"
          sx={{
            display: 'block',
            fontFamily: 'LibreFranklin-Light',
            marginTop: '24px',
          }}
        >
          {'Drop Files to upload'}
        </Typography>
        <Typography variant="body1" sx={{ display: 'block' }}>
          {'Input Content Subtitle'}
        </Typography>
      </label>
    </Box>
  )
}

export default DropArea
