import { Nullable } from "types/MainTypes"

export interface DigitalTwinsInitialState {
  twinList: TwinList
  twin: Nullable<ShellDescriptor>
  loading: boolean
  error: string
}

export type FilterParams = {
  readonly page: number,
  readonly pageSize: number
}

export interface TwinList {
  items: Array<ShellDescriptor>
  totalItems: number
  itemCount: number
  currentPage: number
  totalPages: number
}

export interface ShellDescriptor {
  description: Description[]
  globalAssetId: {
    value: [string]
  }
  idShort: string
  identification: string
  specificAssetIds: [
    {
      key: string
      semanticId: semanticId
      value: string
    }
  ]
  submodelDescriptors: SubmodelDescriptors[]
}

export interface SubmodelDescriptors {
  description: Description[]
  endpoints: Endpoints[]
  idShort: string
  identification: string
  semanticId: semanticId
}

interface Description {
  language: string
  text: string
}

interface Endpoints {
  interface: string
  protocolInformation: {
    endpointAddress: string
    endpointProtocol: string
    endpointProtocolVersion: string
    subprotocol: string
    subprotocolBody: string
    subprotocolBodyEncoding: string
  }
}

interface semanticId {
  value: string[]
}

