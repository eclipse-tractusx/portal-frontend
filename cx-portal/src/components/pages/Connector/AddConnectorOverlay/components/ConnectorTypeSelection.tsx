import React from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Checkbox } from 'cx-portal-shared-components'
import { Box, Grid, useTheme } from '@mui/material'

// Static content
// Add Connector Button action modal first step content
const ConnectorTypeSelection = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { spacing } = theme

  return (
    <div className={'connector-type-selector-container'}>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={1.5} style={{ marginTop: 0 }}>
          <Grid
            xs={12}
            item
            style={{
              padding: spacing(2),
            }}
            className={'dotted-gradient'}
          >
            <Checkbox label="Connect company connector" checked />
            <Typography variant="body2" style={{ marginLeft: '30px' }}>
              <p>This is the only value available now</p>
              <p>
                Lörem ipsum kavis asm. Gos fan. Eusida dida. Topopp difeligen
                nyck till fysoras. Gaskapet prelaras, syning diheten alltså
                piporat. Kinas fagologi pon i dekassa. Bipivis psykostat medan
                antibelt. Miv semism det vill säga nanoteknik. Anang gos, tävla
                ut decijengen. Serat hådyher soren.
              </p>
            </Typography>
          </Grid>
          <Grid
            xs={12}
            item
            style={{
              padding: spacing(2),
            }}
            className={'dotted-gradient'}
          >
            <Checkbox label="Connector-as-a-service" disabled />
            <Typography variant="body2" style={{ marginLeft: '30px' }}>
              <p>This option NOT AVAILABLE yet</p>
              <p>
                Lörem ipsum kavis asm. Gos fan. Eusida dida. Topopp difeligen
                nyck till fysoras. Gaskapet prelaras, syning diheten alltså
                piporat. Kinas fagologi pon i dekassa. Bipivis psykostat medan
                antibelt. Miv semism det vill säga nanoteknik. Anang gos, tävla
                ut decijengen. Serat hådyher soren.
              </p>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default ConnectorTypeSelection
