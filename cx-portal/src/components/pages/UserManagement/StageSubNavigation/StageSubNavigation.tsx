import { SubNavigation } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'

export const StageSubNavigation = () => {
  const { t } = useTranslation()

  return (
    <SubNavigation
      buttonLabel={t('navigation.subNavigation.buttonLabel')}
      onButtonClick={() => console.log('add button event')}
      link1Label={t('navigation.subNavigation.link1Label')}
      onLink1Click={() => console.log('add link1 event')}
      link2Label={t('navigation.subNavigation.link2Label')}
      onLink2Click={() => console.log('add link 2 event')}
    />
  )
}
