export class ServiceMarketplacePage {
  visit(): void {
    cy.visit(`${Cypress.env('baseUrl')}/cfxServiceMarketplace`)
  }

  checkServiceListContainerIsVisible(): void {
    cy.get('[data-testid="services-marketplace-container"]', { timeout: 10000 })
      .should('be.visible')
      .find('div')
      .should('have.length.greaterThan', 0)
  }

  checkRecommendedServiceListIsVisible(): void {
    cy.get('[data-testid="recommended-service-list"]')
      .should('exist')
      .and('be.visible')
  }

  checkAllServicesListIsVisible(): void {
    cy.get('[data-testid="all-services-container"]')
      .should('exist')
      .and('be.visible')
  }

  checkRecommendedServiceListHasFourCards(): void {
    cy.get('[data-testid="recommended-service-list"]')
      .children()
      .should('have.length', 4)
  }

  clearServiceSearchBar(): void {
    cy.get('input[type="search"]').clear()
  }

  checkServiceSearchBarIsVisible(): void {
    cy.get('input[type="search"]').should('exist').and('be.visible')
  }

  typeServiceSearchBar(serviceName: string): void {
    cy.get('input[type="search"]').type(serviceName)
  }

  checkServiceSearchBarHasOneResult(): void {
    cy.get('[data-testid="services-marketplace-container"]')
      .children()
      .should('have.length', 1)
  }

  checkServiceCardIsVisibleWithText(serviceName: string): void {
    cy.get(
      '[data-testid="card-with-image-0d40f48f-1906-4add-aaeb-d512d80a979c"]'
    )
      .should('exist')
      .and('be.visible')
      .contains(serviceName)
  }

  noCardFoundMessageIsVisible(message: string): void {
    cy.contains(message).should('exist')
  }

  checkCardWithIdNotExists(cardId: string): void {
    cy.get(`[data-testid="card-with-image-${cardId}"]`).should('not.exist')
  }

  clickOnCardWithId(cardId: string): void {
    cy.get(`[data-testid="card-with-image-${cardId}"]`).click()
  }

  checkServiceListHasChildren(length: number): void {
    cy.get('[data-testid="service-list"]')
      .children()
      .should('have.length', length)
  }

  checkLoadMoreButtonIsVisibleAndClickable(): void {
    cy.get('[data-testid="load-more-services-button"]')
      .should('exist')
      .and('be.visible')
      .click()
  }

  checkLoadMoreButtonIsNotVisible(): void {
    cy.get('[data-testid="load-more-services-button"]').should('not.exist')
  }

  checkFilterAllServicesButtonIsVisible(): void {
    cy.get('[data-testid="filter-all-services-button"]')
      .should('exist')
      .and('be.visible')
  }

  checkFilterAllServicesButtonIsActive(): void {
    cy.get('[data-testid="filter-all-services-button"]')
      .should('be.visible')
      .and('have.css', 'background-color', 'rgb(77, 77, 77)')
  }

  clickFilterAllServicesButton(): void {
    cy.get('[data-testid="filter-all-services-button"]').click()
  }

  checkFilterDataspaceServicesButtonIsVisible(): void {
    cy.get('[data-testid="filter-dataspace-services-button"]')
      .should('exist')
      .and('be.visible')
  }

  checkFilterConsultancyServicesButtonIsVisible(): void {
    cy.get('[data-testid="filter-consultancy-services-button"]')
      .should('exist')
      .and('be.visible')
  }

  checkCardWithIdHasText(cardId: string, text: string): void {
    cy.get(`[data-testid="card-with-image-${cardId}"]`)
      .should('exist')
      .and('be.visible')
      .contains(text)
  }
}
