import { createAsyncThunk } from '@reduxjs/toolkit'
import { ConnectorApi } from './api'
import { SearchParams } from 'types/MainTypes'
import { ConnectorCreateBody } from './types'

const fetchConnectors = createAsyncThunk(
  'connector/fetchConnectors',
  async ({ params }: { params: SearchParams; token: string }) => {
    try {
      // Call axios instance to get values
      return await ConnectorApi.getInstance().getAllConnector(params)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('fetchConnectors api call error')
    }
  }
)

const createConnector = createAsyncThunk(
  'connector/createConnector',
  async ({ body }: { body: ConnectorCreateBody }) => {
    try {
      // Prepare additional hardcoded data to POST call
      const newConnectorBody = {
        name: body.name,
        connectorUrl: body.connectorUrl,
        type: body.type,
        status: 'PENDING',
        location: 'DE',
        provider: '2dc4249f-b5ca-4d42-bef1-7a7a950a4f87',
        host: '2dc4249f-b5ca-4d42-bef1-7a7a950a4f87',
      }

      // Call axios instance to get values
      return await ConnectorApi.getInstance().createConnector(newConnectorBody)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('createConnectors api call error')
    }
  }
)

const deleteConnector = createAsyncThunk(
  'connector/deleteConnector',
  async ({ connectorID }: { connectorID: string }) => {
    try {
      // Call axios instance to get values
      return await ConnectorApi.getInstance().deleteConnector(connectorID)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('deleteConnector api call error')
    }
  }
)

export { fetchConnectors, createConnector, deleteConnector }
