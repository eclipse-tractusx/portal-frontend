import './AppDetailImageGallery.scss'
import { ImageGallery, GalleryType } from 'cx-portal-shared-components'

export default function AppDetailHeader() {
  const gallery: GalleryType = {
    images: [
      'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
      'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
      'https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg',
    ],
    text: ['Lorem Image Caption', 'Lorem Image Caption', 'Lorem Image Caption'],
  }

  return (
    <div className="appdetail-gallery">
      <ImageGallery gallery={gallery} />
    </div>
  )
}
