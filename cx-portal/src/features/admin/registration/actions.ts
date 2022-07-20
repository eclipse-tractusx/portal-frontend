import { createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from './api'
import { name, RegistrationRequestAPIResponse } from './types'
import { SearchParams } from '../../connector/types'

const fetchRegistrationRequests = createAsyncThunk(
  `${name}/fetchRegistrationRequests`,
  async ({ params }: { params: SearchParams }) => {
    try {
      //return RegistrationRequests as unknown as Array<RegistrationRequestAPIResponse>
      return await Api.getInstance().getRegistrationRequests(params)
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
