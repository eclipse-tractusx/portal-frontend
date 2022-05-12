import { createAsyncThunk } from '@reduxjs/toolkit'
import RegistrationRequests from 'utils/mockDataSet/registrationRequests.json'
import { AdminRegistrationApi } from './api'
import { RegistrationRequestAPIResponse } from './types'

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
      return await AdminRegistrationApi.getInstance().getCompanyDetail(
        applicationId
      )
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('fetchCompanyDetail api call error')
    }
  }
)

export { fetchCompanyDetail, fetchRegistrationRequests }
