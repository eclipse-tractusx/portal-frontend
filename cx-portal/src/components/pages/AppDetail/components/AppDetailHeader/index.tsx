import { Button, Rating } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { AppDetails } from 'state/features/appDetails/types'
import './AppDetailHeader.scss'

export interface AppDetailHeaderProps {
  item: AppDetails
}

export default function AppDetailHeader({ item }: AppDetailHeaderProps) {
  const { t } = useTranslation()

  return (
    <div className="appdetail-header">
      <img src={item.leadPictureUri} alt={item.name} />
      <div className="content">
        <p className="provider">{item.provider}</p>
        <h2 className="heading">{item.name}</h2>
        <Rating defaultRating={item.rating} />
        <p className="price">{item.price}</p>
        <p className="usecase">
          <b>{t('content.appdetail.usecase')}:</b>{' '}
          {item.useCases.map((useCase) => (
            <span key={useCase}> {useCase} </span>
          ))}
        </p>
        <p className="language">
          <b>{t('content.appdetail.language')}:</b>{' '}
          {item.languages.map((lang) => (
            <span key={lang}> {lang} </span>
          ))}
        </p>
        <Button>{t('content.appdetail.subscribe')}</Button>
      </div>
    </div>
  )
}
