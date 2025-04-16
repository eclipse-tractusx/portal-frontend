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

import {
  getRandomItem,
  generateDynamicUsername,
  generateDynamicDescription,
} from '../../support/utils/dataGenerator/technicalUserManagement'
import { TechnicalUserManagementPage } from '../../support/pages/technicalUserManagementPage'
const technicalPage = new TechnicalUserManagementPage()

describe('Technical User Creation', () => {
  beforeEach(() => {
    // Navigate to the technical user management page using the page object method

    cy.login('user')

    technicalPage.visit()
  })

  it('should create a technical user with dynamic role-based username', () => {
    cy.fixture('technicalUser').then((user) => {
      // Start technical user creation process
      technicalPage.clickCreateUserButton()

      // Select a random role and generate dynamic data based on the role
      const selectedRole = getRandomItem(user.roles)
      const username = generateDynamicUsername(selectedRole)
      const description = generateDynamicDescription(user.description)

      // Log generated values for debugging
      cy.log(`Selected Role: ${selectedRole}`)
      cy.log(`Generated Username: ${username}`)
      cy.log(`Generated Description: ${description}`)

      cy.document().then((doc) => {
        const lang = doc.documentElement.lang
        cy.log(`Language: ${lang}`)

        if (lang === 'en') {
          // Fill out the form using the consolidated function
          technicalPage.CreateTechnicalUser(username, description, selectedRole)

          // Verify the success message and close the dialog
          technicalPage.verifySuccessMessage()
          technicalPage.clickClose()

          // This code will never execute until the HTML lang bug is fixed and the value is dynamically updated to "de".
        } else {
          technicalPage.DE_CreateTechnicalUser(
            username,
            description,
            selectedRole
          )

          // Verify if the success message is visible
          cy.get('h4.cx-dialog__intro')
            .should('be.visible')
            .should(
              'include.text',
              'Technischer User erfolgreich angelegt. Unten finden Sie die Details, die für die Serviceverbindung benötigt werden. Bitte behandeln Sie diese Informationen vertraulich.'
            )
        }
      })
    })
  })
})
