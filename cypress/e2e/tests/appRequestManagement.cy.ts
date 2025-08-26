import { appRequestManagementPage } from '../../support/pages/appRequestManagementPage'
const appRequestPage = new appRequestManagementPage()

describe('App Approval by CX Admin', () => {
  beforeEach(() => {
    cy.login(
      Cypress.env('companyName'),
      Cypress.env('userEmail'),
      Cypress.env('userPassword')
    )
    appRequestPage.visit()
    cy.get('#usercentrics-cmp-ui', { timeout: 60000 })
      .shadow()
      .find('#accept')
      .click()
  })

  it('navigate to app detail page', () => {
    appRequestPage.navigateToAppDetailPage()
  })

  it('verify submitted app data', () => {
    appRequestPage.navigateToAppDetailPage()
    cy.fixture('appDetailPage').then((data) => {
      appRequestPage.verifyAppSubmittedData(data.appRoles)
    })
  })

  it('approves the app', () => {
    appRequestPage.visit()
    appRequestPage.appApproval()
  })
})
