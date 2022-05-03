import { Button, Typography } from 'cx-portal-shared-components'
import { useTranslation, Trans } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { openAdd } from 'state/features/adminUser/actions'

export default function SearchSection() {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  return (
    <div className="stage-home stage-section">
      <div className="stage-content">
        <Typography variant="h2">{t('content.home.stage.title')}</Typography>
        <Typography sx={{ fontFamily: 'LibreFranklin-Light' }} variant="h2">
          <Trans i18nKey="content.home.stage.subtitle">
            xxx <br /> xxx
          </Trans>
        </Typography>
        <Button
          sx={{ margin: '40px 10px 0 0' }}
          onClick={() => dispatch(openAdd())}
        >
          {t('content.usermanagement.table.add')}
        </Button>
      </div>
      <div className="stage-background">
        <div className="image-wrapper image-ratio-parent">
          <img
            src="./home-stage-desktop.png"
            alt="home stage"
            className="object-fit x-left-40"
          />
        </div>
      </div>
    </div>
  )
}
