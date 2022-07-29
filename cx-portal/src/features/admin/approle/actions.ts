import { createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from './api'
import { name } from './types'

const fetchRoles = createAsyncThunk(
  `${name}/fetchRoles`,
  async (appId: string) => {
    try {
      return await Api.getInstance().getRoles(appId)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(`${name}/fetch error`)
    }
  }
)

export { fetchRoles }
