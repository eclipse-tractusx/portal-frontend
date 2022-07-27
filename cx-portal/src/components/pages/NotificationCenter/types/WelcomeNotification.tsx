import { Typography } from 'cx-portal-shared-components'
import { useTranslation } from 'react-i18next'
import UserService from 'services/UserService'

export default function WelcomeNotification() {
  const { t } = useTranslation('notification', {keyPrefix: 'Welcome'})
  return (
    <div>
        <Typography variant="h6">{t('title')}</Typography>
        <Typography variant="body2">{t('message', { you: UserService.getName()})}</Typography>
    </div>
  )
}
