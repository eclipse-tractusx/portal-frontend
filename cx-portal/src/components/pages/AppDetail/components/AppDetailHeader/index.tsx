import { Button, Typography } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import UserService from 'services/UserService'
import { AppDetails } from 'features/apps/details/types'
import { getAppLeadImage } from 'features/apps/marketplace/mapper'
import { ROLES } from 'types/MainTypes'
import './AppDetailHeader.scss'

export interface AppDetailHeaderProps {
  item: AppDetails
}

export default function AppDetailHeader({ item }: AppDetailHeaderProps) {
  const { t } = useTranslation()

  return (
    <div className="appdetail-header">
      <div className="lead-image">
        <img src={getAppLeadImage(item)} alt={item.title} />
      </div>
      <div className="content">
        <Typography variant="body2" className="provider">
          {item.provider}
        </Typography>
        <Typography variant="h4" className="heading">
          {item.title}
        </Typography>
        <div className="rating">
          {/*
          <Rating defaultRating={item.rating} />
          <span className="rating-number">{item.rating}</span>
          */}
        </div>
        <Typography variant="body2" className="price">
          {item.price}
        </Typography>
        <div className="usecase">
          <Typography variant="caption" className="head">
            {t('content.appdetail.usecase')}:{' '}
          </Typography>
          {item.useCases.map((useCase) => (
            <span key={useCase}> {useCase} </span>
          ))}
        </div>
        <div className="language">
          <Typography variant="caption" className="head">
            {t('content.appdetail.language')}:{' '}
          </Typography>
          {item.languages?.map((lang, index) => (
            <span key={lang}>{(index ? ', ' : '') + lang}</span>
          ))}
        </div>
        <Button
          color={
            UserService.hasRole(ROLES.APPSTORE_VIEW) ? 'primary' : 'secondary'
          }
        >
          {t('content.appdetail.subscribe')}
        </Button>
      </div>
    </div>
  )
}
