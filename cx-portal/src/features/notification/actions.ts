import { createAction } from '@reduxjs/toolkit'
import { PageNotificationsProps } from 'cx-portal-shared-components'
import { name } from './types'

const setNotification = createAction(
  `${name}/setNotification`,
  function update(notification: PageNotificationsProps) {
    return {
      payload: {
        notification,
      },
    }
  }
)

const resetNotification = createAction(`${name}/resetNotification`)

export { setNotification, resetNotification }
