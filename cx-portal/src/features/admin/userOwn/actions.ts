import { createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from './api'
import { name } from './types'

const fetchOwn = createAsyncThunk(`${name}/fetchOwn`, async () => {
  try {
    return await Api.getInstance().getUserOwn()
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error(`${name}/fetchOwn error`)
  }
})

const fetchAny = createAsyncThunk(
  `${name}/fetchAny`,
  async (companyUserId: string) => {
    try {
      return await Api.getInstance().getUserInfo(companyUserId)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(`${name}/fetchAny error`)
    }
  }
)

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

export { fetchOwn, fetchAny, putResetPassword }
