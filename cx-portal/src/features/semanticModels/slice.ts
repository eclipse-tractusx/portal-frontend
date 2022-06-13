import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'features/store'
import { RequestState } from 'types/MainTypes'
import {
  fetchSemanticModelById,
  fetchSemanticModels,
  postSemanticModel,
} from './actions'
import { ModelList, SemanticModel, SemanticModelsInitialState } from './types'

const defaultModels: ModelList = {
  items: [],
  totalItems: 0,
  itemCount: 0,
  currentPage: 0,
  totalPages: 0,
}

const initialState: SemanticModelsInitialState = {
  modelList: defaultModels,
  model: null,
  loading: false,
  uploading: false,
  uploadRequest: RequestState.NONE,
  error: '',
}

const modelsSlice = createSlice({
  name: 'semanticModels',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSemanticModels.pending, (state) => {
      state.modelList = defaultModels
      state.loading = true
      state.error = ''
    })
    builder.addCase(fetchSemanticModels.fulfilled, (state, { payload }) => {
      state.modelList = payload as ModelList
      state.loading = false
      state.error = ''
    })
    builder.addCase(fetchSemanticModels.rejected, (state, action) => {
      state.modelList = defaultModels
      state.loading = false
      state.error = action.error.message as string
    })
    builder.addCase(fetchSemanticModelById.pending, (state) => {
      state.model = null
      state.loading = true
      state.error = ''
    })
    builder.addCase(fetchSemanticModelById.fulfilled, (state, { payload }) => {
      state.model = payload as SemanticModel
      state.loading = false
      state.error = ''
    })
    builder.addCase(fetchSemanticModelById.rejected, (state, action) => {
      state.model = null
      state.loading = false
      state.error = action.error.message as string
    })
    builder.addCase(postSemanticModel.pending, (state) => {
      state.uploading = true
      state.uploadRequest = RequestState.SUBMIT
      state.error = ''
    })
    builder.addCase(postSemanticModel.fulfilled, (state) => {
      state.uploading = false
      state.uploadRequest = RequestState.OK
      state.error = ''
    })
    builder.addCase(postSemanticModel.rejected, (state, action) => {
      state.uploading = false
      state.uploadRequest = RequestState.ERROR
      state.error = action.error.message as string
    })
  },
})

export const semanticModelsSelector = (
  state: RootState
): SemanticModelsInitialState => state.semanticModels

export default modelsSlice
