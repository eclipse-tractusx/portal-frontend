import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from 'state/api'

const fetchDigitalTwins = createAsyncThunk(
  '',
  async ({token}: {token: string}) => {
    try {
      return await api.DigitalTwinApi.getInstance(token).getItems()
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('DigitalTwin api call error')
    }
  }
)

export { fetchDigitalTwins }
