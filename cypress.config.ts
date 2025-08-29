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
    experimentalModifyObstructiveThirdPartyCode: true,
    chromeWebSecurity: false,
    experimentalRunAllSpecs: true,
    viewportWidth: 1920,
    viewportHeight: 1080,
    experimentalMemoryManagement: true,

    // Retry configuration for flaky tests
    retries: {
      runMode: 2, // Retry failed tests twice in CI
      openMode: 0, // No retries in open mode
    },

    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' || browser.name === 'chromium') {
          // Force English language in Chrome until HTML headers are updated
          launchOptions.args.push('--lang=en-US')
          launchOptions.args.push('--accept-lang=en-US')
        }
        return launchOptions
      })
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
  },
  // Input below only env values that need to be the same across all machines, otherwise use cypress.env.json on your local machine
  env: {
    baseUrl: 'http://localhost:3001',
    backendUrl: 'https://portal-backend.development.cofinity-x.com',
    keycloak: {
      centralUrl: 'https://centralidp.development.cofinity-x.com/auth',
      sharedUrl: 'https://sharedidp.development.cofinity-x.com/auth',
    },
    companyName: 'Cofinity-X GmbH',
    // Add userEmail and userPassword env variables to your local cypress.env.json for tests to run properly.
    // See Readme for more explanation
  },
})
