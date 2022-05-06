export type ConnectorResponse = {
  id: string
  name: string
  type: string
}

export type PaginationData = {
  totalElements: number
  page: number
}

export type ConnectorInitialState = {
  paginationData: PaginationData
  connectorList: Array<ConnectorResponse>
  loading: boolean
  error: string
}

/*

// Mock type reserved for mapping API response to Data grid type
export type ConnectorDataGrid = {
  id: string
  name: string
  type: string
}

 */

export type SearchParams = {
  readonly name?: string
  readonly page: number
  readonly size: number
}
