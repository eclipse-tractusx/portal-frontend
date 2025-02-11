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
    interface Chainable<Subject = any> {
      login: (
        companyName: string,
        userEmail: string,
        userPassword: string
      ) => Chainable<Subject>
      loginWithSession: (
        companyName: string,
        userEmail: string,
        userPassword: string
      ) => Chainable<Subject>
      snackbarAlert: (msg: string) => Chainable<Subject>
    }
  }
}

Cypress.Commands.add(
  'login',
  (companyName: string, userEmail: string, userPassword: string) => {
    // Perform login on Keycloak login page
    cy.visit(Cypress.env('baseUrl'))
    cy.get('input[placeholder="Enter your company name"]').type(companyName)
    cy.get('.idp-name').contains(companyName).click()
    cy.get('#username').should('exist').type(userEmail)
    cy.get('#password').type(userPassword)
    cy.get('#kc-login').click() // Submit the Keycloak form
  }
)

Cypress.Commands.add(
  'loginWithSession',
  (companyName: string, userEmail: string, userPassword: string) => {
    cy.session(
      [userEmail, userPassword],
      () => {
        // Perform login on Keycloak login page
        cy.visit(Cypress.env('baseUrl'))
        cy.get('input[placeholder="Enter your company name"]').type(companyName)
        cy.get('.idp-name').contains(companyName).click()
        cy.get('#username').should('exist').type(userEmail)
        cy.get('#password').type(userPassword)
        cy.get('#kc-login').click() // Submit the Keycloak form
      },
      { cacheAcrossSpecs: true }
    )
  }
)

Cypress.Commands.add('snackbarAlert', (text) => {
  cy.get('.MuiSnackbar-root')
    .should('be.visible')
    .then(() => {
      cy.get('.MuiSnackbarContent-root').should('contain', text)
      cy.wait(7000)
    })
    .should('not.exist')
})
