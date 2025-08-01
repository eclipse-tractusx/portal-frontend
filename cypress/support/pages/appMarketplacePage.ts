export class AppMarketplacePage {
  visit(): void {
    cy.visit(`${Cypress.env('baseUrl')}/cfxAppMarketplace`)
  }

  checkAppListContainerIsVisible(): void {
    cy.get('[data-testid="all-apps-container"]', { timeout: 10000 })
      .should('be.visible')
      .find('div')
      .should('have.length.greaterThan', 0)
  }

  checkFirstAppCardIsVisible(): void {
    cy.get('[data-testid="app-card-with-image-1"]')
      .should('exist')
      .and('be.visible')
  }

  clickFirstAppCard() {
    cy.get('[data-testid="app-card-with-image-1"]').click()
  }

  checkSecondAppCardIsVisible(): void {
    cy.get('[data-testid="app-card-with-image-2"]')
      .should('exist')
      .and('be.visible')
  }

  appSearchBar() {
    cy.get('input[type="search"]')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Search by app title...')
  }

  searchForApp(appName: string) {
    this.appSearchBar()
    cy.get('input[type="search"]').type(appName)
  }

  clearSearch() {
    cy.get('input[type="search"]').clear()
  }

  checkViewAllButtonIsActive() {
    cy.get('button[data-testid="view-all-filter-button"]')
      .should('be.visible')
      .and('be.enabled')
  }

  clickViewAllButton() {
    cy.get('button[data-testid="view-all-filter-button"]').click()
  }

  checkUseCasesButtonIsActive() {
    cy.get('button[data-testid="use-cases-filter-button"]')
      .should('be.visible')
      .and('be.enabled')
  }

  clickUseCasesButton() {
    cy.get('button[data-testid="use-cases-filter-button"]').click()
  }

  checkCategoryNameIsVisible() {
    cy.get('p.cx-category-divider__text').should('be.visible')
  }

  checkMoreButtonIsVisible() {
    cy.contains('button', 'More').should('be.visible')
  }

  checkMoreButtonIsDisabled() {
    cy.contains('button', 'More').should('be.visible').and('be.disabled')
  }

  checkCollapseButtonIsVisible() {
    cy.contains('button', 'Collapse').should('be.visible')
  }

  clickCollapseButton() {
    cy.contains('button', 'Collapse').click()
  }

  clickMoreButton() {
    cy.contains('button', 'More').click()
  }

  checkAppDetailPageIsVisible() {
    cy.url().should('include', '/appdetail/1')
  }
}
