import { createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from './api'
import { Api as ApiMock } from './apiTestdata'
import { name } from './types'

const fetchActive = createAsyncThunk(`${name}/active/fetch`, async () => {
  try {
    return await Api.getInstance().getActive()
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error(`${name}/active/fetch error`)
  }
})

const fetchLatest = createAsyncThunk(`${name}/latest/fetch`, async () => {
  try {
    return await ApiMock.getInstance().getLatest()
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error(`${name}/latest/fetch error`)
  }
})

const fetchSubscribed = createAsyncThunk(
  `${name}/subscribed/fetch`,
  async (all?: boolean) => {
    try {
      return await ApiMock.getInstance().getSubscribed(all)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(`${name}/subscribed/fetch error`)
    }
  }
)

export { fetchActive, fetchLatest, fetchSubscribed }
