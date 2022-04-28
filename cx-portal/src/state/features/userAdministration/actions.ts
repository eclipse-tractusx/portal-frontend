import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import RegistrationRequests from 'utils/mockDataSet/registrationRequests.json'
import { UserAdministrationApi } from './api'
import { RegistrationRequestAPIResponse } from './types'

const openAddUser = createAction('userAdministration/openAddUser')
const closeAddUser = createAction('userAdministration/closeAddUser')

const fetchTenantUsers = createAsyncThunk(
  'userAdministration/fetchTenantUsers',
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
  'userAdministration/fetchRegistrationRequests',
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

export {
  openAddUser,
  closeAddUser,
  fetchTenantUsers,
  fetchRegistrationRequests,
}
