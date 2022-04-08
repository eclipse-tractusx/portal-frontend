import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from 'state/api'
import { SearchParams } from 'types/partnerNetwork/PartnerNetworkTypes'

const fetchBusinessPartners = createAsyncThunk(
  'partnerNetwork/fetchBusinessPartners',
  async ({ params, token }: { params: SearchParams; token: string }) => {
    try {
      // Call axios instance to get values

      const partnerNetworkApi = api.PartnerNetworkApi.getInstance(token)
      return await partnerNetworkApi.getAllBusinessPartner(params)
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
      const partnerNetworkApi = api.PartnerNetworkApi.getInstance(token)
      return await partnerNetworkApi.getBusinessPartnerByBpn(bpn)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('getOneBusinessPartner api call error')
    }
  }
)

export { getOneBusinessPartner, fetchBusinessPartners }
