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
/* eslint-disable @typescript-eslint/no-namespace */

import { USER_TYPES } from './constants'

declare global {
  namespace Cypress {
    interface Chainable {
      login: (userType: string) => Chainable<void>
      snackbarAlert: (msg: string) => Chainable<void>
    }
  }
}

// @ref https://on.cypress.io/custom-commands
Cypress.Commands.add('login', (currentUserType) => {
  // creating a session for user login
  cy.session(
    [currentUserType],
    () => {
      cy.visit(Cypress.env('baseUrl'))

      const companyName = Cypress.env('companyName')

      // Perform login on Keycloak login page
      cy.get('input[placeholder="Enter your company name"]').type(companyName) // Update selector based on your app
      cy.get('.idp-name').contains(companyName).click()

      const currentUsername =
        currentUserType === USER_TYPES.ADMIN
          ? Cypress.env('adminEmail')
          : Cypress.env('userEmail')
      const currentPassword =
        currentUserType === USER_TYPES.ADMIN
          ? Cypress.env('adminPassword')
          : Cypress.env('userPassword')
      cy.get('#username').should('exist').type(currentUsername)
      cy.get('#password').type(currentPassword)
      cy.get('#kc-login').click() // Submit the Keycloak form
    },
    { cacheAcrossSpecs: true }
  )
})

Cypress.Commands.add('snackbarAlert', (text) => {
  cy.get('.MuiSnackbar-root')
    .should('be.visible')
    .then(() => {
      cy.get('.MuiSnackbarContent-root').should('contain', text)
      cy.wait(7000)
    })
    .should('not.exist')
})
