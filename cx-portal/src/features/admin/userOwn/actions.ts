import { createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from './api'
import { name } from './types'

const fetch = createAsyncThunk(`${name}/fetch`, async () => {
  try {
    return await Api.getInstance().getUserOwn()
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error(`${name}/fetch error`)
  }
})

export { fetch }
