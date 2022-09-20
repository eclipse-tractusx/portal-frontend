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
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from 'features/store'
import I18nService from 'services/I18nService'
import UserService from 'services/UserService'
import { AuthProvider } from 'components/AuthProvider'
import AuthorizingRouter from 'components/AuthorizingRouter'

import {
  SharedThemeProvider,
  SharedCssBaseline,
} from 'cx-portal-shared-components'

I18nService.init()

UserService.init((user) => {
  ReactDOM.render(
    <React.StrictMode>
      <SharedCssBaseline />
      <Provider store={store}>
        <SharedThemeProvider>
          <AuthProvider user={user}>
            <AuthorizingRouter />
          </AuthProvider>
        </SharedThemeProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById('app')
  )
})
