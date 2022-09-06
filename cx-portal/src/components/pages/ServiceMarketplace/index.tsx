import { PageHeader } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { Box, Grid } from '@mui/material'
import './style.scss'
import ServicesElements from './ServicesElements'

export default function ServiceMarketplace() {
  const { t } = useTranslation()
  return (
    <div>
      <div className="banner-heading">
        <PageHeader
          title={t('servicemarketplace.title')}
          hasSubtract={false}
          headerHeight={250}
        />
      </div>
      <Box
        sx={{
          position: 'absolute',
          top: '200px',
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
      <div className="container">
        <ServicesElements />
      </div>
    </div>
  )
}
