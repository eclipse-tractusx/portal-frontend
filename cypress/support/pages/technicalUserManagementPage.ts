/********************************************************************************
 * Copyright (c) 2025 Contributors to the Eclipse Foundation
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

export class TechnicalUserManagementPage {
  /**
   * Navigates to the technical user management page.
   */
  visit(): void {
    cy.visit(`${Cypress.env('baseUrl')}/technicalUserManagement`)
  }

  /**
   * Clicks the button to start creating a new technical user.
   */
  clickCreateUserButton(): void {
    cy.wait(2000)

    cy.get('[data-testid="AddCircleOutlineIcon"]').should('be.visible').click()
  }

  CreateTechnicalUser(
    username: string,
    description: string,
    selectedRole: string
  ): void {
    cy.get('textarea[placeholder="Username*"]').type(username)
    cy.wait(2000)
    cy.get('textarea[placeholder="Description*"]').type(description)
    cy.contains(selectedRole).click()
    cy.get('button.cx-button.cx-variant-contained.cx-color-primary')
      .contains('Confirm')
      .click()

    // Save technical user details to Cypress environment variables
    Cypress.env('recentTechnicalUser', {
      username,
      description,
      role: selectedRole,
    })
  }

  // This code will never execute until the HTML lang bug is fixed and the value is dynamically updated to "de".
  DE_CreateTechnicalUser(
    username: string,
    description: string,
    selectedRole: string
  ): void {
    cy.get('textarea[placeholder="Username*"]').type(username)
    cy.wait(2000)
    cy.get('textarea[placeholder="Beschreibung*"]').type(description)
    // Select the random role from the available roles
    cy.contains(selectedRole).click()
    // Submit the data to create the user
    cy.get('button.cx-button.cx-variant-contained.cx-color-primary')
      .contains('Bestätigen')
      .click()

    // Verify if the success message is visible
    cy.get('h4.cx-dialog__intro')
      .should('be.visible')
      .should(
        'include.text',
        'Technischer User erfolgreich angelegt. Unten finden Sie die Details, die für die Serviceverbindung benötigt werden. Bitte behandeln Sie diese Informationen vertraulich.'
      )
  }

  /**
   * Verifies that the success message appears.
   */
  verifySuccessMessage(): void {
    cy.get('h4.cx-dialog__intro')
      .should('be.visible')
      .should(
        'include.text',
        'Congratulations, the technical user got successfully created. Below you can find all the relevant details needed to apply the technical user for your service connection. Please ensure that you keep this secrets confidential.'
      )
  }

  /**
   * Closes the success dialog.
   */
  clickClose(): void {
    cy.get('[data-testid="CloseIcon"]').click()
  }
}
