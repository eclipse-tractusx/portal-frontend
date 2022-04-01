import { useTranslation } from 'react-i18next'
import { Typography } from 'cx-portal-shared-components'

export default function BusinessApplicationsSection() {
  const { t } = useTranslation()

  return (
    <div className="orange-background">
      <section className="business-applications-section">
        <Typography
          sx={{ fontFamily: 'LibreFranklin-Light' }}
          variant="h3"
          className="section-title"
        >
          {t('content.dashboard.businessApplicationsSection.title')}
        </Typography>
      </section>
    </div>
  )
}
