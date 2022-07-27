import StageHeader from 'components/shared/frame/StageHeader'
import { useGetNotificationsQuery } from 'features/notification/apiSlice'
import { CXNotification } from 'features/notification/types'
import { useTranslation } from 'react-i18next'
import NotificationItem from './NotificationItem'
import './NotificationCenter.scss'

export default function NotificationCenter() {
  const { t } = useTranslation()
  const { data } = useGetNotificationsQuery(null)
  console.log(data)
  return (
    <main className="notification-center">
      <StageHeader title={t('pages.notifications')} />
      <ul>
        {data && data.map((item: CXNotification) => <li key={item.id}><NotificationItem item={item}/></li>)}
      </ul>
    </main>
  )
}
