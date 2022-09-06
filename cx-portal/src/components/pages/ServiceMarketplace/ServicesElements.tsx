import { CardHorizontal } from 'cx-portal-shared-components'
import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useFetchServicesQuery } from 'features/serviceMarketplace/serviceApiSlice'
import './style.scss'

export default function ServicesElements() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleClick = (id: string) => {
    navigate(`/servicemarketplacedetail/${id}`)
  }

  const { data } = useFetchServicesQuery('5cf74ef8-e0b7-4984-a872-474828beb5d3')

  console.log('data', data)


  return (
    <div className="marketplace-section">
      <Grid container>
        <Grid
          item
          xs={5}
          sx={{
            margin: '10px'
          }}
        >
          <CardHorizontal
            borderRadius={0}
            imageAlt="App Card "
            imagePath=""
            label="Company xxx"
            buttonText="Details"
            onBtnClick={() => handleClick('test')}
            title="Dataspace Setup"
            backgroundColor='#f7f7f7'
          />
        </Grid>
        <Grid
          item
          xs={5}
          sx={{
            margin: '10px'
          }}
        >
          <CardHorizontal
            borderRadius={0}
            imageAlt="App Card "
            imagePath=""
            label="Company xxx"
            buttonText="Details"
            onBtnClick={() => handleClick('test')}
            title="Dataspace Setup"
            backgroundColor='#f7f7f7'
          />
        </Grid>
        <Grid
          item
          xs={5}
          sx={{
            margin: '10px'
          }}
        >
          <CardHorizontal
            borderRadius={0}
            imageAlt="App Card "
            imagePath=""
            label="Company xxx"
            buttonText="Details"
            onBtnClick={() => handleClick('test')}
            title="Dataspace Setup"
            backgroundColor='#f7f7f7'
          />
        </Grid>
      </Grid>
    </div>
  )
}
