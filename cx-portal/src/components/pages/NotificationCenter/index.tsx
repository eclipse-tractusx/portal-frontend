import StageHeader from 'components/shared/frame/StageHeader'
import { useGetNotificationsQuery } from 'features/notification/apiSlice'
import { CXNotification } from 'features/notification/types'
import { useTranslation } from 'react-i18next'
import NotificationItem from './NotificationItem'
import { groupBy } from 'lodash'
import './NotificationCenter.scss'
import dayjs from 'dayjs'

export default function NotificationCenter() {
  const { t } = useTranslation()
  const { data } = useGetNotificationsQuery(null)
  const group = groupBy(data, (item: CXNotification) => dayjs(item.created).format('YYYY-MM-DD'))
  console.log(group)
  return (
    <main className="notifications">
      <StageHeader title={t('pages.notifications')} />
      <ul>
        {data &&
          data.map((item: CXNotification) => (
            <li key={item.id}>
              <NotificationItem item={item} />
            </li>
          ))}
      </ul>
    </main>
  )
}
