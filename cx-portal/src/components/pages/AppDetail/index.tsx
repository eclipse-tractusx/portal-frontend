import { Typography } from 'cx-portal-shared-components'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { appDetailsSelector } from 'state/features/appDetails/slice'
import { fetchItem } from 'state/features/appDetails/actions'
import { selectorUser } from 'state/features/user/userSlice'
import AppDetailHeader from './components/AppDetailHeader'
import { useParams } from 'react-router-dom'
import NotFound from '../NotFound'

export default function AppDetail() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const appId = useParams().appId
  const { token } = useSelector(selectorUser)
  const { item } = useSelector(appDetailsSelector)

  useEffect(() => {
    if (token && appId) {
      dispatch(fetchItem(appId))
    }
  }, [appId, token, dispatch])

  return item === null ? (
    <NotFound />
  ) : (
    <main>
      <Typography variant="h3">{t('pages.appdetails')}</Typography>
      <AppDetailHeader item={item} />
    </main>
  )
}
