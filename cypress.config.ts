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
    setupNodeEvents() {
      // implement node event listeners here
    },
    experimentalModifyObstructiveThirdPartyCode: true,
    chromeWebSecurity: false,
  },
  env: {
    baseUrl: 'http://localhost:3001',
    backendUrl: 'https://portal-backend.development.cofinity-x.com',
    companyName: 'Cofinity-X GmbH',
    userEmail: '',
    userPassword: '',
    adminEmail: '',
    adminPassword: '',
    keycloak: {
      centralUrl: 'https://centralidp.development.cofinity-x.com/auth',
      sharedUrl: 'https://sharedidp.development.cofinity-x.com/auth',
    },
  },
})
