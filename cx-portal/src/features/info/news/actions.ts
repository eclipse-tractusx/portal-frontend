import { createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from './api'
import { name } from './types'

const fetchItems = createAsyncThunk(`${name}/fetch`, async () => {
  try {
    return await Api.getInstance().getItems()
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error(`${name}/fetch error`)
  }
})

export { fetchItems }
