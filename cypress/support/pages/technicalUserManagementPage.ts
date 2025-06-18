export class technicalUserManagementPage {
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
    cy.get('[data-testid="AddCircleOutlineIcon"]', { timeout: 40000 })
      .should('be.visible')
      .click()
  }

  internalTechnicalUser(): void {
    cy.get('input[type="radio"][name="radio-button"]')
      .eq(1)
      .check({ force: true })
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
    cy.get('h4')
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
    cy.get('div.MuiBox-root.css-lo6mkt', { timeout: 60000 })
      .scrollIntoView()
      .should('be.visible')
      .should(
        'include.text',
        'Technical user successfully created. Below are the details needed for service connection. Please keep this secret confidential.'
      )
    /**
     * Closes the success dialog.
     */
    cy.get('[data-testid="CloseIcon"]').click()
  }
}
