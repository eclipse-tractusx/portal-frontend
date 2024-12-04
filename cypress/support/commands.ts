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

export {}

declare global {
  namespace Cypress {
    interface Chainable {
      login: (userType: string) => Chainable<void>
      snackbarAlert: (msg: string) => Chainable<void>
    }
  }
}

// @ref https://on.cypress.io/custom-commands
Cypress.Commands.add('login', (usertype) => {
  // creating a session for user login
  cy.session(
    [usertype],
    () => {
      cy.visit(Cypress.env('baseUrl'))

      // Perform login on Keycloak login page
      cy.origin(Cypress.env('keycloak').centralUrl, () => {
        // Click the login button to be redirected to Keycloak
        cy.get('input[placeholder="Enter your company name"]').type(
          'CX-operator'
        ) // Update selector based on your app

        cy.get('li').find('div').contains('CX-Operator').click()
      })

      cy.origin(
        Cypress.env('keycloak').sharedUrl,
        { args: { usertype } },
        ({ usertype }) => {
          const currentUsername =
            usertype === 'admin'
              ? Cypress.env('admin').email
              : Cypress.env('user').email
          const currentPassword =
            usertype === 'admin'
              ? Cypress.env('admin').password
              : Cypress.env('user').password
          cy.get('#username').should('exist').type(currentUsername)
          cy.get('#password').type(currentPassword)
          cy.get('#kc-login').click() // Submit the Keycloak form
        }
      )
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
