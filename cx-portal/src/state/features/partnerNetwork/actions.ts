import { createAsyncThunk } from '@reduxjs/toolkit'
import { SearchParams } from './types'
import { PartnerNetworkApi } from './api'

const fetchBusinessPartners = createAsyncThunk(
  'partnerNetwork/fetchBusinessPartners',
  async ({ params, token }: { params: SearchParams; token: string }) => {
    try {
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
  async ({ bpn, token }: { bpn: string; token: string }) => {
    try {
      // Call axios instance to get values
      return await PartnerNetworkApi.getInstance().getBusinessPartnerByBpn(bpn)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('getOneBusinessPartner api call error')
    }
  }
)

export { getOneBusinessPartner, fetchBusinessPartners }
