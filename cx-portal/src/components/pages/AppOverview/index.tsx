import { PageHeader } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'

export default function AppOverview() {
  const { t } = useTranslation()
  return (
    <main>
      <PageHeader title={t('pages.appoverview')} />
    </main>
  )
}
