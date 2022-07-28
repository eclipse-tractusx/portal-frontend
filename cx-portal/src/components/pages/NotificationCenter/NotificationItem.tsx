import dayjs from 'dayjs'
import { CXNotification, NotificationType } from 'features/notification/types'
import WelcomeInviteNotification from './types/WelcomeInviteNotification'

function NotificationContent({ item }: { item: CXNotification }) {
  switch (item.notificationTypeId) {
    case NotificationType.WelcomeInvite:
      return <WelcomeInviteNotification item={item}/>
    //case NotificationType.WelcomeAppMarketplace: return <WelcomeNotification />
    default:
      return <pre>{JSON.stringify(item, null, 2)}</pre>
  }
}

export default function NotificationItem({ item }: { item: CXNotification }) {
  return (
    <div>
      <div className="date">{dayjs(item.created).format('hh:mm')}</div>
      <NotificationContent item={item} />
    </div>
  )
}
