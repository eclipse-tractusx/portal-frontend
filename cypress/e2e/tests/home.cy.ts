describe('Home page', () => {
  beforeEach(() => {
    // Clear cookies and local storage before each test to ensure a clean state for script execution
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.login(
      Cypress.env('companyName'),
      Cypress.env('userEmail'),
      Cypress.env('userPassword')
    )
    cy.visit(Cypress.env('baseUrl'))
  })

  describe('Cookies User Consent', () => {
    it('should load GTM script', () => {
      cy.get('script[id="gtm-script"]').should('exist')
    })

    it('should load home page', () => {
      cy.get('.home', { timeout: 60000 }).should('be.visible')
    })

    it('should load Usercentrics dialog and its buttons', () => {
      cy.get('#usercentrics-cmp-ui')
        .shadow()
        .find('#uc-main-dialog')
        .should('exist')

      cy.get('#usercentrics-cmp-ui').shadow().find('#more').should('exist')

      cy.get('#usercentrics-cmp-ui').shadow().find('#accept').should('exist')
    })
  })

  describe('New Apps section', () => {
    it('should load new apps section', () => {
      cy.get('[data-testid="new-apps-section"]', { timeout: 60000 }).should(
        'be.visible'
      )
    })

    it('should load four new apps cards', () => {
      cy.get('[data-testid="new-apps-cards"]', { timeout: 60000 })
        .children()
        .should('have.length', 4)
    })
  })

  describe('Accessible Apps section', () => {
    it('should load accessible apps section', () => {
      cy.get('[data-testid="accessible-apps-section"]', {
        timeout: 60000,
      }).should('be.visible')
    })

    it('should load four accessible apps cards', () => {
      cy.get('[data-testid="accessible-apps-cards"]', { timeout: 60000 })
        .children()
        .should('have.length', 4)
    })
  })
})
