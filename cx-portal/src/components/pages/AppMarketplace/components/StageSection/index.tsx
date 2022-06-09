import { Button, MainHeader } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import PageService from 'services/PageService'
import { label as AppList } from '../AppListSection'

export default function SearchSection() {
  const { t } = useTranslation()

  return (
    <div className="stage-app-store stage-section">
      <MainHeader
          title={t('content.appstore.stage.title')}
          subTitle={t('content.appstore.stage.subtitle')}
          headerHeight={731}
          subTitleWidth={787}
          background='LinearGradient1'
          imagePath='./app-store-stage-desktop.png'
      >
        <Button
          sx={{ margin: '40px 10px 0 0' }}
          onClick={() => PageService.scrollTo(AppList)}
        >
          {t('content.appstore.stage.appButton')}
        </Button>
      </MainHeader>
    </div>
  )
}
