import './AppDetailImageGallery.scss'
import { ImageGallery, ImageType } from 'cx-portal-shared-components'

export default function AppDetailImage({ images }: { images: ImageType[] }) {
  return (
    <div className="appdetail-gallery">
      <ImageGallery gallery={images} />
    </div>
  )
}
