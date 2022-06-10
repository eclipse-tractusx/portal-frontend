import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'features/store'
import { initErrorServiceState } from 'types/MainTypes'
import { ErrorServiceState, initialState, name } from './types'

export const ErrorSlice = createSlice({
  name,
  initialState,
  reducers: {
    setError: (state, { payload }) => ({
      ...state,
      hasError: payload.hasError,
      hasNavigation: payload.hasNavigation,
      header: payload.header,
      title: payload.title,
      description: payload.description,
      reloadPageLink: payload.reloadPageLink,
      reloadButtonTitle: payload.reloadButtonTitle,
      homePageLink: payload.homePageLink,
      homeButtonTitle: payload.homeButtonTitle,
    }),
    resetError: (state) => ({
      ...state,
      hasError: initErrorServiceState.hasError,
      hasNavigation: initErrorServiceState.hasNavigation,
      header: initErrorServiceState.header,
      title: initErrorServiceState.title,
      description: initErrorServiceState.description,
      reloadPageLink: initErrorServiceState.reloadPageLink,
      reloadButtonTitle: initErrorServiceState.reloadButtonTitle,
      homePageLink: initErrorServiceState.homePageLink,
      homeButtonTitle: initErrorServiceState.homeButtonTitle,
    }),
  },
})

export const errorSelector = (state: RootState): ErrorServiceState =>
  state.error

export default ErrorSlice
