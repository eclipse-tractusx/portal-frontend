import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDetailsApi } from './api'

const fetchItem = createAsyncThunk('appDetails/fetchItem', async (appId: string) => {
  try {
    return await AppDetailsApi.getInstance().getItem(appId)
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error('fetchItems api call error')
  }
})

export { fetchItem }
