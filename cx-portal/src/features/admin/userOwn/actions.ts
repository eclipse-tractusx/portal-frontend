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

const putResetPassword = createAsyncThunk(
  `${name}/resetPassword`,
  async (companyUserId: string) => {
    try {
      return await Api.getInstance().resetPassword(companyUserId)
    } catch (error: any) {
      throw Error(JSON.stringify(error.response.status))
    }
  }
)

export { fetch, putResetPassword }
