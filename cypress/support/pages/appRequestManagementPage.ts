export class appRequestManagementPage {
  // Page locators
  private selectors = {
    cardContainer: '[data-testid="card-decision-container"]',
    firstAppCard: '[data-testid^="card-decision-"]',
    documentButton: 'button.document-button-link',
    verifyAppRoles: 'span.MuiTypography-label2',
    appApprovalButton: 'button[data-testid^="card-decision-approve-button-"]',
  }
  /**
   * Navigates to the app request management page.
   */
  visit(): void {
    cy.visit(`${Cypress.env('baseUrl')}/appAdminBoard`)
  }

  navigateToAppDetailPage(): void {
    Cypress.on('uncaught:exception', () => false)

    cy.intercept('GET', '**/api/apps/*/appDocuments/*').as('getAppDocument')

    // Click the first app card

    cy.get(this.selectors.cardContainer, { timeout: 40000 })
      .should('be.visible')
      .find(this.selectors.firstAppCard)
      .eq(0)
      .click({ force: true })

    // Wait until URL contains the dynamic app ID
    cy.url().should('match', /appAdminBoardDetail\/[0-9a-fA-F-]+$/)

    // Wait for the GET request
    cy.wait('@getAppDocument')
  }

  verifyAppSubmittedData(appRoles: string[]): void {
    // Verify the document
    cy.contains(this.selectors.documentButton, 'ConformityCertificate.pdf')
      .should('exist')
      .and('be.visible')

    // Verify all roles
    appRoles.forEach((role: string) => {
      cy.contains(this.selectors.verifyAppRoles, role)
        .should('exist')
        .and('be.visible')
    })

    cy.contains('button', /(Back|Zurück)/).click()
  }

  appApproval(): void {
    cy.get(this.selectors.appApprovalButton, { timeout: 40000 })
      .should('be.visible')
      .eq(0)
      .click()
    cy.get('div[role="alert"] .MuiBox-root')
      .invoke('text')
      .should('match', /App .* aktiviert|App .* activated/i)
  }
}
