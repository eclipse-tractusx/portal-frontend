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
      loginuser: (userType: string) => Chainable<void>
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
      const companyName = Cypress.env('company').name
      cy.visit(Cypress.env('baseUrl'))
      // Perform login on Keycloak login page
      cy.origin(
        Cypress.env('keycloak').centralUrl,
        { args: { companyName } },
        ({ companyName }) => {
          // Click the login button to be redirected to Keycloak
          cy.get('input[placeholder="Enter your company name"]').type(
            companyName
          ) // Update selector based on your app

          cy.get('li')
            .find('div')
            .contains(companyName, { matchCase: false })
            .click()
        }
      )

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

Cypress.Commands.add('loginuser', () => {
  // Retrieve environment variables for user1 credentials and company name
  const adminemail = Cypress.env('user1').email // Use user1's email
  const adminpassword = Cypress.env('user1').password // Use user1's password
  const cxcompanyName = Cypress.env('company1').name // Use company1's name

  // Create a session for user login using Cypress.session to cache the session across tests
  cy.session(
    [adminemail],
    () => {
      // Visit the application's base URL
      cy.visit(Cypress.env('baseUrl'))

      // Perform login on Keycloak login page using Cypress.origin
      cy.origin(
        Cypress.env('keycloak').centralUrl,
        { args: { cxcompanyName } },
        ({ cxcompanyName }) => {
          // Enter the company name and select it from the dropdown
          cy.get('input[placeholder="Enter your company name"]').type(
            cxcompanyName
          )
          cy.get('li')
            .find('div')
            .contains(cxcompanyName, { matchCase: false })
            .click()
        }
      )

      cy.origin(
        Cypress.env('keycloak').sharedUrl,
        { args: { adminemail, adminpassword } },
        ({ adminemail, adminpassword }) => {
          // Enter email and password, and click login
          cy.get('#username').should('exist').type(adminemail)
          cy.get('#password').type(adminpassword)
          cy.get('#kc-login').click() // Submit the Keycloak login form
        }
      )
    },
    { cacheAcrossSpecs: true }
  ) // Cache the session across specs
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
