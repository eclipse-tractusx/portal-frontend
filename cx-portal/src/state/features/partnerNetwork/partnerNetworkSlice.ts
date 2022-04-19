import { createSlice } from '@reduxjs/toolkit'
import {
  BusinessPartner,
  BusinessPartnerResponse,
  PartnerNetworkDataGrid,
  PartnerNetworkInitialState,
} from 'types/partnerNetwork/PartnerNetworkTypes'
import { RootState } from 'state/store'
import {
  getOneBusinessPartner,
  fetchBusinessPartners,
} from 'state/features/partnerNetwork/partnerNetworkActions'
import {
  mapSingleBusinessPartnerToDataGrid,
  mapBusinessPartnerToDataGrid,
} from 'utils/dataMapper'

const initialState: PartnerNetworkInitialState = {
  businessPartners: {} as BusinessPartnerResponse,
  mappedPartnerList: [],
  loading: true,
  error: '',
}

const partnerNetworkSlice = createSlice({
  name: 'partnerNetwork',
  initialState,
  reducers: {
    resetPartnerNetworkState: (state)=>{
      state.mappedPartnerList = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getOneBusinessPartner.pending, (state) => {
      state.businessPartners = {} as BusinessPartnerResponse
      state.mappedPartnerList = []
      state.loading = true
    })
    builder.addCase(getOneBusinessPartner.fulfilled, (state, { payload }) => {
      const bp = payload as BusinessPartner
      const mappedList = [
        mapSingleBusinessPartnerToDataGrid(bp),
      ] as Array<PartnerNetworkDataGrid>
      state.mappedPartnerList = mappedList
      state.businessPartners = {
        content: [
          {
            score: 1, // Only one response always has top score,
            businessPartner: bp,
          },
        ],
        contentSize: mappedList.length,
        totalElements: mappedList.length,
        totalPages: 1, // One business partner or null can be possible values here. Page is always default 1
        page: 1, // One business partner or null can be possible values here. Page is always default 1
      } as BusinessPartnerResponse

      state.loading = false
    })
    builder.addCase(getOneBusinessPartner.rejected, (state, action) => {
      state.businessPartners = {} as BusinessPartnerResponse
      state.mappedPartnerList = []
      state.loading = false
      state.error = action.error.message as string
    })
    builder.addCase(fetchBusinessPartners.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchBusinessPartners.fulfilled, (state, { payload }) => {
      const payloadList = payload as BusinessPartnerResponse
      try {
        state.mappedPartnerList = [
          ...state.mappedPartnerList,
          ...mapBusinessPartnerToDataGrid(
            payloadList
          ) as Array<PartnerNetworkDataGrid>
        ]
        state.loading = false
        state.businessPartners = payloadList
      } catch (error: unknown) {
        return {
          ...state,
          loading: false,
          error: (error as Error).message as string,
        } as PartnerNetworkInitialState
      }
    })
    builder.addCase(fetchBusinessPartners.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message as string
    })
  },
})

export const selectorPartnerNetwork = (
  state: RootState,
): PartnerNetworkInitialState => state.partnerNetwork
export default partnerNetworkSlice
