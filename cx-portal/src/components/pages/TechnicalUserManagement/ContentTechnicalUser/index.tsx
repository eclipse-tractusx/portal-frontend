import { useTranslation } from 'react-i18next'
import { Button } from 'cx-portal-shared-components'

interface ContentTechnicalUserProps {
  openAddTechnicalUserOverlay: React.MouseEventHandler
}

export const ContentTechnicalUser = ({ openAddTechnicalUserOverlay }: ContentTechnicalUserProps) => {
  const { t } = useTranslation()

  return (
    <section>
      
      <Button size="small" onClick={openAddTechnicalUserOverlay}>
        {t('content.usermanagement.technicalUser.create')}
      </Button>
    </section>
  )
}
