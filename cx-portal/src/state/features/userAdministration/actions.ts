import { createAsyncThunk } from '@reduxjs/toolkit'
import RegistrationRequests from 'utils/mockDataSet/registrationRequests.json'
import { UserAdministrationApi } from './api'
import { RegistrationRequestAPIResponse } from './types'

// Token needs to pass from outside to avoid store object circular dependency issue at unit test
// https://github.com/reduxjs/redux-toolkit/issues/1609#issuecomment-941126991
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

export { fetchTenantUsers, fetchRegistrationRequests }
