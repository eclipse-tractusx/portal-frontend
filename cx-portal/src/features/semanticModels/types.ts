import { Nullable } from 'types/MainTypes'

export interface SemanticModelsInitialState {
  modelList: ModelList
  model: Nullable<SemanticModel>
  loading: boolean
  error: string
}

export type FilterParams = {
  readonly page: number
  readonly pageSize: number
}

export interface ModelList {
  items: Array<SemanticModel>
  totalItems: number
  itemCount: number
  currentPage: number
  totalPages: number
}

export interface SemanticModel {
  name: string
  description: string
  urn: string
  version: string
  type: string
  status: string
}