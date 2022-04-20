import { createAsyncThunk } from '@reduxjs/toolkit'
import { LicensesApi } from './api'

const fetchItems = createAsyncThunk('licenses/fetchItems', async () => {
  try {
    return await LicensesApi.getInstance().getItems()
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error('fetchItems api call error')
  }
})

export { fetchItems }
