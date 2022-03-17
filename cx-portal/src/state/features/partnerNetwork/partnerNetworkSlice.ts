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
  columns: [
    { field: 'id', headerName: 'BPN', hide: false, flex: 2 },
    {
      field: 'name',
      headerName: 'Name',
      description: 'Name of the Company',
      flex: 4,
    },
    { field: 'country', headerName: 'Country', flex: 1 },
    { field: 'street', headerName: 'Street Address', flex: 2 },
    { field: 'zipCode', headerName: 'Zip Code', flex: 1 },
    { field: 'city', headerName: 'City', flex: 1 },
    { field: 'taxId', headerName: 'Tax ID', flex: 1 },
  ],
  error: '',
}

const partnerNetworkSlice = createSlice({
  name: 'partnerNetwork',
  initialState,
  reducers: {},
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
        content: [bp],
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
      state.businessPartners = {} as BusinessPartnerResponse
      state.mappedPartnerList = []
      state.loading = true
    })
    builder.addCase(fetchBusinessPartners.fulfilled, (state, { payload }) => {
      const payloadList = payload as BusinessPartnerResponse

      state.mappedPartnerList = mapBusinessPartnerToDataGrid(
        payloadList
      ) as Array<PartnerNetworkDataGrid>
      state.businessPartners = payloadList

      state.loading = false
    })
    builder.addCase(fetchBusinessPartners.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message as string
    })
  },
})

export const selectorPartnerNetwork = (
  state: RootState
): PartnerNetworkInitialState => state.partnerNetwork
export default partnerNetworkSlice
