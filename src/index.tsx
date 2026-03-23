/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
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

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from 'features/store'
import AccessService from 'services/AccessService'
import I18nService from 'services/I18nService'
import UserService from 'services/UserService'
import AuthorizingRouter from 'components/AuthorizingRouter'
import {
  SharedThemeProvider,
  SharedCssBaseline,
} from '@arena2036/portal-shared-components-construct-x'
import CompanyService from 'services/CompanyService'
import ErrorBoundary from 'components/pages/ErrorBoundary'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

I18nService.init()
AccessService.init()

UserService.init(() => {
  CompanyService.init(
    () => {
      createRoot(document.getElementById('app')!).render(
        <StrictMode>
          <SharedCssBaseline />
          <Provider store={store}>
            <SharedThemeProvider>
              <AuthorizingRouter />
            </SharedThemeProvider>
          </Provider>
        </StrictMode>
      )
    },
    () => {
      createRoot(document.getElementById('app')!).render(
        <StrictMode>
          <SharedCssBaseline />
          <Provider store={store}>
            <SharedThemeProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="*" element={<ErrorBoundary />} />
                </Routes>
              </BrowserRouter>
            </SharedThemeProvider>
          </Provider>
        </StrictMode>
      )
    }
  )
})
