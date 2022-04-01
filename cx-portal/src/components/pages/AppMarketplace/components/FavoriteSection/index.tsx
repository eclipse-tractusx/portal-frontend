import { useTranslation } from 'react-i18next'
import { Typography } from 'cx-portal-shared-components'

export default function FavoriteSection() {
  const { t } = useTranslation()

  return (
    <section className="business-applications-section">
      <Typography
        sx={{ fontFamily: 'LibreFranklin-Light' }}
        variant="h3"
        className="section-title"
      >
        {t('content.appstore.favoriteSection.title')}
      </Typography>
    </section>
  )
}
