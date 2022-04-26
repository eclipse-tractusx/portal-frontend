import { Button, Typography } from 'cx-portal-shared-components'
import { useTranslation, Trans } from 'react-i18next'
import PageService from 'services/PageService'
import { label as AppList } from '../AppListSection'

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
            The gateway to <br /> a Digital Economy
          </Trans>
        </Typography>
        <Button
          sx={{ margin: '40px 10px 0 0' }}
          onClick={() => PageService.scrollTo(AppList)}
        >
          {t('content.appstore.stage.appButton')}
        </Button>
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
