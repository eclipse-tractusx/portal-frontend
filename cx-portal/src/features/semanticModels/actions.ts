import { createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from './api'
import { FilterParams, NewSemanticModel } from './types'

const fetchSemanticModels = createAsyncThunk(
  'fetch semantic models',
  async ({ filter }: { filter: FilterParams }) => {
    try {
      return await Api.getInstance().getModels(filter)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('Semantic model api call error.')
    }
  }
)
const fetchSemanticModelById = createAsyncThunk(
  'fetch twin by id',
  async (id: string) => {
    try {
      return await Api.getInstance().getModelById(id)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('Get semantic model by id api call error.')
    }
  }
)
const postSemanticModel = createAsyncThunk(
  'post semantic model',
  async (model: NewSemanticModel) => {
    try {
      return await Api.getInstance().postSemanticModel(model)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(`${error}. Adding a new model failed.`)
    }
  }
)
const fetchModelArtefact = createAsyncThunk(
  'fetch model artefact',
  async (params: { type: string; id: string }) => {
    const { type, id } = params
    try {
      return await Api.getInstance().getArtifact(type, id)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('Fetch model artefact api call error.')
    }
  }
)
export {
  fetchSemanticModels,
  fetchSemanticModelById,
  postSemanticModel,
  fetchModelArtefact,
}
