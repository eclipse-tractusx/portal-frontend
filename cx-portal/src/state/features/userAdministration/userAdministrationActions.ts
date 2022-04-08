import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from 'state/api'
import RegistrationRequests from 'utils/mockDataSet/registrationRequests.json'
import { RegistrationRequestAPIResponse } from 'types/userAdministration/UserAdministrationTypes'

// Token needs to pass from outside to avoid store object circular dependency issue at unit test
// https://github.com/reduxjs/redux-toolkit/issues/1609#issuecomment-941126991
const fetchTenantUsers = createAsyncThunk(
  'userAdministration/fetchTenantUsers',
  async ({ token, tenant }: { token: string; tenant: string }) => {
    try {
      // Call axios instance to get values
      if (token) {
        const userAdministrationApi =
          api.UserAdministrationApi.getInstance(token)
        return await userAdministrationApi.getTenantUsers(tenant)
      }
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('fetchTenantUsers api call error')
    }
  }
)

const fetchRegistrationRequests = createAsyncThunk(
  'userAdministration/fetchRegistrationRequests',
  async (token: string) => {
    try {
      // Call axios instance to get values
      if (token) {
        // Currently implementation uses mock data
        // This action will change when API endpoint get ready
        return RegistrationRequests as unknown as Array<RegistrationRequestAPIResponse>
      }
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('fetchRegistrationRequests api call error')
    }
  }
)

export { fetchTenantUsers, fetchRegistrationRequests }
