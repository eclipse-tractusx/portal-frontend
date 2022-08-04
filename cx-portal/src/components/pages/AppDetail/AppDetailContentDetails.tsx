import { Typography } from 'cx-portal-shared-components'
import { useSelector } from 'react-redux'
import { itemSelector } from 'features/apps/details/slice'
import AppDetailHeader from './components/AppDetailHeader'
import AppDetailImageGallery from './components/AppDetailImageGallery'
import AppDetailPrivacy from './components/AppDetailPrivacy'
import AppDetailHowToUse from './components/AppDetailHowToUse'
import AppDetailProvider from './components/AppDetailProvider'
import AppDetailTags from './components/AppDetailTags'
import { getAppImage } from 'features/apps/marketplace/mapper'
import './AppDetail.scss'

export default function AppDetailContentDetails() {
  const item = useSelector(itemSelector)
  return (
    item && (
      <>
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
    )
  )
}
