import { Button, Typography } from 'cx-portal-shared-components'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { itemSelector } from 'features/apps/details/slice'
import { fetch } from 'features/apps/details/actions'
import AppDetailHeader from './components/AppDetailHeader'
import AppDetailImageGallery from './components/AppDetailImageGallery'
import AppDetailPrivacy from './components/AppDetailPrivacy'
import AppDetailHowToUse from './components/AppDetailHowToUse'
import AppDetailProvider from './components/AppDetailProvider'
import AppDetailTags from './components/AppDetailTags'
import NotFound from '../NotFound'
import { getAppImage } from 'features/apps/marketplace/mapper'
import { t } from 'i18next'
import './AppDetail.scss'

export default function AppDetail() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { appId } = useParams()
  const item = useSelector(itemSelector)

  useEffect(() => {
    if (appId) {
      dispatch(fetch(appId))
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

          <br />

          <AppDetailHeader item={item} />
          <div className="product-description">
            <Typography variant="body2">{item.longDescription}</Typography>
          </div>
          <AppDetailImageGallery
            images={item.detailPictureUris.map((image) =>
              getAppImage(item.id, image)
            )}
          />
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
