export class connectorManagementPage {
  // Visit the connector management page
  visit(): void {
    cy.visit(`${Cypress.env('baseUrl')}/connectorManagement`)
  }

  // Click the add connector icon
  clickAddConnectorIcon(): void {
    cy.get('button.add-idp-btn', { timeout: 60000 }).click()
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
    cy.get('input[type="radio"][name="radio-buttons"]', { timeout: 60000 })
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
    cy.get('input.MuiInputBase-input')
      .eq(1)
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true })
      .clear({ force: true })
      .type(connectorData.name, { force: true })

    cy.get('input.MuiInputBase-input')
      .eq(2)
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true })
      .clear({ force: true })
      .type(connectorData.url, { force: true })

    cy.get('input.MuiInputBase-input')
      .eq(3)
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true })
      .clear({ force: true })
      .type(connectorData.location, { force: true })

    // Submit the connector form
    cy.get('button[type="button"].MuiButton-containedPrimary.cx-button').click({
      force: true,
    })
  }

  // Verify that the connector creation was successful

  verifyConnectorCreationSuccess(): void {
    cy.get('.MuiBox-root.css-lo6mkt', { timeout: 60000 })
      .should('be.visible')
      .invoke('text')
      .should(
        'match',
        /Create connector successfully completed\.?|Connector-Erstellung erfolgreich abgeschlossen\.?/i
      )
  }

  deleteMostRecentConnector() {
    // Target the first row (most recent connector)

    cy.get('[data-rowindex="0"]', { timeout: 60000 }).within(() => {
      cy.get('[data-testid="DeleteOutlineIcon"]').click({ force: true })
    })

    // Confirm deletion from modal/dialog
    cy.get('.cx-button.cx-variant-outlined.cx-color-primary')
      .eq(1)
      .click({ force: true })

    // Verify deletion success message

    // cy.get('.MuiBox-root.css-lo6mkt', { timeout: 60000 })
    //   .scrollIntoView()
    //   .should('be.visible')
    //   .invoke('text')
    //   .should(
    //     'match',
    //     /Delete connector successfully completed\.?|Connector-Erstellung erfolgreich abgeschlossen\.?/i
    //   )
  }
}
