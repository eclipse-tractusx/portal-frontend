import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import RegistrationRequests from 'utils/mockDataSet/registrationRequests.json'
import { UserAdministrationApi } from './api'
import { AddUser, RegistrationRequestAPIResponse } from './types'

const openAddUser = createAction('admin/user/openAddUser')
const closeAddUser = createAction('admin/user/closeAddUser')

const addTenantUsers = createAsyncThunk(
  'admin/user/addTenantUsers',
  async (users: AddUser[]) => {
    try {
      return await UserAdministrationApi.getInstance().addTenantUsers(users)
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
      return await UserAdministrationApi.getInstance().getTenantUsers()
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('fetchTenantUsers api call error')
    }
  }
)

const fetchRegistrationRequests = createAsyncThunk(
  'admin/user/fetchRegistrationRequests',
  async () => {
    try {
      // Currently implementation uses mock data
      // This action will change when API endpoint get ready
      return RegistrationRequests as unknown as Array<RegistrationRequestAPIResponse>
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('fetchRegistrationRequests api call error')
    }
  }
)

const fetchCompanyDetail = createAsyncThunk(
  'admin/user/fetchCompanyDetail',
  async (applicationId: string) => {
    try {
      // Currently implementation uses mock data
      return await UserAdministrationApi.getInstance().getCompanyDetail(
        applicationId
      )
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('fetchCompanyDetail api call error')
    }
  }
)

export {
  openAddUser,
  closeAddUser,
  addTenantUsers,
  fetchCompanyDetail,
  fetchTenantUsers,
  fetchRegistrationRequests,
}
