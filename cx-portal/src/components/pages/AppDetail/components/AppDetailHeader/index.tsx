import { Button, Rating } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import UserService from 'services/UserService'
import { AppDetails } from 'state/features/appDetails/types'
import './AppDetailHeader.scss'

export interface AppDetailHeaderProps {
  item: AppDetails
}

export default function AppDetailHeader({ item }: AppDetailHeaderProps) {
  console.log('item', item)
  const { t } = useTranslation()

  return (
      <div className="container">
        <div className="row">
          <div className="lead-image">
            <img src={item.leadPictureURI} alt={item.name} />
          </div>
          <div className="content">
            <p className="provider">{item.provider}</p>
            <h2 className="heading">{item.name}</h2>
            <div className="rating">
              <Rating defaultRating={item.rating} />
              <span className="rating-number">{item.rating}</span>
            </div>
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
            <Button color={UserService.hasRole('view_apps"') ? 'primary' : 'secondary'}>{t('content.appdetail.subscribe')}</Button>
          </div>
        </div>
      </div>
  )
}
