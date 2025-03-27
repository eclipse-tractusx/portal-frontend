/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
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

import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    baseUrl: 'http://localhost:3001/', // Your base URL for the app
    backendUrl: 'https://portal-backend.example.org/', // Your backend URL
    user: {
      email: '',
      password: '',
    },
    user1: {
      email: '',
      password: '',
    },
    company: {
      name: '', // Your company name for user
    },
    company1: {
      name: '', // Your company name for user1
    },
    keycloak: {
      centralUrl: 'http://centralidp.example.org/', // Keycloak central URL
      sharedUrl: 'http://sharedidp.example.org/', // Keycloak shared URL
    },
  },
})
