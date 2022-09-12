import { createAsyncThunk } from '@reduxjs/toolkit'
import { SearchParams } from 'types/MainTypes'
import { PartnerNetworkApi } from './api'

const fetchMemberCompaniesData = createAsyncThunk(
  'partnerNetwork/fetchMemberCompaniesData',
  async () => {
    try {
      // Call axios instance to get values
      return await PartnerNetworkApi.getInstance().getAllMemberCompanies()
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw new Error('Error while fetching membership data')
    }
  }
)

const fetchBusinessPartners = createAsyncThunk(
  'partnerNetwork/fetchBusinessPartners',
  async ({ params }: { params: SearchParams }, { dispatch }) => {
    try {
      try {
        await dispatch(fetchMemberCompaniesData()).unwrap()
      } catch {
        //keeping this catch block silent as we are always calling the business partner api,
        //whether memebership returns data or not
      }
      // Call axios instance to get values
      return await PartnerNetworkApi.getInstance().getAllBusinessPartner(params)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('fetchBusinessPartners api call error')
    }
  }
)
const getOneBusinessPartner = createAsyncThunk(
  'partnerNetwork/getOneBusinessPartner',
  async ({ bpn }: { bpn: string }) => {
    try {
      // Call axios instance to get values
      return await PartnerNetworkApi.getInstance().getBusinessPartnerByBpn(bpn)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('getOneBusinessPartner api call error')
    }
  }
)

export {
  getOneBusinessPartner,
  fetchBusinessPartners,
  fetchMemberCompaniesData,
}
