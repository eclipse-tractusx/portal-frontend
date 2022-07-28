import { Typography } from 'cx-portal-shared-components'
import dayjs from 'dayjs'
import { CXNotification } from 'features/notification/types'
import { useTranslation } from 'react-i18next'
import UserService from 'services/UserService'

export default function WelcomeInviteNotification({ item }: { item: CXNotification }) {
  const { t } = useTranslation('notification', { keyPrefix: 'WelcomeInvite' })
  return (
    <div>
      <Typography sx={{ fontWeight: 'bold', fontSize: '12px', color: 'gray' }}>{t('title')}</Typography>
      <Typography sx={{ fontSize: '14px', color: 'gray' }}>
        {t('message', { you: UserService.getName() })}
      </Typography>
    </div>
  )
}
