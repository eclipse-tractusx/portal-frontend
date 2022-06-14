import { Button, MainHeader } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { openAdd } from 'features/admin/user/actions'

export default function SearchSection() {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  return (
    <div className="stage-home stage-section">
      <MainHeader
        title={t('content.home.stage.title')}
        subTitle={t('content.home.stage.subtitle')}
        headerHeight={731}
        subTitleWidth={787}
        background="LinearGradient1"
        imagePath="./home-stage-desktop.png"
      >
        <Button
          sx={{ margin: '40px 10px 0 0' }}
          onClick={() => dispatch(openAdd())}
        >
          {t('content.usermanagement.table.add')}
        </Button>
      </MainHeader>
    </div>
  )
}
