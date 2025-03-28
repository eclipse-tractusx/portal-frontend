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

describe('Sending invite for new business partner', () => {
  beforeEach(() => {
    cy.loginuser('user1')
  })

  it('Validating the sucessful invite message', () => {
    cy.visit(Cypress.env('baseUrl'))
    cy.get('[data-testid="MenuIcon"]')
      .click()
      .get('[data-testid="BusinessRoundedIcon"]')
      .click()
      .get('[title="Invite Business Partner"]')
      .click()
      .get('.MuiButton-containedPrimary')
      .click()
      .get('h2.MuiTypography-h6')
      .should('have.text', 'Business Partner Invite')
      .get('input[placeholder="Company Name"]')
      .type('Automation testing 01')
      .get('input[name="email"]')
      .type('Ramireddy.GopalReddy@partner.bmwgroup.com')
      .get('input[placeholder="First Name"]')
      .type('Ramireddy')
      .get('input[placeholder="Last Name"]')
      .type('Gopal reddy')
      .get('button[name="send"]')
      .click()
    cy.contains('Business Partner Successfully Invited')
      .parents('.cx-dialog__content')
      .find('button[aria-label="close"]')
      .click()
  })
})
