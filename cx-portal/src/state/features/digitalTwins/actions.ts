import { createAsyncThunk } from '@reduxjs/toolkit'
import { DigitalTwinApi } from './api'
import { FilterParams } from './types'

const fetchDigitalTwins = createAsyncThunk(
  'fetch twins',
  async ({ filter }: { filter: FilterParams }) => {
    try {
      return await DigitalTwinApi.getInstance().getTwins(filter)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('DigitalTwin api call error')
    }
  }
)
const fetchTwinById = createAsyncThunk(
  'fetch twin by id',
  async (id: string) => {
    try {
      return await DigitalTwinApi.getInstance().getTwinById(id)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('Get twin by id api call error')
    }
  }
)

export { fetchDigitalTwins, fetchTwinById }
