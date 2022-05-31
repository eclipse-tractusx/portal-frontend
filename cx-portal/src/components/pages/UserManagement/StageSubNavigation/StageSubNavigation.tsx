import { SubNavigation } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'

export const StageSubNavigation = () => {
  const { t } = useTranslation()
  const scrollToId = (id: string) => {
    const element = document.getElementById(id)
    const top = element?.offsetTop
    window.scrollTo({
      top: top,
      behavior: 'smooth',
    })
  }

  return (
    <SubNavigation
      buttonLabel={t('navigation.subNavigation.buttonLabel')}
      onButtonClick={() => console.log('add button event')}
      link1Label={t('navigation.subNavigation.link1Label')}
      onLink1Click={() => scrollToId('access-management-id')}
      link2Label={t('navigation.subNavigation.link2Label')}
      onLink2Click={() => scrollToId('identity-management-id')}
    />
  )
}
