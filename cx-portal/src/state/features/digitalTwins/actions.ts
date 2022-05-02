import { createAsyncThunk } from '@reduxjs/toolkit'
import { DigitalTwinApi } from './api'
import { FilterParams } from './types'

const fetchDigitalTwins = createAsyncThunk(
  'twins/fetch',
  async ({filter}: {filter: FilterParams}) => {
    try {
      return await DigitalTwinApi.getInstance().getTwins(filter)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('DigitalTwin api call error')
    }
  }
)

export { fetchDigitalTwins }
