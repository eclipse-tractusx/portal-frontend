import { USER_TYPES } from '../support/constants'

describe('Validate authentication for home page', () => {
  beforeEach(() => {
    cy.login(USER_TYPES.USER)
  })

  it('should visit home page after login', () => {
    cy.visit(Cypress.env('baseUrl'))
    cy.get('#usercentrics-root')
      .shadow()
      .find('[data-testid="uc-accept-all-button"]')
      .click()

    cy.get('.home').should('exist')

    cy.get('.app-store-section h2')
      .first()
      .should('have.text', 'New Applications')

    cy.get('.business-applications-section h2')
      .first()
      .should('have.text', 'Your Accessible Apps')
  })
})
