import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from './api'
import { AddUser, name } from './types'

const openAdd = createAction(`${name}/openAdd`)
const closeAdd = createAction(`${name}/closeAdd`)
const setUsersToAdd = createAction<AddUser[]>(`${name}/setUsersToAdd`)

const openTechnicalUserAdd = createAction(`${name}/openTechnicalUserAdd`)
const closeTechnicalUserAdd = createAction(`${name}/closeTechnicalUserAdd`)

const addTenantUsers = createAsyncThunk(
  `${name}/add`,
  async (users: AddUser[]) => {
    try {
      return await Api.getInstance().addTenantUsers(users)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(`${name}/add error`)
    }
  }
)

const fetchTenantUsers = createAsyncThunk(`${name}/fetch`, async () => {
  try {
    return await Api.getInstance().getTenantUsers()
  } catch (error: unknown) {
    console.error('api call error:', error)
    throw Error(`${name}/fetch error`)
  }
})

export { openAdd, closeAdd, setUsersToAdd, openTechnicalUserAdd, closeTechnicalUserAdd, addTenantUsers, fetchTenantUsers }
