import './AppDetailImageGallery.scss'
import { ImageGallery, ImageType } from 'cx-portal-shared-components'

export default function AppDetailHeader() {
  const gallery: ImageType[] = [
    {
      url: 'https://portal.dev.demo.catena-x.net/assets/images/samples/s012.jpg',
      text: 'Lorem Image Caption',
    },
    {
      url: 'https://portal.dev.demo.catena-x.net/assets/images/samples/s009.jpg',
      text: 'Lorem Image Caption',
    },
    {
      url: 'https://portal.dev.demo.catena-x.net/assets/images/samples/s008.jpg',
      text: 'Lorem Image Caption',
    },
  ]

  return (
    <div className="appdetail-gallery">
      <ImageGallery gallery={gallery} />
    </div>
  )
}
