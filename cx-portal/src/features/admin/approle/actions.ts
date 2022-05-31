import { createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from './apiTestdata'
import { name } from './types'

const fetchItems = createAsyncThunk(`${name}/fetch`, async (appId: string) => {
  try {
    return await Api.getInstance().getItems(appId)
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error(`${name}/fetch error`)
  }
})

export { fetchItems }
