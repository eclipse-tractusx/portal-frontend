import { Button, Rating } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import './AppDetailHeader.scss'

export interface AppDetailProps {
  item: any
}

export default function AppDetailHeader({ item }: AppDetailProps) {
  const { t } = useTranslation()

  return (
    <div className="appdetail-header">
      <img src={item.image.src} />
      <div className="content">
        <p className="provider">Catena-X</p>
        <h2 className="heading">{item.title}</h2>
        <Rating defaultRating={item.rating} />
        <p className="provider">{item.price}</p>
        <p className="usecase">
          <b>{t('content.appdetail.usecase')}:</b> {item.useCases}
        </p>
        <p className="language">
          <b>{t('content.appdetail.language')}:</b> DE, EN
        </p>
        <Button>{t('content.appdetail.subscribe')}</Button>
      </div>
    </div>
  )
}
