import { CXNotification, NotificationType } from 'features/notification/types'
import WelcomeNotification from './types/WelcomeNotification'

export default function NotificationItem({item}: {item: CXNotification}) {
  switch(item.notificationTypeId) {
    case NotificationType.Welcome: return <WelcomeNotification />
    //case NotificationType.WelcomeAppMarketplace: return <WelcomeNotification />
    default: return <pre>{JSON.stringify(item, null, 2)}</pre>
  }
}
