/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { render as renderRtl } from '@testing-library/react'
import { RootState, reducers } from 'features/store'

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
