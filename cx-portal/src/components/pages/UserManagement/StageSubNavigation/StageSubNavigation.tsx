import { SubNavigation } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const StageSubNavigation = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <SubNavigation
      buttonLabel={t('navigation.subNavigation.buttonLabel')}
      onButtonClick={() => navigate('/usermanagement/technicaluser')}
      link1Label={t('navigation.subNavigation.link1Label')}
      onLink1Click={() => console.log('add link1 event')}
      link2Label={t('navigation.subNavigation.link2Label')}
      onLink2Click={() => console.log('add link 2 event')}
    />
  )
}
