import { useTranslation } from 'react-i18next'
import { Cards, Button, Typography } from 'cx-portal-shared-components'
import { useNavigate } from 'react-router-dom'
import { useFetchLatestAppsQuery } from 'features/apps/apiSliceTest'
import { appToCard } from 'features/apps/mapper'
import './app-store-section.scss'

export default function AppStoreSection() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data } = useFetchLatestAppsQuery()
  const items = data?.map((app) => appToCard(app)) || []

  return (
    <section className="app-store-section">
      <Typography
        sx={{ fontFamily: 'LibreFranklin-Light' }}
        variant="h3"
        className="section-title"
      >
        {t('content.home.appStoreSection.title')}
      </Typography>
      <Cards
        items={items} // TODO: Replace from api
        columns={4}
        buttonText="Details"
        imageSize="small"
        imageShape="round"
        variant="compact"
        expandOnHover={false}
        filledBackground={true}
      />
      <Button
        sx={{ margin: '100px auto 60px', display: 'block' }}
        onClick={() => navigate('/appmarketplace')}
      >
        {t('pages.appmarketplace')}
      </Button>
    </section>
  )
}
