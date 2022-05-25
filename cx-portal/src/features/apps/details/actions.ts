import { createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from './api'
import { name } from './types'

const fetch = createAsyncThunk(`${name}/fetch`, async (appId: string) => {
  try {
    return await Api.getInstance().getItem(appId)
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error(`${name}/fetch api call error`)
  }
})

export { fetch }
