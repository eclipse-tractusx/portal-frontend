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

const fetchPage = createAsyncThunk(
  `${name}/fetchPage`,
  async (page: number) => {
    try {
      return await Api.getInstance().getItems(page)
    } catch (error: unknown) {
      throw Error(`${name}/fetchPage error`)
    }
  }
)

const approveRequest = createAsyncThunk(
  `${name}/approveRequest`,
  async (applicationId: string) => {
    try {
      return await Api.getInstance().approveRegistrationRequest(applicationId)
    } catch (error: unknown) {
      throw Error(`${name}/approveRequest error`)
    }
  }
)

const declineRequest = createAsyncThunk(
  `${name}/declineRequest`,
  async (applicationId: string) => {
    try {
      return await Api.getInstance().declineRegistrationRequest(applicationId)
    } catch (error: unknown) {
      throw Error(`${name}/declineRequest error`)
    }
  }
)

export {
  fetchCompanyDetail,
  fetchRegistrationRequests,
  fetchPage,
  approveRequest,
  declineRequest,
}
