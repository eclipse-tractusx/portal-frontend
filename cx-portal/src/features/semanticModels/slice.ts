import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'features/store'
import { RequestState } from 'types/MainTypes'
import {
  fetchSemanticModelById,
  fetchSemanticModels,
  postSemanticModel,
  fetchModelArtefact,
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
  ttlFile: '',
  jsonFile: '',
  payloadFile: '',
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
    builder.addCase(fetchModelArtefact.pending, (state, action) => {
      setFileType(action.meta.arg.type, state, '')
      state.error = ''
    })
    builder.addCase(fetchModelArtefact.fulfilled, (state, action) => {
      const value = URL.createObjectURL(action.payload);
      setFileType(action.meta.arg.type, state, value)
      state.error = ''
    })
    builder.addCase(fetchModelArtefact.rejected, (state, action) => {
      setFileType(action.meta.arg.type, state, '')
      state.error = action.error.message as string
    })
  },
})

const setFileType = (type: string, state: SemanticModelsInitialState, value: string) => {
  switch(type) { 
    case 'diagram': { 
      state.diagram = value
      break; 
    } 
    case 'ttl': { 
      state.ttlFile = value
      break; 
    }
    case 'json': { 
      state.jsonFile = value
      break; 
    }
    case 'payload': { 
      state.payloadFile = value
      break; 
    }
  }
}

export const semanticModelsSelector = (
  state: RootState
): SemanticModelsInitialState => state.semanticModels

export default modelsSlice
