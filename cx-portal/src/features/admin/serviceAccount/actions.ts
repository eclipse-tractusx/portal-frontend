import { createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from './api'
import { name } from './types'

const fetchPage = createAsyncThunk(
  `${name}/fetch/page`,
  async (page: number) => {
    try {
      return await Api.getInstance().getItems(page)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(`${name}/fetch/page error`)
    }
  }
)

export { fetchPage }
