import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { render as renderRtl } from '@testing-library/react'
import { RootState } from 'state/store'
import { reducers } from 'state/features/reducer'

interface WrapperProps {
  children?: React.ReactNode
}

const testStore = (state: Partial<RootState>) => {
  return configureStore({
    reducer: reducers,
    preloadedState: state,
  })
}

export const renderWithStore = (
  component: React.ReactNode,
  initialState: any
) => {
  const Wrapper = ({ children }: WrapperProps) => (
    <Provider store={testStore(initialState)}>{children}</Provider>
  )
  return renderRtl(component as any, { wrapper: Wrapper })
}
