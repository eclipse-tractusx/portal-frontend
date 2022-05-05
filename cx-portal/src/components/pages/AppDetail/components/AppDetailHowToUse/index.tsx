import { useTranslation } from 'react-i18next'
import { Typography } from 'cx-portal-shared-components'
import './AppDetailHowToUse.scss'

export default function AppDetailHowToUse() {
  const { t } = useTranslation()

  return (
    <div className="appdetail-howtouse">
      <div className="howtouse-content">
        <Typography variant="h4">
          {t('content.appdetail.howtouse.heading')}
        </Typography>
        <Typography variant="body2">
          {t('content.appdetail.howtouse.message')}
        </Typography>
      </div>
        <ul>
          <li>
            <a href="/#">Document 1</a>
          </li>
          <li>
            <a href="/#">Document 2</a>
          </li>
          <li>
            <a href="/#">Document 3</a>
          </li>
          <li>
            <a href="/#">Document 4</a>
          </li>
        </ul>
    </div>
  )
}
