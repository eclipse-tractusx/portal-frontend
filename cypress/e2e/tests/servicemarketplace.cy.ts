import { ServiceMarketplacePage } from '../../support/pages/serviceMarketplace'

const serviceMarketplace = new ServiceMarketplacePage()

describe('Service Marketplace', () => {
  beforeEach(() => {
    cy.login(
      Cypress.env('companyName'),
      Cypress.env('userEmail'),
      Cypress.env('userPassword')
    )
    cy.get('#usercentrics-cmp-ui', { timeout: 60000 })
      .shadow()
      .find('#accept')
      .click()

    serviceMarketplace.visit()
  })

  describe('service marketplace list', () => {
    it('marketplace should have card list', () => {
      serviceMarketplace.checkServiceListContainerIsVisible()
    })

    it('marketplace should have recommended section', () => {
      serviceMarketplace.checkRecommendedServiceListIsVisible()
    })

    it('marketplace should have all services section', () => {
      serviceMarketplace.checkAllServicesListIsVisible()
    })
  })

  describe('service recommendation list', () => {
    it('recommendation list have four cards', () => {
      serviceMarketplace.checkRecommendedServiceListHasFourCards()
    })
  })

  describe('service search', () => {
    beforeEach(() => {
      serviceMarketplace.clearServiceSearchBar()
    })

    it('marketplace should have search bar', () => {
      cy.wait(10000)
      serviceMarketplace.checkServiceSearchBarIsVisible()
    })

    /*
  The check for the filtered service by title is failing due to backend sorting.  
  The card with the name 'adwdwddwd' is no longer guaranteed to appear in the first 10 records.  
  As more apps are added, this card will eventually be pushed out of the initial dataset.  

  To avoid this test failure, the flow will be updated:  
  - We will use an app that is already created in AppManagement and approved in AppRequest.  
  - This ensures we have a stable app and ID to reference, regardless of backend sorting changes.
*/

    it.skip('should filter services by search with service title', () => {
      serviceMarketplace.typeServiceSearchBar('adwdwddwd')
      cy.wait(1000)
      serviceMarketplace.checkServiceSearchBarHasOneResult()
      serviceMarketplace.checkServiceCardIsVisibleWithText('adwdwddwd')
    })

    it('should display no results message when no services are found', () => {
      serviceMarketplace.typeServiceSearchBar('empty service')
      cy.wait(1000)
      serviceMarketplace.noCardFoundMessageIsVisible('No data available')
      serviceMarketplace.checkCardWithIdNotExists(
        '0d40f48f-1906-4add-aaeb-d512d80a979c'
      )
    })

    it('should display all cards when search is cleared', () => {
      serviceMarketplace.typeServiceSearchBar('adwdwddwd')
      cy.wait(1000)
      serviceMarketplace.clearServiceSearchBar()
      cy.wait(1000)
      serviceMarketplace.checkRecommendedServiceListHasFourCards()
      serviceMarketplace.checkAllServicesListIsVisible()
    })
  })

  describe('service filters', () => {
    it('should display all filters buttons', () => {
      cy.wait(5000)
      serviceMarketplace.checkFilterAllServicesButtonIsVisible()
      serviceMarketplace.checkFilterDataspaceServicesButtonIsVisible()
      serviceMarketplace.checkFilterConsultancyServicesButtonIsVisible()
    })

    it('by default all services filter button should be active', () => {
      cy.wait(5000)
      serviceMarketplace.checkFilterAllServicesButtonIsActive()
    })
  })

  describe('Load more services', () => {
    it('should load more services when load more button is clicked', () => {
      cy.wait(5000)
      serviceMarketplace.checkServiceListHasChildren(6)
      serviceMarketplace.checkLoadMoreButtonIsVisibleAndClickable()
      cy.wait(1000)
      serviceMarketplace.checkServiceListHasChildren(16)
    })
    it('load more button should not be visible if no more services are available', () => {
      cy.wait(5000)
      serviceMarketplace.typeServiceSearchBar('empty service')
      cy.wait(1000)
      serviceMarketplace.checkLoadMoreButtonIsNotVisible()
    })
  })

  /*
  The check for the filtered service by title is failing due to backend sorting.  
  The card with the name 'adwdwddwd' is no longer guaranteed to appear in the first 10 records.  
  As more apps are added, this card will eventually be pushed out of the initial dataset.  

  To avoid this test failure, the flow will be updated:  
  - We will use an app that is already created in AppManagement and approved in AppRequest.  
  - This ensures we have a stable app and ID to reference, regardless of backend sorting changes.
*/

  describe.skip('service detail', () => {
    it('should display service detail when a card is clicked', () => {
      cy.wait(5000)
      serviceMarketplace.clickOnCardWithId(
        '0d40f48f-1906-4add-aaeb-d512d80a979c'
      )
      cy.url().should('include', '/serviceMarketplaceDetail/')
    })
  })
})
