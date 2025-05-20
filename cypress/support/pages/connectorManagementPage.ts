export class connectorManagementPage {
  // Visit the connector management page
  visit(): void {
    cy.visit(`${Cypress.env('baseUrl')}/connectorManagement`)
  }

  // Click the add connector icon
  clickAddConnectorIcon(): void {
    cy.get('[data-testid="AddCircleOutlineIcon"]', { timeout: 8000 }).click()
  }

  selectOwnCompanyConnector(): void {
    cy.get('input[type="checkbox"][aria-label="Checkbox demo"]')
      .first()
      .check({ force: true })
  }

  // Click the Next button
  clickNext(): void {
    cy.contains('button', 'Next').click()
  }

  // Choose to create a new technical user (radio button)
  selectNewTechnicalUserOption(): void {
    cy.get('input[type="radio"][name="radio-buttons"]', { timeout: 30000 })
      .eq(1)
      .click({ force: true })
  }

  // Click the "Create a new technical user" button
  clickCreateNewTechnicalUser(): void {
    cy.get('button[type="button"]')
      .filter('.cx-button.cx-variant-contained.cx-color-primary')
      .eq(0)
      .click({ force: true })
  }

  // Fill out the connector form for an existing technical user
  CreateConnector(
    connectorData: { name: string; url: string; location: string },
    technicalUser: { username: string }
  ): void {
    // Type and select the existing technical user from the dropdown
    cy.get('#singleSelectList').type(technicalUser.username)
    cy.get('#singleSelectList-option-0')
      .contains(technicalUser.username)
      .click()

    // Fill in the connector details
    cy.get('.cx-form-control__textfield')
      .find('input.MuiInputBase-input')
      .eq(0)
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true })
      .clear({ force: true })
      .type(connectorData.name, { force: true })

    cy.get('.cx-form-control__textfield')
      .find('input.MuiInputBase-input')
      .eq(1)
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true })
      .clear({ force: true })
      .type(connectorData.url, { force: true })

    cy.get('.cx-form-control__textfield')
      .find('input.MuiInputBase-input')
      .eq(2)
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true })
      .clear({ force: true })
      .type(connectorData.location, { force: true })

    // Submit the connector form
    cy.get('button[type="button"].MuiButton-containedPrimary.cx-button').click()
  }

  // Verify that the connector creation was successful

  verifyConnectorCreationSuccess(): void {
    cy.get('h4.cx-dialog__intro:visible')
      .invoke('text')
      .then((text) => {
        const trimmedText = text.trim()
        expect(trimmedText).to.match(
          /^(Create connector successfully completed\.?|Connector-Erstellung erfolgreich abgeschlossen\.?)$/i
        )
      })
  }

  deleteMostRecentConnector() {
    // Target the first row (most recent connector)
    cy.get('.MuiDataGrid-row', { timeout: 60000 })
      .eq(0) // Selects the first row
      .within(() => {
        cy.get('[data-testid="DeleteOutlineIcon"]').click({ force: true })
      })

    // Confirm deletion from modal/dialog
    cy.get('.cx-button.cx-variant-outlined.cx-color-primary')
      .eq(1)
      .click({ force: true })

    // Verify deletion success message
    //  cy.contains('Connector deleted successfully').should('be.visible')
    cy.get('h4.cx-dialog__intro:visible')
      .invoke('text')
      .then((text) => {
        const trimmedText = text.trim()
        expect(trimmedText).to.match(
          /^(Delete connector successfully completed.\.?|Connector-Erstellung erfolgreich abgeschlossen.\.?)$/i
        )
      })
  }
}
