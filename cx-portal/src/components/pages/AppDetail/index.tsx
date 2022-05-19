import { Button, Typography } from 'cx-portal-shared-components'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { appDetailsSelector } from 'state/features/appDetails/slice'
import { fetchItem } from 'state/features/appDetails/actions'
import AppDetailHeader from './components/AppDetailHeader'
import AppDetailImageGallery from './components/AppDetailImageGallery'
import AppDetailPrivacy from './components/AppDetailPrivacy'
import AppDetailHowToUse from './components/AppDetailHowToUse'
import AppDetailProvider from './components/AppDetailProvider'
import AppDetailTags from './components/AppDetailTags'
import { t } from 'i18next'
import './AppDetail.scss'
import NotFound from '../NotFound'
import { getAppImage } from 'state/features/appMarketplace/mapper'

export default function AppDetail() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { appId } = useParams()
  const { item } = useSelector(appDetailsSelector)

  useEffect(() => {
    if (appId) {
      dispatch(fetchItem(appId))
    }
  }, [appId, dispatch])

  return item ? (
    <main className="appdetail-main">
      {item.id === 'default' || (
        <>
          <Button
            color="secondary"
            size="small"
            onClick={() => navigate('/appmarketplace')}
          >
            {t('global.actions.back')}
          </Button>
          <AppDetailHeader item={item} />
          <div className="product-description">
            <Typography variant="body2">{item.longDescription}</Typography>
            <a href="/#" className="product-desc-more">
              + more
            </a>
          </div>
          <AppDetailImageGallery images={item.detailPictureUris.map(image=>getAppImage(item.id, image))} />
          <AppDetailPrivacy />
          <AppDetailHowToUse />
          <AppDetailProvider />
          <AppDetailTags />
        </>
      )}
    </main>
  ) : (
    <NotFound />
  )
}
