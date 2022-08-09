import { Button } from 'cx-portal-shared-components'
import { useNavigate, useParams } from 'react-router-dom'
import { t } from 'i18next'
import { useFetchAppDetailsQuery } from 'features/apps/apiSlice'
import AppDetailContentDetails from './AppDetailContentDetails'
import './AppDetail.scss'

export default function AppDetail() {
  const navigate = useNavigate()
  const { appId } = useParams()
  const { data } = useFetchAppDetailsQuery(appId!)

  return (
    <main className="appdetail-main">
      <Button
        color="secondary"
        size="small"
        onClick={() => navigate('/appmarketplace')}
      >
        {t('global.actions.back')}
      </Button>
      {data && <AppDetailContentDetails item={data} />}
    </main>
  )
}
