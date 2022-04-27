import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from 'state/api'
import { FilterParams } from './types'

const fetchDigitalTwins = createAsyncThunk(
  '',
  async ({token, filter}: {token: string, filter: FilterParams}) => {
    try {
      return await api.DigitalTwinApi.getInstance(token).getItems(filter)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('DigitalTwin api call error')
    }
  }
)

export { fetchDigitalTwins }
