import { createAsyncThunk } from '@reduxjs/toolkit'
import { store } from 'state/store'
import { api } from 'state/api'
import { SearchParams } from 'types/partnerNetwork/PartnerNetworkTypes'

const fetchBusinessPartners = createAsyncThunk(
  'partnerNetwork/fetchBusinessPartners',
  async (params: SearchParams) => {
    try {
      // Call axios instance to get values
      if (store.getState().user?.token) {
        const partnerNetworkApi = api.PartnerNetworkApi.getInstance(
          store.getState().user?.token
        )
        return await partnerNetworkApi.getAllBusinessPartner(params)
      }
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('fetchBusinessPartners api call error')
    }
  }
)

const getOneBusinessPartner = createAsyncThunk(
  'partnerNetwork/getOneBusinessPartner',
  async (bpn: string) => {
    try {
      // Call axios instance to get values
      if (store.getState().user?.token) {
        const partnerNetworkApi = api.PartnerNetworkApi.getInstance(
          store.getState().user?.token
        )
        return await partnerNetworkApi.getBusinessPartnerByBpn(bpn)
      }
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('getOneBusinessPartner api call error')
    }
  }
)

export { getOneBusinessPartner, fetchBusinessPartners }
