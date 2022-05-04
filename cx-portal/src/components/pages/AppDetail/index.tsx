import { Typography } from 'cx-portal-shared-components'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { appDetailsSelector } from 'state/features/appDetails/slice'
import { fetchItem } from 'state/features/appDetails/actions'
import { userSelector } from 'state/features/user/slice'
import AppDetailHeader from './components/AppDetailHeader'
import AppDetailImageGallery from './components/AppDetailImageGallery'
import AppDetailPrivacy from './components/AppDetailPrivacy'
import AppDetailHowToUse from './components/AppDetailHowToUse'
import AppDetailProvider from './components/AppDetailProvider'
import AppDetailTags from './components/AppDetailTags'
import NotFound from '../NotFound'
import './AppDetail.scss'
import { useTranslation } from 'react-i18next'

export default function AppDetail() {
  const dispatch = useDispatch()
  const appId = useParams().appId
  const { token } = useSelector(userSelector)
  const { item } = useSelector(appDetailsSelector)
  const { t } = useTranslation()
  const ta = useTranslation('apps').t

  useEffect(() => {
    if (token && appId) {
      dispatch(fetchItem(appId))
    }
  }, [appId, token, dispatch])

  return item === null ? (
    <NotFound />
  ) : (
    <main className="appdetail-main">
      <div className="back-btn">
        <div className="container">
          <div className="row">
            <a href="/appmarketplace">Back</a>
          </div>
        </div>
      </div>
      <div className="appdetail-header">
        <AppDetailHeader item={item} />
      </div>
      <div className="product-description">
        <div className="container">
          <Typography variant="body2">
            {ta(`${item.id}.description`)}
          </Typography>
          <a href="/#" className="product-desc-more">
            + more
          </a>
        </div>
      </div>
      <AppDetailImageGallery />
      <AppDetailPrivacy />
      <AppDetailHowToUse />
      <AppDetailProvider />
      <AppDetailTags />
    </main>
  )
}
