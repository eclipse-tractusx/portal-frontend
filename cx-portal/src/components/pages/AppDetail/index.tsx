import { Typography } from 'cx-portal-shared-components'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { appDetailsSelector } from 'state/features/appDetails/slice'
import { fetchItem } from 'state/features/appDetails/actions'
import AppDetailHeader from './components/AppDetailHeader'
import { useParams } from 'react-router-dom'
import NotFound from '../NotFound'

export default function AppDetail() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const appId = useParams().appId
  const { item } = useSelector(appDetailsSelector)

  useEffect(() => {
    if (appId) {
      dispatch(fetchItem(appId))
    }
  }, [appId, dispatch])

  return item === null ? (
    <NotFound />
  ) : (
    <main>
      <Typography variant="h3">{t('pages.appdetails')}</Typography>
      <AppDetailHeader item={item} />
    </main>
  )
}
