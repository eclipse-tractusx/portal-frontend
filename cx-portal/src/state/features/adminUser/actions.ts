import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { AdminUserApi } from './api'
import { AddUser } from './types'

const openAdd = createAction('admin/user/openAdd')
const closeAdd = createAction('admin/user/closeAdd')
const setUsersToAdd = createAction<AddUser[]>('admin/user/setUsersToAdd')

const addTenantUsers = createAsyncThunk(
  'admin/user/addTenantUsers',
  async (users: AddUser[]) => {
    try {
      return await AdminUserApi.getInstance().addTenantUsers(users)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('fetchTenantUsers api call error')
    }
  }
)

const fetchTenantUsers = createAsyncThunk(
  'admin/user/fetchTenantUsers',
  async () => {
    try {
      return await AdminUserApi.getInstance().getTenantUsers()
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('fetchTenantUsers api call error')
    }
  }
)

export { openAdd, closeAdd, setUsersToAdd, addTenantUsers, fetchTenantUsers }
