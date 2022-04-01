import { Typography } from 'cx-portal-shared-components'
import { useTranslation, Trans } from 'react-i18next'

export default function SearchSection() {
  const { t } = useTranslation()

  return (
    <div className="stage-app-store stage-section">
      <div className="stage-content">
        <Typography variant="h2">
          {t('content.appstore.stage.title')}
        </Typography>
        <Typography sx={{ fontFamily: 'LibreFranklin-Light' }} variant="h2">
          <Trans i18nKey="content.appstore.stage.subtitle">
            A scalable & expandable <br /> ecosystem
          </Trans>
        </Typography>
      </div>
      <div className="stage-background">
        <div className="image-wrapper image-ratio-parent">
          <img
            src="./app-store-stage-desktop.png"
            alt="App store stage"
            className="object-fit x-left-40"
          />
        </div>
      </div>
    </div>
  )
}
