import { Button, Typography } from 'cx-portal-shared-components'
import { useTranslation, Trans } from 'react-i18next'

export default function SearchSection() {
  const { t } = useTranslation()

  return (
    <div className="stage-dashboard stage-section">
      <div className="stage-content">
        <Typography variant="h2">
          {t('content.dashboard.stage.title')}
        </Typography>
        <Typography sx={{ fontFamily: 'LibreFranklin-Light' }} variant="h2">
          <Trans i18nKey="content.dashboard.stage.subtitle">
            The gateway to a Digital <br /> Economy
          </Trans>
        </Typography>
        <Button sx={{ margin: '40px 10px 0 0' }}>
          {t('content.dashboard.stage.appButton')}
        </Button>
        <Button sx={{ margin: '40px 0 0 10px' }} variant="outlined">
          {t('content.dashboard.stage.cxButton')}
        </Button>
      </div>
      <div className="stage-background">
        <div className="image-wrapper image-ratio-parent">
          <img
            src="./home-stage-desktop.png"
            alt="Dashboard stage"
            className="object-fit x-left-40"
          />
        </div>
      </div>
    </div>
  )
}
