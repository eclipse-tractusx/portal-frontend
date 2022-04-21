import { Button, Rating } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import './AppDetailHeader.scss'

export default function AppDetailHeader() {
  const { t } = useTranslation()

  return (
    <div className="appdetail-header">
      <img
        src="https://catenaxdev003util.blob.core.windows.net/assets/apps/images/Lead-Dismantler.png"
        alt=""
      />
      {/* The below content needs to get replaced as soon as API is available. */}
      <div className="content">
        <p className="provider">Catena-X</p>
        <h2 className="heading">Digital Twin Debugger</h2>
        <Rating defaultRating={4} />
        <p className="provider">free for use</p>
        <p className="usecase">
          <b>{t('content.appdetail.usecase')}:</b> Digital Debuggers
        </p>
        <p className="language">
          <b>{t('content.appdetail.language')}:</b> DE, EN
        </p>
        <Button>{t('content.appdetail.subscribe')}</Button>
      </div>
    </div>
  )
}
