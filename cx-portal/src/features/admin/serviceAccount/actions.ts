import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { PageNotificationsProps } from 'cx-portal-shared-components'
import { Api } from './api'
import { name } from './types'

const setNotification = createAction(`${name}/setNotification`, function update(notification: PageNotificationsProps) {
  return {
    payload: {
      notification
    }
  }
})

const resetNotification = createAction(`${name}/resetNotification`)

const fetchPage = createAsyncThunk(
  `${name}/fetch/page`,
  async (page: number) => {
    try {
      return await Api.getInstance().getItems(page)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(`${name}/fetch/page error`)
    }
  }
)

export { setNotification, resetNotification, fetchPage }
