import { PageHeader } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { Box, Grid } from '@mui/material'
import './style.scss'
import ServicesElements from './ServicesElements'

export default function ServiceMarketplace() {
  const { t } = useTranslation()
  return (
    <main>
      <PageHeader
        title={t('servicemarketplace.title')}
        hasSubtract={false}
        headerHeight={200}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '180px',
          right: `0px !important`,
          fontWeight: 'bold',
        }}
      >
        <Grid container>
          <Grid xs={2}></Grid>
          <Grid
            item
            xs={3}
            sx={{
              padding: '0px 10px',
              textAlign: 'center',
              borderRight: '3px solid white',
            }}
          >
            Explore available service offers
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              padding: '0px 10px',
              textAlign: 'center',
              borderRight: '3px solid white',
            }}
          >
            Select & Contact interesting offers
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              padding: '0px 10px',
              textAlign: 'center',
            }}
          >
            Get your dataspace connected
          </Grid>
        </Grid>
      </Box>
    </main>
  )
}
