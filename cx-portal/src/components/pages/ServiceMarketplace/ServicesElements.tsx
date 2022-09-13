import { CardHorizontal, PageNotifications } from 'cx-portal-shared-components'
import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useFetchServicesQuery } from 'features/serviceMarketplace/serviceApiSlice'
import './style.scss'

export default function ServicesElements() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { data } = useFetchServicesQuery(0)
  console.log('data', data)
  const services = data && data.content

  const handleClick = (id: string) => {
    navigate(`/servicemarketplacedetail/${id}`)
  }

  return (
    <div className="marketplace-section">
      {
        services && services.length ?
          (
            <Box sx={{ width: '100%' }} >
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid
                  item
                  xs={4}
                >
                  <CardHorizontal
                    borderRadius={0}
                    imageAlt="App Card "
                    imagePath={'service.leadPictureUri'}
                    label={'test'}
                    buttonText="Details"
                    onBtnClick={() => handleClick('test')}
                    title={'check'}
                    backgroundColor="#f7f7f7"
                  />
                </Grid>
                <Grid
                  item
                  xs={4}
                >
                  <CardHorizontal
                    borderRadius={0}
                    imageAlt="App Card "
                    imagePath={'service.leadPictureUri'}
                    label={'test'}
                    buttonText="Details"
                    onBtnClick={() => handleClick('test')}
                    title={'check'}
                    backgroundColor="#f7f7f7"
                  />
                </Grid>
                <Grid
                  item
                  xs={4}
                >
                  <CardHorizontal
                    borderRadius={0}
                    imageAlt="App Card "
                    imagePath={'service.leadPictureUri'}
                    label={'test'}
                    buttonText="Details"
                    onBtnClick={() => handleClick('test')}
                    title={'check'}
                    backgroundColor="#f7f7f7"
                  />
                </Grid>
              </Grid>
            </Box>
          )
          :
          <PageNotifications
            description={t('content.serviceMarketplace.noDataMessage')}
            onCloseNotification={function noRefCheck() { }}
            open
            severity="error"
            showIcon
            title="Error"
          />
      }
    </div >
  )
}
