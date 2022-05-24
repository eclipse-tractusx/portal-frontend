import { createAsyncThunk } from '@reduxjs/toolkit'
//import { ConnectorApi } from './api'
//import { SearchParams } from './types'
import ConnectorResultsMock from 'utils/mockDataSet/connectorResults.json'

// action params: { params }: { params: SearchParams; token: string }
const fetchConnectors = createAsyncThunk(
  'connector/fetchConnectors',
  async () => {
    try {
      // Call axios instance to get values
      //return await ConnectorApi.getInstance().getAllConnector(params)
      return ConnectorResultsMock
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('fetchBusinessPartners api call error')
    }
  }
)

export { fetchConnectors }
