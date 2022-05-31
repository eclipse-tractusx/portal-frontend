import { createAsyncThunk } from '@reduxjs/toolkit'
import RegistrationRequests from 'utils/mockDataSet/registrationRequests.json'
import { Api } from './api'
import { name, RegistrationRequestAPIResponse } from './types'

const fetchRegistrationRequests = createAsyncThunk(
  `${name}/fetchRegistrationRequests`,
  async () => {
    try {
      // Currently implementation uses mock data
      // This action will change when API endpoint get ready
      return RegistrationRequests as unknown as Array<RegistrationRequestAPIResponse>
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(`${name}/fetchRegistrationRequests error`)
    }
  }
)

const fetchCompanyDetail = createAsyncThunk(
  `${name}/fetchCompanyDetail`,
  async (applicationId: string) => {
    try {
      return await Api.getInstance().getCompanyDetail(applicationId)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(`${name}/fetchCompanyDetail error`)
    }
  }
)

export { fetchCompanyDetail, fetchRegistrationRequests }
