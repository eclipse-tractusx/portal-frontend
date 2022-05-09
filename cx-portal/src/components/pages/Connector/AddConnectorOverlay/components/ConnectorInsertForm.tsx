import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Grid, useTheme } from '@mui/material'

// Static content
// Add Connector Button action modal first step content
const ConnectorInsertForm = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { spacing } = theme

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={1.5} style={{ marginTop: 0 }}>
        <Grid
          xs={12}
          item
          style={{
            padding: spacing(2),
          }}
        >
          this the form of connector
        </Grid>
      </Grid>
    </Box>
  )
}

export default ConnectorInsertForm
