import { Typography } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import AppDetailHeader from './components/AppDetailHeader'
import AppDetailImageGallery from './components/AppDetailImageGallery'
import './AppDetail.scss'

export default function AppDetail() {
  const { t } = useTranslation()

  return (
    <main className="appdetail-main">
      <Typography variant="h3">{t('pages.appdetails')}</Typography>
      <AppDetailHeader />
      <Typography variant="body2" className="product-desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
      <AppDetailImageGallery />
      <Typography variant="h5">Privacy Policy</Typography>
      <Typography variant="body2" className="product-desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Typography>
    </main>
  )
}
