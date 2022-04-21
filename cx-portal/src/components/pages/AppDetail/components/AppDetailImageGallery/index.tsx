import { useTranslation } from 'react-i18next'
import './AppDetailImageGallery.scss'

export default function AppDetailHeader() {
  const { t } = useTranslation()

  return (
    <div className="appdetail-gallery">
      <div className="img-col">
        <img
          src="https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg"
          alt=""
        />
        <p>Lorem Image Caption</p>
      </div>
      <div className="img-col">
        <img
          src="https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg"
          alt=""
        />
        <p>Lorem Image Caption</p>
      </div>
      <div className="img-col">
        <img
          src="https://cdn.pixabay.com/photo/2017/09/05/10/20/business-2717066_1280.jpg"
          alt=""
        />
        <p>Lorem Image Caption</p>
      </div>
    </div>
  )
}
