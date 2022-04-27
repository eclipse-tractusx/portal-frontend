import { createAsyncThunk } from '@reduxjs/toolkit'
import { DigitalTwinApi } from './api'
import { FilterParams } from './types'

const fetchDigitalTwins = createAsyncThunk(
  '',
  async ({filter}: {filter: FilterParams}) => {
    try {
      return await DigitalTwinApi.getInstance().getItems(filter)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('DigitalTwin api call error')
    }
  }
)

export { fetchDigitalTwins }
