import { createSlice } from '@reduxjs/toolkit'
import {
  ConnectorResponse,
  PaginationData,
  ConnectorInitialState,
} from './types'
import { RootState } from 'features/store'
import { fetchConnectors } from './actions'

const initialState: ConnectorInitialState = {
  paginationData: {} as PaginationData,
  connectorList: [],
  loading: true,
  error: '',
}

const connectorSlice = createSlice({
  name: 'connector',
  initialState,
  reducers: {
    resetConnectorState: (state) => {
      state.connectorList = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConnectors.pending, (state) => {
      state.paginationData = {} as PaginationData
      state.connectorList = []
      state.loading = true
    })
    builder.addCase(fetchConnectors.fulfilled, (state, { payload }) => {
      const mappedList = payload as unknown as Array<ConnectorResponse>
      state.connectorList = mappedList
      // Mock pagination to simulate API response
      // It will be change after API gets ready
      state.paginationData = {
        totalElements: mappedList.length,
        page: 1,
      } as PaginationData

      state.loading = false
    })
    builder.addCase(fetchConnectors.rejected, (state, action) => {
      state.paginationData = {} as PaginationData
      state.connectorList = []
      state.loading = false
      state.error = action.error.message as string
    })
  },
})

export const connectorSelector = (state: RootState): ConnectorInitialState =>
  state.connector

export default connectorSlice
