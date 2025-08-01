import { AppMarketplacePage } from '../../support/pages/appMarketplacePage'

const appMarketplace = new AppMarketplacePage()

describe('App Marketplace', () => {
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

    // mock GET: /api/apps/active
    cy.intercept('GET', '**/api/apps/active', {
      statusCode: 200,
      body: [
        {
          id: '1',
          title: 'Test App',
          name: 'Test App',
          shortDescription: 'Test Description',
          provider: 'Test Provider',
          licenseType: 'COTS',
          price: '100',
          leadPictureId: '1b751d88-a651-4ef7-bc70-b58bca02eec8',
          leadPictureUri: '',
          useCases: [{ label: 'Behavior Twin', value: 'BEHAVIOR_TWIN' }],
          rating: 4.5,
        },
        {
          id: '2',
          title: 'Test App 2',
          name: 'Test App 2',
          shortDescription: 'Test Description 2',
          provider: 'Test Provider 2',
          licenseType: 'COTS',
          price: '100',
          leadPictureId: '1b751d88-a651-4ef7-bc70-b58bca02eec9',
          leadPictureUri: '',
          useCases: [{ label: 'Traceability', value: 'TRACEABILITY' }],
          rating: 4.5,
        },
      ],
    }).as('getAllActiveApps')

    // mock GET: /api/apps/appId/appDocument/leadPictureId
    cy.intercept(
      'GET',
      '**/api/apps/1/appDocuments/1b751d88-a651-4ef7-bc70-b58bca02eec8',
      {
        statusCode: 200,
        body: new Blob(['fake-image-data'], { type: 'image/png' }),
      }
    ).as('getLeadPicture')

    //mock GET: /api/Apps/subscribed/subscriptions (note the correct casing)
    cy.intercept('GET', '**/api/Apps/subscribed/subscriptions', {
      statusCode: 200,
      body: [
        {
          offerId: '1',
          status: 'PENDING',
        },
      ],
    }).as('getSubscriptions')

    appMarketplace.visit()
  })

  describe('marketplace card list', () => {
    it('marketplace should have card list', () => {
      cy.wait('@getAllActiveApps', { timeout: 15000 })
      cy.wait('@getSubscriptions', { timeout: 15000 })

      appMarketplace.checkAppListContainerIsVisible()
    })

    it('marketplace should have app card', () => {
      cy.wait('@getAllActiveApps', { timeout: 15000 })
      cy.wait('@getSubscriptions', { timeout: 15000 })

      appMarketplace.checkAppListContainerIsVisible()
      appMarketplace.checkFirstAppCardIsVisible()
    })

    it('marketplace should have the search bar', () => {
      appMarketplace.appSearchBar()
    })

    it('app can be searched by the app title', () => {
      appMarketplace.searchForApp('Test App')
      appMarketplace.checkAppListContainerIsVisible()
      appMarketplace.checkFirstAppCardIsVisible()
    })

    it('no app found for the searched app title', () => {
      appMarketplace.searchForApp('Test App 3')
      appMarketplace.checkAppListContainerIsVisible()
      appMarketplace.checkFirstAppCardIsVisible()
    })

    it('all apps should be displayed when the search is cleared', () => {
      appMarketplace.searchForApp('Test App')
      appMarketplace.clearSearch()
      appMarketplace.checkAppListContainerIsVisible()
      appMarketplace.checkFirstAppCardIsVisible()
      appMarketplace.checkSecondAppCardIsVisible()
    })
  })

  describe('App detail page', () => {
    it('should open app detail page when the app card is clicked', () => {
      cy.wait('@getAllActiveApps', { timeout: 15000 })
      cy.wait('@getSubscriptions', { timeout: 15000 })

      appMarketplace.checkFirstAppCardIsVisible()
      appMarketplace.clickFirstAppCard()
      appMarketplace.checkAppDetailPageIsVisible()
    })
  })
})
