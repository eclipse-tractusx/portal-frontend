import { Typography } from '@cofinity-x/shared-components'
import { useTranslation } from 'react-i18next'

export default function HeaderSection() {
  const { t } = useTranslation()

  return (
    <Typography
      variant="h3"
      className="section-title"
      sx={{ textAlign: 'center' }}
    >
      {t('content.appstore.appOverviewSection.title')}
    </Typography>
  )
}
