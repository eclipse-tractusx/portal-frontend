import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from './api'
import { name, ServiceAccountCreate } from './types'

const setAddItem = createAction<ServiceAccountCreate>(`${name}/setAddItem`)

const fetchPage = createAsyncThunk(
  `${name}/fetchPage`,
  async (page: number) => {
    try {
      return await Api.getInstance().getItems(page)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(`${name}/fetchPage error`)
    }
  }
)

const fetchDetail = createAsyncThunk(
  `${name}/fetchDetail`,
  async (id: string) => {
    try {
      return await Api.getInstance().getDetail(id)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(`${name}/fetchDetail error`)
    }
  }
)

const addItem = createAsyncThunk(
  `${name}/add`,
  async (account: ServiceAccountCreate) => {
    try {
      return await Api.getInstance().postItem(account)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(`${name}/add error`)
    }
  }
)

const removeItem = createAsyncThunk(`${name}/remove`, async (id: string) => {
  try {
    return await Api.getInstance().deleteItem(id)
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error(`${name}/remove error`)
  }
})

export { fetchPage, fetchDetail, addItem, removeItem, setAddItem }
