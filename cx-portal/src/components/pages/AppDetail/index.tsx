import { Button } from 'cx-portal-shared-components'
import { useNavigate, useParams } from 'react-router-dom'
import { t } from 'i18next'
import './AppDetail.scss'
import AppDetailContent from './AppDetailContent'

export default function AppDetail() {
  const navigate = useNavigate()
  const { appId } = useParams()

  return (
    <main className="appdetail-main">
      <Button
        color="secondary"
        size="small"
        onClick={() => navigate('/appmarketplace')}
      >
        {t('global.actions.back')}
      </Button>
      <AppDetailContent id={appId!} />
    </main>
  )
}
