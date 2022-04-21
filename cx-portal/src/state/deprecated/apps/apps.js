import { createSlice } from '@reduxjs/toolkit'
import { appsCallBegan } from './appsAPI'

const appsSlice = createSlice({
  name: 'apps',
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    appsRequested: (apps) => {
      apps.loading = true
    },

    appsReceived: (apps, action) => {
      apps.list = action.payload
      apps.loading = false
    },

    appsRequestFailed: (apps) => {
      apps.loading = false
    },
  },
})

export default appsSlice

const { appsRequested, appsReceived, appsRequestFailed } = appsSlice.actions

const url = 'testdata/apps.json'

export const loadApps = () => (dispatch) => {
  return dispatch(
    appsCallBegan({
      url,
      onStart: appsRequested.type,
      onSuccess: appsReceived.type,
      onError: appsRequestFailed.type,
    })
  )
}
