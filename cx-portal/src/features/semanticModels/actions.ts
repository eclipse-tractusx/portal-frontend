import { createAsyncThunk } from '@reduxjs/toolkit'
import { Api } from './api'
import { FilterParams, NewSemanticModel } from './types'

const message = 'The server responded with an error.'

const fetchSemanticModels = createAsyncThunk(
  'fetch semantic models',
  async ({ filter }: { filter: FilterParams }) => {
    try {
      return await Api.getInstance().getModels(filter)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(`Fetching models failed: ${message}`)
    }
  }
)
const fetchSemanticModelById = createAsyncThunk(
  'fetch semantic model by id',
  async (id: string) => {
    try {
      return await Api.getInstance().getModelById(id)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(`Fetching model failed: ${message}`)
    }
  }
)

const deleteSemanticModelById = createAsyncThunk(
  'delete model by id',
  async (params: { id: string; modelName: string }) => {
    const { id, modelName } = params
    try {
      const encodedUrn = encodeURIComponent(id.replace(modelName, ''))
      return await Api.getInstance()
        .deleteModelById(encodedUrn)
        .then(() => id)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error(`Deleting model failed: ${message}`)
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
const changeOpenApiUrl = createAsyncThunk(
  'change open API URL and fetch JSON',
  async (params: { id: string; url: string }) => {
    const { id, url } = params
    try {
      return await Api.getInstance().getOpenAPIUrl(id, url)
    } catch (error: unknown) {
      console.error('api call error:', error)
      throw Error('Change open API URL call error.')
    }
  }
)
export {
  fetchSemanticModels,
  fetchSemanticModelById,
  deleteSemanticModelById,
  postSemanticModel,
  changeOpenApiUrl,
}
