import { MainHeader } from 'components/shared/cfx/MainHeader'
import { useTranslation } from 'react-i18next'

export default function SearchSection() {
  const { t } = useTranslation()

  return (
    <div className="stage-app-store">
      <MainHeader
        title={t('content.appstore.stage.title')}
        subTitle={t('content.appstore.stage.subtitle')}
        headerHeight={250}
        subTitleWidth={750}
      ></MainHeader>
    </div>
  )
}
