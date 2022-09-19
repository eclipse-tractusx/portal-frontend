import { PageHeader } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { Box, Grid } from '@mui/material'
import ServicesElements from './ServicesElements'
import './style.scss'

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
      <Box className="box-container">
        <Grid container>
          <Grid xs={2} item></Grid>
          <Grid item xs={3} className="grid-heading">
            Explore available service offers
          </Grid>
          <Grid item xs={3} className="grid-heading">
            Select & Contact interesting offers
          </Grid>
          <Grid item xs={3} className="grid-heading border-none">
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
