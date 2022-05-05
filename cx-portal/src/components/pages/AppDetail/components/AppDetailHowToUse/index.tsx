import { useTranslation } from 'react-i18next'
import { Typography } from 'cx-portal-shared-components'
import './AppDetailHowToUse.scss'

export default function AppDetailHowToUse() {
  const { t } = useTranslation()

  return (
    <div className="appdetail-howtouse">
      <div className="howtouse-content">
        <div className="container">
          <Typography variant="h4">
            {t('content.appdetail.howtouse.heading')}
          </Typography>
          <Typography variant="body2">
            {t('content.appdetail.howtouse.message')}
          </Typography>
        </div>
      </div>
      <div className="privacy-table">
        <div className="container">
          <ul>
            <li key="document1">
              <a href="/#">Document 1</a>
            </li>
            <li key="document2">
              <a href="/#">Document 2</a>
            </li>
            <li key="document3">
              <a href="/#">Document 3</a>
            </li>
            <li key="document4">
              <a href="/#">Document 4</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
