import { createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from './api'
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
    return await Api.getInstance().getLatest()
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error(`${name}/latest/fetch error`)
  }
})

const fetchSubscriptionStatus = createAsyncThunk(
  `${name}/subscribed/subscription-status`,
  async () => {
    try {
      return await Api.getInstance().getSubscriptionStatus()
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(`${name}/subscribed/subscription-status error`)
    }
  }
)

export { fetchActive, fetchLatest, fetchSubscriptionStatus }
