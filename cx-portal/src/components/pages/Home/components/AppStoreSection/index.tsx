import { useTranslation } from 'react-i18next'
import { Cards, Button, Typography } from 'cx-portal-shared-components'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLatest } from 'features/apps/marketplaceDeprecated/actions'
import { latestSelector } from 'features/apps/marketplaceDeprecated/slice'
import './app-store-section.scss'

export default function AppStoreSection() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const items = useSelector(latestSelector)

  useEffect(() => {
    dispatch(fetchLatest())
  }, [dispatch])

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
