import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'features/store'
import { RequestState } from 'types/MainTypes'
import {
  fetchSemanticModelById,
  fetchSemanticModels,
  postSemanticModel,
  fetchModelDiagram,
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
  diagram: '',
  loadingDiagram: false,
  ttlFile: null,
  jsonFile: null,
  payloadFile: null,
  loadingList: false,
  loadingModel: false,
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
      state.loadingList = true
      state.error = ''
    })
    builder.addCase(fetchSemanticModels.fulfilled, (state, { payload }) => {
      state.modelList = payload as ModelList
      state.loadingList = false
      state.error = ''
    })
    builder.addCase(fetchSemanticModels.rejected, (state, action) => {
      state.modelList = defaultModels
      state.loadingList = false
      state.error = action.error.message as string
    })
    builder.addCase(fetchSemanticModelById.pending, (state) => {
      state.model = null
      state.loadingModel = true
      state.error = ''
    })
    builder.addCase(fetchSemanticModelById.fulfilled, (state, { payload }) => {
      state.model = payload as SemanticModel
      state.loadingModel = false
      state.error = ''
    })
    builder.addCase(fetchSemanticModelById.rejected, (state, action) => {
      state.model = null
      state.loadingModel = false
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
    builder.addCase(fetchModelDiagram.pending, (state) => {
      state.loadingDiagram = true
      state.diagram = ''
      state.error = ''
    })
    builder.addCase(fetchModelDiagram.fulfilled, (state, { payload }) => {
      state.loadingDiagram = false
      state.diagram = URL.createObjectURL(payload)
      state.error = ''
    })
    builder.addCase(fetchModelDiagram.rejected, (state, action) => {
      state.loadingDiagram = false
      state.diagram = ''
      state.error = action.error.message as string
    })
  },
})

export const semanticModelsSelector = (
  state: RootState
): SemanticModelsInitialState => state.semanticModels

export default modelsSlice
